const rootSelector = (state) => state.entities.get('enumberables');

const fetchingSelector = (state) => state.entities.getIn(['enumberables','fetching']);

const enumberablesSelector = (state) => state.entities.getIn(['credits','enumberables']);

export {
  rootSelector,
  fetchingSelector,
  enumberablesSelector,
};
