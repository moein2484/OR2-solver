
import { describe, expect, it } from "vitest";

import { initialModel } from "./model";
import { evaluateObjective } from "./evaluateObjective";
import { checkFeasibility } from "./checkFeasibility";

describe("Optimization model", () => {
  it("calculates objective correctly", () => {
    const result = evaluateObjective(
      initialModel.objective.coefficients,
      [2, 3]
    );

    expect(result).toBe(29);
  });

  it("accepts a feasible integer solution", () => {
    const result = checkFeasibility(initialModel, [2, 3]);

    expect(result.feasible).toBe(true);
  });

  it("rejects a solution violating constraints", () => {
    const result = checkFeasibility(initialModel, [2, 4]);

    expect(result.feasible).toBe(false);
  });

  it("rejects fractional integer variables", () => {
    const result = checkFeasibility(initialModel, [1.5, 3.75]);

    expect(result.feasible).toBe(false);
  });
});
