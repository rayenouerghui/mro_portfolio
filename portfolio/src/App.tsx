import { AnimaProvider } from "@animaapp/playground-react-sdk";
import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProjectDetailPage from "./pages/ProjectDetailPage";

function App() {
  return (
    <AnimaProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
        </Routes>
      </HashRouter>
    </AnimaProvider>
  );
}

export default App;
