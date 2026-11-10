import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import ResumeBuilder from "./components/ResumeBuilder/ResumeBuilder";
import JobMatch from "./pages/JobMatch";
import Coding from "./pages/Coding";
import CodingTopic from "./pages/CodingTopic";
import MockInterview from "./pages/MockInterview";
import Practice from "./pages/Practice";
import RoadmapPage from "./pages/RoadmapPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/resume" element={<ResumeBuilder />} />
      <Route path="/jobs" element={<JobMatch />} />
      <Route path="/coding" element={<Coding />} />
      <Route path="/coding/:topic" element={<CodingTopic />} />
      <Route path="/mock-interview" element={<MockInterview />} />
      <Route path="/practice" element={<Practice />} />
      <Route path="/roadmap" element={<RoadmapPage />} />
    </Routes>
  );
}

export default App;
