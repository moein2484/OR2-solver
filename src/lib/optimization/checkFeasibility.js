
const EPSILON = 1e-7;

export function checkFeasibility(model, values) {
  if (values.length !== model.variables.length) {
    throw new Error("تعداد مقادیر متغیرها نامعتبر است.");
  }

  const variableChecks = model.variables.map((variable, index) => {
    const value = values[index];

    const isFiniteNumber =
      typeof value === "number" && Number.isFinite(value);

    if (!isFiniteNumber) {
      return false;
    }

    const lowerBound = variable.lowerBound ?? 0;
    const upperBound = variable.upperBound;

    const withinLower = value >= lowerBound - EPSILON;

    const withinUpper =
      upperBound == null ||
      value <= upperBound + EPSILON;

    const isInteger =
      Math.abs(value - Math.round(value)) <= EPSILON;

    const validType =
      variable.type === "binary"
        ? isInteger && value >= 0 && value <= 1
        : isInteger;

    return withinLower && withinUpper && validType;
  });

  const constraintChecks = model.constraints.map((constraint) => {
    if (constraint.coefficients.length !== values.length) {
      throw new Error("تعداد ضرایب محدودیت نامعتبر است.");
    }

    const lhs = constraint.coefficients.reduce(
      (total, coefficient, index) =>
        total + coefficient * values[index],
      0
    );

    const rhs = constraint.rhs;

    switch (constraint.operator) {
      case "<=":
        return lhs <= rhs + EPSILON;

      case ">=":
        return lhs >= rhs - EPSILON;

      case "=":
        return Math.abs(lhs - rhs) <= EPSILON;

      default:
        throw new Error("عملگر محدودیت نامعتبر است.");
    }
  });

  return {
    feasible:
      variableChecks.every(Boolean) &&
      constraintChecks.every(Boolean),

    variableChecks,
    constraintChecks,
  };
}
