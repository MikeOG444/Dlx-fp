
# Dancing Links Financial Planner

A sophisticated portfolio optimization tool using Donald Knuth's Dancing Links algorithm to solve financial resource allocation problems.

## Overview

This project applies the Dancing Links (DLX) algorithm - a technique created by Donald Knuth for efficiently implementing his Algorithm X - to financial portfolio optimization. The implementation treats financial planning as an exact cover problem, allowing for efficient exploration of possible investment combinations while respecting multiple constraints.

## Features

- **Powerful Constraint Solving**: Find optimal investment combinations that satisfy all your financial requirements
- **Multiple Optimization Goals**: Optimize for maximum return, minimum risk, or best return-to-risk ratio
- **Efficient Algorithm**: Uses Dancing Links for backtracking, making it much faster than naive approaches
- **Interactive Demo**: Web-based visualization of portfolio allocations with adjustable parameters

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/dancing-links-financial-planner.git
cd dancing-links-financial-planner

# Install dependencies
npm install

# Start the development server
npm start
```

## Usage

### Basic Example

```javascript
import { FinancialPlanner } from './dancing-links-finance';

// Create a financial planner
const planner = new FinancialPlanner();

// Define your investment options
const investments = [
  { 
    id: 'stock_a', 
    name: 'Stock A', 
    cost: 5000, 
    expectedReturn: 500, 
    risk: 3, 
    liquidity: 8, 
    diversification: 2 
  },
  // Add more investment options...
];

// Define your problem parameters
const problemParams = {
  budget: 15000,
  investments,
  requirements: {
    liquidity: 20,
    diversification: 15
  }
};

// Create and solve the problem
const problem = planner.createProblem(problemParams);
const portfolios = planner.solvePortfolio(problem, 20);

// Optimize for different goals
const bestReturnPortfolio = planner.optimizePortfolio(portfolios, 'return');
const lowestRiskPortfolio = planner.optimizePortfolio(portfolios, 'risk');
const bestRatioPortfolio = planner.optimizePortfolio(portfolios, 'ratio');

console.log(bestRatioPortfolio);
```

### Adding Custom Constraints

You can extend the framework to include additional financial constraints:

```javascript
// Define custom constraints
const customProblemParams = {
  budget: 20000,
  investments: myInvestments,
  requirements: {
    liquidity: 25,
    diversification: 18,
    esgScore: 30,       // Custom ESG (Environmental, Social, Governance) requirement
    foreignExposure: 15 // Custom international exposure requirement
  }
};

// Make sure your investments include these properties
const myInvestments = [
  {
    id: 'sustainable_fund',
    name: 'Sustainable Fund',
    cost: 4000,
    expectedReturn: 350,
    risk: 2,
    liquidity: 7,
    diversification: 5,
    esgScore: 9,        // Custom property
    foreignExposure: 4  // Custom property
  },
  // More investments...
];
```

## How It Works

### The Dancing Links Algorithm

The Dancing Links technique is an efficient way to implement backtracking algorithms, particularly Knuth's Algorithm X for solving exact cover problems. In our financial context:

1. **Matrix Construction**: We build a matrix where:
   - Columns represent constraints (budget, minimum liquidity, etc.)
   - Rows represent investment options
   - A 1 in position (i,j) means investment i contributes to constraint j

2. **Exact Cover Problem**: We need to select a subset of rows (investments) such that each column (constraint) has exactly one 1.

3. **Algorithm X**: We recursively:
   - Choose a column (constraint)
   - Try each investment that satisfies this constraint
   - Cover all constraints this investment helps satisfy
   - Recurse on the reduced problem
   - If no solution, backtrack and try another investment

4. **Dancing Links**: Makes the operations of covering and uncovering rows and columns very efficient through clever pointer manipulation.

### Financial Planning Application

The financial planning application:

1. Converts financial constraints into the exact cover problem format
2. Finds all possible portfolios that satisfy the constraints
3. Ranks portfolios according to specified optimization goals

## Project Structure

```
├── src/
│   ├── dancing-links-finance.js  # Core DLX implementation for finance
│   ├── demo-app.js               # React demo application
│   └── ...
├── public/
│   └── ...
├── README.md
└── package.json
```

## Customization

You can customize the tool by:

- Adding different investment types
- Defining new constraints
- Creating custom optimization strategies
- Extending the UI for different visualizations

## Performance Considerations

The Dancing Links algorithm is much more efficient than brute-force approaches, but performance can still be affected by:

- The number of investment options
- The strictness of constraints
- The number of requested solutions

For large investment sets (>30 options), consider limiting the maximum solutions to explore.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Donald Knuth for the Dancing Links algorithm
- [Paper: Dancing Links (2000)](https://arxiv.org/abs/cs/0011047)
