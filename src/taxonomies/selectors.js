const rootSelector = (state) => state.entities.get('enumerables');

const fetchingSelector = (state) => state.entities.getIn(['enumerables','fetching']);

const taxonomiesSelector = (state) => state.entities.getIn(['credits','taxonomies']);

export {
  rootSelector,
  fetchingSelector,
  taxonomiesSelector,
};
