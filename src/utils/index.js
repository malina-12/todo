export const getItemsLocalStorage = () => localStorage.getItem('saved') !== null
  ? JSON.parse(localStorage.getItem('saved'))
  : [];

export const getGroupsLocalStorage = () => localStorage.getItem('savedGroups') !== null
  ? JSON.parse(localStorage.getItem('savedGroups'))
  : [{ id: this.counterGroup, name: `Group ${this.counterGroup}` }];

  export const commonFilter = (arr, status, groupId, page) => {
    const filteredByGroup = filterGroup(arr, groupId);
    const filteredByStatus = filterItems(filteredByGroup, status);
    const filteredByPage = showItems(filteredByStatus, page);
    return { filteredByGroup, filteredByStatus, filteredByPage };
  };

  export const filterGroup = (arr, groupId) => {
    const flitered = arr.filter((item) => item.group === groupId);
    return flitered;
  };

  export const filterItems = (arr, status) => {
    switch (status) {
      case 'planned':
        return arr.filter((item) => !item.done);

      case 'done':
        return arr.filter((item) => item.done);

      default:
        return arr;
    }
  };

  export const showItems = (arr, page, limit = 10) => {
    const start = (page - 1) * limit;
    const end = start + limit;
    const currentPageItems = arr.slice(start, end);
    return currentPageItems;
  };