import React from 'react';
import { PortfolioGrid } from '../components/portfolio/PortfolioGrid';

export const PortfolioPage = () => {
  return (
    <div className="pt-24 min-h-screen bg-studio-bg">
      <PortfolioGrid showFilter={true} />
    </div>
  );
};
