const rootSelector = (state) => state.getIn(['entities','taxonomies']);

const fetchingSelector = (state) => state.getIn(['entities','taxonomies','fetching']);

const taxonomiesSelector = (state) => state.getIn(['entities','taxonomies','taxonomies']);

export {
  rootSelector,
  fetchingSelector,
  taxonomiesSelector,
};
