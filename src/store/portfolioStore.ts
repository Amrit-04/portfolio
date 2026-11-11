import { create } from 'zustand';
import { RoleLensKey } from '../data/projects';

export type PortfolioMode = 'blueprint' | 'rider';

interface PortfolioState {
  mode: PortfolioMode;
  setMode: (mode: PortfolioMode) => void;
  activeLens: RoleLensKey | 'general';
  setLens: (lens: RoleLensKey | 'general') => void;
  activeModalProjectId: string | null;
  openModal: (projectId: string) => void;
  closeModal: () => void;
  visitedPits: Set<string>;
  markPitVisited: (projectId: string) => void;
  isSoundMuted: boolean;
  toggleSound: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  showFlyPet: boolean;
  toggleFlyPet: () => void;
  targetRideSector: number | null;
  setTargetRideSector: (sector: number | null) => void;
  searchFilter: string;
  setSearchFilter: (query: string) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  mode: 'blueprint',
  setMode: (mode) => set({ mode }),
  activeLens: 'general',
  setLens: (activeLens) => set({ activeLens }),
  activeModalProjectId: null,
  openModal: (activeModalProjectId) => set({ activeModalProjectId }),
  closeModal: () => set({ activeModalProjectId: null }),
  visitedPits: new Set<string>(),
  markPitVisited: (id) =>
    set((state) => {
      const next = new Set(state.visitedPits);
      next.add(id);
      return { visitedPits: next };
    }),
  isSoundMuted: true,
  toggleSound: () => set((state) => ({ isSoundMuted: !state.isSoundMuted })),
  isDarkMode: false,
  toggleDarkMode: () =>
    set((state) => {
      const next = !state.isDarkMode;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return { isDarkMode: next };
    }),
  showFlyPet: false,
  toggleFlyPet: () => set((state) => ({ showFlyPet: !state.showFlyPet })),
  targetRideSector: null,
  setTargetRideSector: (targetRideSector) => set({ targetRideSector }),
  searchFilter: '',
  setSearchFilter: (searchFilter) => set({ searchFilter }),
}));
