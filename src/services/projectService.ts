import { PROJECTS, ProjectDefinition, RoleLensKey } from '../data/projects';

export interface ProjectService {
  getProjects(lens?: RoleLensKey | 'general'): Promise<ProjectDefinition[]>;
  getProjectById(id: string): Promise<ProjectDefinition | null>;
  searchProjects(query: string): Promise<ProjectDefinition[]>;
}

/**
 * Static client-side implementation of ProjectService.
 * Designed with clean service boundaries so Codex can cleanly attach
 * backend API endpoints, persistent user sessions, or live metrics in future iterations.
 */
class LocalStaticProjectService implements ProjectService {
  async getProjects(lens: RoleLensKey | 'general' = 'general'): Promise<ProjectDefinition[]> {
    const list = [...PROJECTS];
    if (lens === 'general') {
      return list;
    }
    return list.sort((a, b) => a.lensRank[lens] - b.lensRank[lens]);
  }

  async getProjectById(id: string): Promise<ProjectDefinition | null> {
    return PROJECTS.find((p) => p.id === id) || null;
  }

  async searchProjects(query: string): Promise<ProjectDefinition[]> {
    const q = query.toLowerCase();
    return PROJECTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q)) ||
        p.problem.toLowerCase().includes(q)
    );
  }
}

export const projectService: ProjectService = new LocalStaticProjectService();
