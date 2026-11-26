import { useCallback, useEffect, useState } from "react";
import PortfolioMode from "./modes/portfolio/PortfolioMode";
import { ProjectDetail } from "./modes/portfolio/ProjectDetail";
import { getProjectById } from "./data/projects";
import { ErrorBoundary } from "./components/ErrorBoundary";
export default function App() {
  const [project, setProject] = useState<string | null>(null);
  useEffect(() => {
    const change = () => {
      if (window.location.hash === "#/ride") {
        window.location.replace("/portfolio/openrider/index.html");
        return;
      }
      setProject(null);
    };
    change();
    window.addEventListener("hashchange", change);
    return () => window.removeEventListener("hashchange", change);
  }, []);
  const enter = useCallback(() => {
    window.location.assign("/portfolio/openrider/index.html");
  }, []);
  const close = useCallback(() => {
    setProject(null);
  }, []);
  return (
    <ErrorBoundary label="Engineering World">
      <PortfolioMode onEnterTrack={enter} openProject={setProject} />
      {project && (
        <ProjectDetail project={getProjectById(project)} onClose={close} />
      )}
    </ErrorBoundary>
  );
}
