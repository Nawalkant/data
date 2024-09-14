import React, { useState } from "react";
import { Progress, Row, Col, Button } from "antd";

const CircularProgressComponent = ({ score, dScore, timer }) => {
  const progressValues = [
    { val: dScore, name: "Desktop" },
    { val: score, name: "Mobile" },
  ];
  const progressBar = [
    { val: timer, color: "green" },
    { val: timer, color: "yellow" },
    { val: timer, color: "red" },
  ];
  const [progressColors, setProgressColors] = useState([
    "normal",
    "normal",
    "normal",
    "normal",
  ]);

  const checkScore = () => {
    const updatedColors = progressValues.map((value) => {
      if (value < 30) return "exception"; // red
      if (value >= 30 && value < 70) return "normal"; // blue (default)
      return "success"; // green
    });
    setProgressColors(updatedColors);
  };

  return (
    <div style={{ textAlign: "center", width: "100%" }}>
      <Button
        type="primary"
        onClick={checkScore}
        style={{ marginBottom: "20px" }}
      >
        Check Score
      </Button>
      <div style={{ display: "flex" }}>
        <div
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "center",
            gap: "0.2rem",
          }}
        >
          {progressBar.map((item, index) => (
            <div
              style={{
                height: "15px",
                backgroundColor: item.color,
                width: item.val,
              }}
              key={index}
            ></div>
          ))}
        </div>
        <Row
          justify="space-around"
          align="middle"
          gutter={[16, 16]}
          style={{ width: "100%" }}
        >
          {progressValues.map((value, index) => (
            <Col key={index}>
              <Progress
                type="circle"
                percent={value.val}
                width={120}
                status={progressColors[index]}
              />
              <div>{value.name}</div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default CircularProgressComponent;
