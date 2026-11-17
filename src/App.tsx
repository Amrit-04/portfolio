import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import PortfolioMode from "./modes/portfolio/PortfolioMode";
import { ProjectDetail } from "./modes/portfolio/ProjectDetail";
import { getProjectById } from "./data/projects";
import { ErrorBoundary } from "./components/ErrorBoundary";
const RideMode = lazy(() => import("./modes/ride/RideMode"));
const isRide = () => window.location.hash === "#/ride";
export default function App() {
  const [ride, setRide] = useState(isRide);
  const [project, setProject] = useState<string | null>(null);
  useEffect(() => {
    const change = () => {
      setRide(isRide());
      setProject(null);
    };
    window.addEventListener("hashchange", change);
    return () => window.removeEventListener("hashchange", change);
  }, []);
  const enter = useCallback(() => {
    window.location.hash = "/ride";
    setRide(true);
    window.scrollTo(0, 0);
  }, []);
  const exit = useCallback(() => {
    window.location.hash = "top";
    setRide(false);
    setProject(null);
    window.scrollTo(0, 0);
  }, []);
  const close = useCallback(() => {
    setProject(null);
  }, []);
  return (
    <ErrorBoundary label="Engineering World">
      <Suspense
        fallback={
          <div className="loading-world" role="status">
            Preparing the Engineering Trail…
          </div>
        }
      >
        {ride ? (
          <RideMode onExit={exit} openProject={setProject} />
        ) : (
          <PortfolioMode onEnterTrack={enter} openProject={setProject} />
        )}
      </Suspense>
      {project && (
        <ProjectDetail project={getProjectById(project)} onClose={close} />
      )}
    </ErrorBoundary>
  );
}
