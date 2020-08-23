export const  getItemsLocalStorage = () => localStorage.getItem("saved") !== null
  ? JSON.parse(localStorage.getItem("saved"))
  : [];

export const  getGroupsLocalStorage = () => localStorage.getItem("savedGroups") !== null
  ? JSON.parse(localStorage.getItem("savedGroups"))
  : [{ id: this.counterGroup, name: `Group ${this.counterGroup}` }];