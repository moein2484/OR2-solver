
import GLPK from "glpk.js";
import { toGlpkModel } from "./toGlpkModel";

let glpkPromise = null;

async function getGlpk() {
  if (!glpkPromise) {
    glpkPromise = GLPK().catch((error) => {
      glpkPromise = null;
      throw error;
    });
  }

  return glpkPromise;
}

export async function solveLP(model) {
  const glpk = await getGlpk();

  const glpkModel = toGlpkModel(model, glpk);

  const solution = await glpk.solve(glpkModel, {
    msgLevel: glpk.GLP_MSG_OFF,
    presol: true,
  });

  const result = solution.result;

  if (result.status !== glpk.GLP_OPT) {
    return {
      status: "not_optimal",
      solverStatus: result.status,
      objectiveValue: null,
      values: null,
    };
  }

  const values = model.variables.map((variable) => {
    const value = result.vars[variable.name];

    if (typeof value !== "number" || !Number.isFinite(value)) {
      throw new Error(
        `مقدار متغیر ${variable.name} نامعتبر است.`
      );
    }

    return value;
  });

  return {
    status: "optimal",
    objectiveValue: result.z,
    values,
  };
}
