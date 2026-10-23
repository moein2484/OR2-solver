
const EPSILON = 1e-7;
const MAX_CANDIDATES = 65536;

export function generateRoundedCandidates(lpValues) {
  if (!Array.isArray(lpValues)) {
    throw new Error("جواب LP باید یک آرایه باشد.");
  }

  const options = lpValues.map((value) => {
    if (typeof value !== "number" || !Number.isFinite(value)) {
      throw new Error("مقادیر جواب LP باید اعداد معتبر باشند.");
    }

    const nearestInteger = Math.round(value);

    if (Math.abs(value - nearestInteger) <= EPSILON) {
      return [nearestInteger];
    }

    return [Math.floor(value), Math.ceil(value)];
  });

  const fractionalCount = options.filter(
    (item) => item.length === 2
  ).length;

  if (2 ** fractionalCount > MAX_CANDIDATES) {
    throw new Error(
      "تعداد ترکیب‌های گرد کردن بیش از حد مجاز است."
    );
  }

  let candidates = [[]];

  for (const variableOptions of options) {
    const nextCandidates = [];

    for (const candidate of candidates) {
      for (const value of variableOptions) {
        nextCandidates.push([...candidate, value]);
      }
    }

    candidates = nextCandidates;
  }

  return candidates;
}
