import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WorkspaceInterface from "./components/student-interface/summary1";
import DashboardInterface from "./components/student-interface/dashboard3";
import ConceptInterface from "./components/student-interface/concept2";
import RubricInterface from "./components/grading/rubric";
import TargetedFeedbackInterface from "./components/grading/targetedFeedback";
import FeedbackDisplay from "./components/grading/feedback";
import FeedbackDemo from './components/grading/FeedbackDemo';
import Workflow from './components/grading/workflow';
import StandardsSelector from './components/masterymate/standards-selection';
import PortfolioActivitySelector from './components/masterymate/portfolio-selector';
import FeedbackStyles from './components/grading/feedback-styles';
import AssignmentPreview from './components/grading/assignment-preview';
import TextAnnotator from './components/grading/text-annotator';
import Implementation from './components/masterymate/implementation';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardInterface />} />
        <Route path="/workspace" element={<ConceptInterface />} />
        <Route path="/summary" element={<WorkspaceInterface />} />
        <Route path="/rubric" element={<RubricInterface />} />
        <Route path="/targeted-feedback" element={<TargetedFeedbackInterface />} />
        <Route path="/feedback" element={<FeedbackDisplay />} />
        <Route path="/alternative-feedback" element={<FeedbackDemo />} />
        <Route path="/workflow" element={<Workflow />} />
        <Route path="/standards-selection" element={<StandardsSelector />} />
        <Route path="/portfolio-selector" element={<PortfolioActivitySelector />} />
        <Route path="/feedback-styles" element={<FeedbackStyles />} />
        <Route path="/assignment-preview" element={<AssignmentPreview />} />
        <Route path="/text-annotator" element={<TextAnnotator />} />
        <Route path="/implementation" element={<Implementation />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;