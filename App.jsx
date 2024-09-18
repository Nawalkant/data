import React, { useState, useEffect } from "react";
import { FaDesktop, FaMobileAlt, FaClock } from "react-icons/fa";
import Toggle from "react-toggle";
import axios from "axios";
import "./App.css"; // Include your styles here

const App = () => {
  // State for performance overview data and toggles
  const [performanceData, setPerformanceData] = useState({
    desktopScore: 0,
    mobileScore: 0,
    desktopFCP: "",
    mobileFCP: "",
  });

  const [optimizations, setOptimizations] = useState({
    enableAll: false,
    imageOptimization: false,
    deferCSS: false,
    browserCaching: false,
    coreWebVitals: false,
  });

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        // Desktop Request
        const desktopResponse = await axios.get(
          `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https%3A%2F%2Ftraya.health&strategy=desktop`
        );

        const desktopScore = Math.round(
          desktopResponse.data.lighthouseResult.categories.performance.score *
            100
        );

        // Extract First Contentful Paint (FCP) for Desktop
        const desktopFCP =
          desktopResponse.data.lighthouseResult.audits["first-contentful-paint"]
            .displayValue;

        // Mobile Request
        const mobileResponse = await axios.get(
          `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https%3A%2F%2Ftraya.health&strategy=mobile`
        );

        const mobileScore = Math.round(
          mobileResponse.data.lighthouseResult.categories.performance.score *
            100
        );

        // Extract First Contentful Paint (FCP) for Mobile
        const mobileFCP =
          mobileResponse.data.lighthouseResult.audits["first-contentful-paint"]
            .displayValue;

        // Update state with scores and FCP values
        setPerformanceData({
          desktopScore: desktopScore,
          mobileScore: mobileScore,
          desktopFCP: desktopFCP, // e.g., "1.8 s"
          mobileFCP: mobileFCP, // e.g., "2.3 s"
        });
      } catch (error) {
        console.error("Error fetching performance data:", error);
      }
    };

    fetchPerformanceData();
  }, []);

  // Toggle all optimizations at once
  const handleEnableAll = () => {
    const newToggleState = !optimizations.enableAll;
    setOptimizations({
      enableAll: newToggleState,
      imageOptimization: newToggleState,
      deferCSS: newToggleState,
      browserCaching: newToggleState,
      coreWebVitals: newToggleState,
    });
  };

  return (
    <div className="container">
      {/* Performance Overview */}
      <PerformanceOverview data={performanceData} />
      {/* Speed Optimizations */}
      <SpeedOptimizations
        optimizations={optimizations}
        setOptimizations={setOptimizations}
        handleEnableAll={handleEnableAll}
      />
      {/* How It Works */}
      <HowItWorks />
      {/* FAQ */}
      <FAQ />
      {/* Support */}
      <Support />
    </div>
  );
};

// Performance Overview Component
const PerformanceOverview = ({ data }) => (
  <div className="performance-overview">
    <h2>Performance Overview</h2>
    <div className="scores">
      <Score
        title="Desktop Score"
        value={data.desktopScore}
        icon={<FaDesktop />}
      />
      <Score
        title="Mobile Score"
        value={data.mobileScore}
        icon={<FaMobileAlt />}
      />
      <Score
        title="Desktop Load Time "
        value={data.desktopFCP}
        icon={<FaClock />}
      />
      <Score
        title="Mobile Load Time "
        value={data.mobileFCP}
        icon={<FaClock />}
      />
    </div>
  </div>
);

const Score = ({ title, value, icon }) => (
  <div className="score">
    <div className="icon">{icon}</div>
    <h3>{title}</h3>
    <span className="score-value">{value}</span>
  </div>
);

// Speed Optimizations Component
const SpeedOptimizations = ({
  optimizations,
  setOptimizations,
  handleEnableAll,
}) => (
  <div className="speed-optimizations">
    <h2>Speed Optimizations</h2>
    <div className="toggle-option">
      <span>Enable All Optimizations</span>
      <Toggle checked={optimizations.enableAll} onChange={handleEnableAll} />
    </div>
    <OptimizationToggle
      label="Image Optimization"
      checked={optimizations.imageOptimization}
      onChange={() =>
        setOptimizations({
          ...optimizations,
          imageOptimization: !optimizations.imageOptimization,
        })
      }
    />
    <OptimizationToggle
      label="Defer CSS & JavaScript"
      checked={optimizations.deferCSS}
      onChange={() =>
        setOptimizations({
          ...optimizations,
          deferCSS: !optimizations.deferCSS,
        })
      }
    />
    <OptimizationToggle
      label="Browser Caching"
      checked={optimizations.browserCaching}
      onChange={() =>
        setOptimizations({
          ...optimizations,
          browserCaching: !optimizations.browserCaching,
        })
      }
    />
    <OptimizationToggle
      label="Core Web Vitals Improvement"
      checked={optimizations.coreWebVitals}
      onChange={() =>
        setOptimizations({
          ...optimizations,
          coreWebVitals: !optimizations.coreWebVitals,
        })
      }
    />
  </div>
);

const OptimizationToggle = ({ label, checked, onChange }) => (
  <div className="toggle-option">
    <span>{label}</span>
    <Toggle checked={checked} onChange={onChange} />
  </div>
);

// How It Works Component
const HowItWorks = () => (
  <div className="how-it-works">
    <h2>How It Works</h2>
    <ul>
      <li>Connect your website to FixVitals</li>
      <li>We analyze your site’s performance</li>
      <li>Enable optimizations with one click</li>
      <li>Monitor your site’s improvements</li>
      <li>Enjoy faster loading times and better rankings</li>
    </ul>
  </div>
);

// FAQ Component
const FAQ = () => (
  <div className="faq">
    <h2>FAQ</h2>
    <details>
      <summary>What is FixVitals?</summary>
      <p>FixVitals is a tool to improve your website’s performance.</p>
    </details>
    <details>
      <summary>How does FixVitals improve my site’s speed?</summary>
      <p>
        FixVitals enables optimizations that enhance loading speed and
        performance.
      </p>
    </details>
    <details>
      <summary>Will FixVitals affect my site’s design?</summary>
      <p>
        No, FixVitals only optimizes performance without altering the design.
      </p>
    </details>
  </div>
);

// Support Component
const Support = () => (
  <div className="support">
    <h2>Support</h2>
    <div className="support-options">
      <button className="chat-button">Live Chat</button>
      <button className="email-button">Email Support</button>
    </div>
  </div>
);

export default App;
