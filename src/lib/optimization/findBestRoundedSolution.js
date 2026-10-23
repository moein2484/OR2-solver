
import { generateRoundedCandidates } from "./rounding";
import { checkFeasibility } from "./checkFeasibility";
import { evaluateObjective } from "./evaluateObjective";

export function findBestRoundedSolution(model, lpValues) {
  const candidates = generateRoundedCandidates(lpValues);

  const results = candidates.map((values) => {
    const feasibility = checkFeasibility(model, values);

    const objectiveValue = evaluateObjective(
      model.objective.coefficients,
      values
    );

    return {
      values,
      objectiveValue,
      feasible: feasibility.feasible,
      variableChecks: feasibility.variableChecks,
      constraintChecks: feasibility.constraintChecks,
    };
  });

  const feasibleResults = results.filter(
    (result) => result.feasible
  );

  if (feasibleResults.length === 0) {
    return {
      status: "no_feasible_rounded_solution",
      bestSolution: null,
      candidates: results,
    };
  }

  const bestSolution = feasibleResults.reduce((best, current) => {
    if (model.direction === "max") {
      return current.objectiveValue > best.objectiveValue
        ? current
        : best;
    }

    return current.objectiveValue < best.objectiveValue
      ? current
      : best;
  });

  return {
    status: "success",
    bestSolution,
    candidates: results,
  };
}
