import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import CircularProgressComponent from "./CircularProgressComponent";
import ToggleListComponent from "./ToggleListComponent";
import FAQComponent from "./FAQComponent";

const { Header, Content } = Layout;

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(null);
  const [dScore, setDscore] = useState(null);
  const [timer, setTimer] = useState(0); // New state for tracking time in seconds

  // Timer function using useEffect
  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    // Cleanup function to clear interval once the loading is finished
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    // Fetch desktop data
    fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://www.geeksforgeeks.org/courses/qdi1me47k5?form_factor=desktop`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const performanceScore =
          data.lighthouseResult.categories.performance.score * 100;
        setDscore(performanceScore);
        console.log(data);

        setData(data);
        setLoading(false); // Stop loading once data is fetched
      })
      .catch((error) => {
        setError(error);
        setLoading(false); // Stop loading even if there's an error
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // Fetch mobile data
    fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://www.geeksforgeeks.org/courses/qdi1me47k5?form_factor=mobile`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const performanceScore =
          data.lighthouseResult.categories.performance.score * 100;
        setScore(performanceScore);
        console.log(data);

        setData(data);
        setLoading(false); // Stop loading once data is fetched
      })
      .catch((error) => {
        setError(error);
        setLoading(false); // Stop loading even if there's an error
        console.log(error);
      });
  }, []);

  if (loading) return <p>Loading... </p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Layout
      style={{ height: "100vh", width: "100vw", backgroundColor: "#f0f2f5" }}
    >
      <Header
        style={{
          background: "#1890ff",
          textAlign: "center",
          color: "#fff",
          fontSize: "24px",
        }}
      >
        Dashboard
      </Header>
      <Content
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          backgroundColor: "#f0f2f5",
          height: "100%",
          width: "100%",
        }}
      >
        {/* Progress Circles */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 40px",
            marginBottom: "40px",
          }}
        >
          <CircularProgressComponent
            score={score}
            dScore={dScore}
            timer={timer}
          />
        </div>

        {/* Displaying how long it took to load */}
        <p>Page load speed: {timer} seconds</p>

        {/* Toggle List */}
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            padding: "0 40px",
            margin: "0 auto",
            marginBottom: "40px",
          }}
        >
          <ToggleListComponent />
        </div>

        {/* FAQ Section */}
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            padding: "0 40px",
            margin: "0 auto",
          }}
        >
          <FAQComponent />
        </div>
      </Content>
    </Layout>
  );
};

export default App;
