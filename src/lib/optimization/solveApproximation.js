
import { solveLP } from "./solveLP";
import { findBestRoundedSolution } from "./findBestRoundedSolution";

export async function solveApproximation(model) {
  const lpResult = await solveLP(model);

  if (lpResult.status !== "optimal") {
    return {
      status: "lp_not_optimal",
      lpResult,
      roundingResult: null,
    };
  }

  const roundingResult = findBestRoundedSolution(
    model,
    lpResult.values
  );

  return {
    status: roundingResult.status,
    lpResult,
    roundingResult,
  };
}
