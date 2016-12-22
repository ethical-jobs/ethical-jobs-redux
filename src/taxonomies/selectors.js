const rootSelector = (state) => state.entities.get('enumberables');

const fetchingSelector = (state) => state.entities.getIn(['enumberables','fetching']);

const taxonomiesSelector = (state) => state.entities.getIn(['credits','taxonomies']);

export {
  rootSelector,
  fetchingSelector,
  taxonomiesSelector,
};
