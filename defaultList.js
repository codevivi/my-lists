// const defaultList = {
//   name: "My list",
//   sizeCompleted: 0,
//   sizeUndone: 0,
//   items: {},
// };
// const listExample = {
//   name: "Shopping",
//   sizeCompleted: 4,
//   sizeUndone: 4,
//   items: {
//     id0: { id: 0, order: 2, value: "Bulbes", comleted: false },
//     id1: { id: 1, order: 3, value: "Duona", completed: false },
//     id1: { id: 2, order: 4, value: "Zoporazietis", completed: false },
//     id1: { id: 3, order: 1, value: "Abrikosai", completed: false },
//     id4: { id: 4, order: 1, value: "Asilas", completed: true },
//     id5: { id: 5, order: 2, value: "bidonas", completed: true },
//     id6: { id: 6, order: 3, value: "citrina", completed: true },
//     id7: { id: 7, order: 4, value: "donnuts", completed: true },
//   },
// };

const DEFAULT_LIST = {
  name: "My list",
  sizeCompleted: 0,
  sizeUndone: 0,
  itemsUndone: [],
  itemsCompleted: [],
};
// const LIST_EXAMPLE = {
//   name: "Shopping",
//   //sizeCompleted: 4,
//   //sizeUndone: 4,
//   itemsUndone: [
//     { id: 0, order: 2, value: "Bulbes", comleted: false },
//     { id: 1, order: 3, value: "Duona", completed: false },
//     { id: 2, order: 4, value: "Zoporazietis", completed: false },
//     { id: 3, order: 1, value: "Abrikosai", completed: false },
//   ],
//   itemsCompleted: [
//     { id: 4, order: 1, value: "Asilas", completed: true },
//     { id: 5, order: 2, value: "bidonas", completed: true },
//     { id: 6, order: 3, value: "citrina", completed: true },
//     { id: 7, order: 4, value: "donnuts", completed: true },
//   ],
// };
const LIST_EXAMPLE = {
  name: "Shopping",
  //sizeCompleted: 4,
  //sizeUndone: 4,
  itemsUndone: [
    [0, { id: 0, value: "Bulbes", comleted: false }],
    [1, { id: 1, value: "Duona", completed: false }],
    [2, { id: 2, value: "Zoporazietis", completed: false }],
    [3, { id: 3, value: "Abrikosai", completed: false }],
  ],
  itemsCompleted: [
    [4, { id: 4, value: "Asilas", completed: true }],
    [5, { id: 5, value: "bidonas", completed: true }],
    [6, { id: 6, value: "citrina", completed: true }],
    [7, { id: 7, value: "donnuts", completed: true }],
  ],
};
module.exports = { DEFAULT_LIST: DEFAULT_LIST, LIST_EXAMPLE: LIST_EXAMPLE };
