import React from 'react';
import { usePortfolioStore } from './store/portfolioStore';
import { BlueprintView } from './components/Blueprint/BlueprintView';
import { RiderCanvas } from './components/Rider/RiderCanvas';
import { ModalWrapper } from './components/Modals/ModalWrapper';

export function App() {
  const { mode } = usePortfolioStore();

  return (
    <>
      {mode === 'blueprint' ? <BlueprintView /> : <RiderCanvas />}
      <ModalWrapper />
    </>
  );
}

export default App;
