const rootSelector = (state) => state.entities.get('enumerables');

const fetchingSelector = (state) => state.entities.getIn(['enumerables','fetching']);

const enumerablesSelector = (state) => state.entities.getIn(['credits','enumerables']);

export {
  rootSelector,
  fetchingSelector,
  enumerablesSelector,
};
