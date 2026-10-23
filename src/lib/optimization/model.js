
export const initialModel = {
  direction: "max",

  variables: [
    {
      id: "x1",
      name: "x1",
      type: "integer",
      lowerBound: 0,
      upperBound: null,
    },
    {
      id: "x2",
      name: "x2",
      type: "integer",
      lowerBound: 0,
      upperBound: null,
    },
  ],

  objective: {
    coefficients: [7, 5],
  },

  constraints: [
    {
      id: "c1",
      coefficients: [3, 2],
      operator: "<=",
      rhs: 12,
    },
    {
      id: "c2",
      coefficients: [1, 2],
      operator: "<=",
      rhs: 9,
    },
  ],
};
