import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WorkspaceInterface from "./components/student-interface/summary1";
import DashboardInterface from "./components/student-interface/dashboard3";
import ConceptInterface from "./components/student-interface/concept2";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardInterface />} />
        <Route path="/workspace" element={<ConceptInterface />} />
        <Route path="/summary" element={<WorkspaceInterface />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;