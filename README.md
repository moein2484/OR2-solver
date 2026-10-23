# OR2 Solver

**An Interactive Integer Linear Programming Approximation Solver**

OR2 Solver is a web-based educational optimization tool developed for an **Operations Research II** university project.

The application allows users to define Integer Linear Programming (ILP) problems, solve their Linear Programming (LP) relaxation, generate floor/ceil rounding combinations, evaluate feasibility, and select the best feasible rounded solution.

Built with **Next.js, React, Material UI, GLPK.js, and a custom form system (myForm)**.

## Features

- Define maximization and minimization problems.
- Dynamically add and remove decision variables.
- Support integer and binary variables.
- Configure variable lower and upper bounds.
- Dynamically create linear constraints using `≤`, `≥`, and `=`.
- Solve LP relaxations using GLPK.js.
- Generate floor and ceiling combinations for fractional variables.
- Validate rounded solutions against the original constraints.
- Calculate objective function values for all candidates.
- Select the best feasible candidate.
- Display LP results, rounded solutions, and feasibility statuses.
- Handle numerical precision and limit excessive rounding combinations.
- Responsive, right-to-left (RTL) interface.

## How the Algorithm Works

The application uses an LP-relaxation-based rounding heuristic.

**Step 1 — Define the ILP model**

The user specifies the objective function, decision variables, constraints, and variable bounds.

**Step 2 — Solve the LP relaxation**

The integrality requirements are temporarily removed while preserving the linear constraints and applicable variable bounds.

GLPK.js solves the resulting continuous optimization problem.

**Step 3 — Generate rounding combinations**

For each fractional decision variable, the algorithm generates two possible values:

- `Math.floor(value)`
- `Math.ceil(value)`

Variables already within numerical tolerance of an integer retain a single integer value.

For `k` fractional variables, up to `2^k` combinations are generated.

**Step 4 — Check feasibility**

Each rounded candidate is evaluated against:

- All original linear constraints
- Variable lower and upper bounds
- Integer and binary restrictions

Infeasible candidates are excluded from selection.

**Step 5 — Select the best solution**

The objective function is evaluated for feasible candidates.

The algorithm selects the candidate with the highest objective value for maximization or the lowest for minimization.

### Important Limitation

This approach is a **heuristic approximation method**, not an exact ILP solver.

It does not guarantee a globally optimal integer solution. Additionally, failing to find a feasible rounded candidate does not prove that the original ILP is infeasible.

The algorithm does not perform solution repair, local search, or additional optimization after rounding.

## Example

Consider the following integer programming problem:

Maximize:

`Z = 7x₁ + 5x₂`

Subject to:

```text
3x₁ + 2x₂ ≤ 12
 x₁ + 2x₂ ≤ 9

x₁, x₂ ≥ 0
x₁, x₂ ∈ Z
```

The optimal LP relaxation solution is:

```text
x₁ = 1.5
x₂ = 3.75
Z  = 29.25
```

The algorithm generates four rounding combinations:

| x₁ | x₂ | Objective Value | Feasibility |
|---:|---:|---:|---|
| 1 | 3 | 22 | Feasible |
| 1 | 4 | 27 | Feasible |
| 2 | 3 | 29 | Feasible — Best |
| 2 | 4 | 34 | Infeasible |

**Best feasible rounded solution:**

```text
x₁ = 2
x₂ = 3
Z  = 29
```

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Application framework |
| React | User interface |
| JavaScript | Application logic |
| Material UI (MUI) | UI components |
| myForm | Custom form management |
| React Hook Form | Underlying form state management |
| GLPK.js | Linear programming solver |
| KaTeX | Mathematical expression rendering |
| Vitest | Unit testing |

## Project Structure

```text
src/
├── app/
│   ├── page.js
│   ├── layout.js
│   └── globals.css
│
├── components/
│   └── optimization/
│       ├── ModelForm.jsx
│       ├── ModelFormFields.jsx
│       ├── ModelSettings.jsx
│       ├── ObjectiveForm.jsx
│       ├── VariablesForm.jsx
│       ├── ConstraintsForm.jsx
│       └── SolutionResult.jsx
│
├── component/
│   └── myForm/
│
└── lib/
    └── optimization/
        ├── model.js
        ├── evaluateObjective.js
        ├── checkFeasibility.js
        ├── rounding.js
        ├── findBestRoundedSolution.js
        ├── toGlpkModel.js
        ├── solveLP.js
        └── solveApproximation.js
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone <repository-url>
cd <repository-directory>
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests

```bash
npx vitest run
```

## Mathematical and Computational Considerations

**Numerical tolerance:** Floating-point values are compared using a small tolerance to avoid treating numerical noise as meaningful fractional values.

**Computational complexity:** For `k` fractional variables, `n` decision variables, and `m` constraints, generating and evaluating all rounding combinations requires approximately `O(2^k × m × n)` time for dense models.

**Candidate limit:** The implementation restricts the maximum number of generated candidates to prevent excessive memory and computation usage.

**LP status:** Rounding is performed only when the LP solver reports an optimal solution.

## Educational Purpose

This project demonstrates the relationship between linear programming relaxation, integer programming, rounding heuristics, feasibility verification, and objective-based candidate selection.

It was developed as an educational project for **Operations Research II (OR2)**.

## License

No license has been specified yet. Add a `LICENSE` file if you intend to distribute the project under an open-source license.
