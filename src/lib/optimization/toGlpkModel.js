
export function toGlpkModel(model, glpk) {
  const objectiveVars = model.variables.map(
    (variable, index) => ({
      name: variable.name,
      coef: model.objective.coefficients[index],
    })
  );

  const subjectTo = model.constraints.map((constraint) => {
    let type;

    switch (constraint.operator) {
      case "<=":
        type = glpk.GLP_UP;
        break;

      case ">=":
        type = glpk.GLP_LO;
        break;

      case "=":
        type = glpk.GLP_FX;
        break;

      default:
        throw new Error("عملگر محدودیت نامعتبر است.");
    }

    return {
      name: constraint.id,
      vars: model.variables.map((variable, index) => ({
        name: variable.name,
        coef: constraint.coefficients[index],
      })),
      bnds: {
        type,
        lb: constraint.rhs,
        ub: constraint.rhs,
      },
    };
  });

  const bounds = model.variables.map((variable) => {
    const lower =
      variable.type === "binary"
        ? Math.max(variable.lowerBound ?? 0, 0)
        : variable.lowerBound;

    const upper =
      variable.type === "binary"
        ? Math.min(variable.upperBound ?? 1, 1)
        : variable.upperBound;

    if (lower != null && upper != null && lower > upper) {
      throw new Error(
        `کران‌های متغیر ${variable.name} نامعتبر هستند.`
      );
    }

    let type;

    if (lower == null && upper == null) {
      type = glpk.GLP_FR;
    } else if (lower != null && upper == null) {
      type = glpk.GLP_LO;
    } else if (lower == null && upper != null) {
      type = glpk.GLP_UP;
    } else if (lower === upper) {
      type = glpk.GLP_FX;
    } else {
      type = glpk.GLP_DB;
    }

    return {
      name: variable.name,
      type,
      lb: lower ?? 0,
      ub: upper ?? 0,
    };
  });

  return {
    name: "OR2_Model",

    objective: {
      direction:
        model.direction === "max"
          ? glpk.GLP_MAX
          : glpk.GLP_MIN,

      name: "objective",
      vars: objectiveVars,
    },

    subjectTo,
    bounds,
  };
}
