import React, { useState } from 'react';
import { FinancialPlanner } from './dancing-links-finance';

const FinancialPlannerDemo = () => {
  const [budget, setBudget] = useState(15000);
  const [liquidityReq, setLiquidityReq] = useState(20);
  const [diversificationReq, setDiversificationReq] = useState(15);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  // Predefined investments
  const investments = [
    { id: 'stock_a', name: 'Stock A', cost: 5000, expectedReturn: 500, risk: 3, liquidity: 8, diversification: 2 },
    { id: 'stock_b', name: 'Stock B', cost: 3000, expectedReturn: 450, risk: 4, liquidity: 7, diversification: 2 },
    { id: 'bond_a', name: 'Bond A', cost: 4000, expectedReturn: 200, risk: 1, liquidity: 5, diversification: 3 },
    { id: 'bond_b', name: 'Bond B', cost: 3500, expectedReturn: 250, risk: 2, liquidity: 4, diversification: 3 },
    { id: 'real_estate', name: 'Real Estate', cost: 10000, expectedReturn: 800, risk: 5, liquidity: 2, diversification: 5 },
    { id: 'gold', name: 'Gold', cost: 2000, expectedReturn: 100, risk: 2, liquidity: 6, diversification: 4 },
    { id: 'crypto', name: 'Cryptocurrency', cost: 1500, expectedReturn: 600, risk: 9, liquidity: 9, diversification: 1 },
    { id: 'mutual_fund', name: 'Mutual Fund', cost: 3000, expectedReturn: 300, risk: 3, liquidity: 7, diversification: 7 },
    { id: 'etf', name: 'ETF', cost: 2500, expectedReturn: 350, risk: 2, liquidity: 8, diversification: 6 },
    { id: 'p2p_lending', name: 'P2P Lending', cost: 2000, expectedReturn: 400, risk: 6, liquidity: 3, diversification: 4 }
  ];

  const runOptimization = () => {
    setLoading(true);
    
    // Create a new financial planner
    const planner = new FinancialPlanner();
    
    // Define problem parameters
    const problemParams = {
      budget,
      investments,
      requirements: {
        liquidity: liquidityReq,
        diversification: diversificationReq
      }
    };
    
    // Create and solve the problem
    const problem = planner.createProblem(problemParams);
    const portfolios = planner.solvePortfolio(problem, 20);
    
    // Optimize portfolios for different goals
    const bestReturnPortfolio = planner.optimizePortfolio(portfolios, 'return');
    const lowestRiskPortfolio = planner.optimizePortfolio(portfolios, 'risk');
    const bestRatioPortfolio = planner.optimizePortfolio(portfolios, 'ratio');
    
    setResults({
      totalSolutions: portfolios.length,
      bestReturnPortfolio,
      lowestRiskPortfolio,
      bestRatioPortfolio
    });
    
    setLoading(false);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  const renderPortfolio = (portfolio, title) => {
    if (!portfolio) return null;
    
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="mb-2">Total Return: {formatCurrency(portfolio.totalReturn)}</p>
        <p className="mb-2">Total Risk: {portfolio.totalRisk.toFixed(1)}</p>
        <p className="mb-2">Return/Risk Ratio: {portfolio.returnToRiskRatio.toFixed(2)}</p>
        <p className="mb-4">Total Investment: {formatCurrency(portfolio.totalInvestment)}</p>
        
        <h4 className="font-medium mb-2">Allocated Investments:</h4>
        <div className="space-y-2">
          {portfolio.investments.map(inv => (
            <div key={inv.id} className="flex justify-between items-center border-b pb-1">
              <span>{inv.name}</span>
              <span className="font-medium">{formatCurrency(inv.cost)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Financial Planning with Dancing Links</h1>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <p className="text-sm">
          This demo uses Donald Knuth's Dancing Links algorithm to solve the financial portfolio allocation problem,
          treating it as an exact cover problem. The algorithm efficiently finds combinations of investments that
          satisfy all constraints while optimizing for different goals.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Budget</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={budget}
            onChange={(e) => setBudget(parseInt(e.target.value))}
            min="1000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Min Liquidity Score</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={liquidityReq}
            onChange={(e) => setLiquidityReq(parseInt(e.target.value))}
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Min Diversification Score</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={diversificationReq}
            onChange={(e) => setDiversificationReq(parseInt(e.target.value))}
            min="0"
          />
        </div>
      </div>
      
      <button
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full mb-6"
        onClick={runOptimization}
        disabled={loading}
      >
        {loading ? 'Optimizing...' : 'Optimize Portfolio'}
      </button>
      
      {results && (
        <div>
          <p className="text-center mb-4">
            Found {results.totalSolutions} possible portfolio combinations that satisfy all constraints
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderPortfolio(results.bestReturnPortfolio, 'Highest Return Portfolio')}
            {renderPortfolio(results.lowestRiskPortfolio, 'Lowest Risk Portfolio')}
            {renderPortfolio(results.bestRatioPortfolio, 'Best Return/Risk Ratio')}
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialPlannerDemo;