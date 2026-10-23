
export function evaluateObjective(coefficients, values) {
  if (coefficients.length !== values.length) {
    throw new Error("تعداد ضرایب و متغیرها برابر نیست.");
  }

  return coefficients.reduce((total, coefficient, index) => {
    return total + coefficient * values[index];
  }, 0);
}
