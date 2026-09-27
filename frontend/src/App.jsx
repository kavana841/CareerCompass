import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import ResumeBuilder from "./components/ResumeBuilder/ResumeBuilder";
import JobMatch from "./pages/JobMatch";
import Coding from "./pages/Coding";
import CodingTopic from "./pages/CodingTopic";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/resume" element={<ResumeBuilder />} />
      <Route path="/jobs" element={<JobMatch />} />
      <Route path="/coding" element={<Coding />} />
      <Route path="/coding/:topic" element={<CodingTopic />} />
    </Routes>
  );
}

export default App;