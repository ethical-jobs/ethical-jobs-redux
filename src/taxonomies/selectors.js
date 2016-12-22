const rootSelector = (state) => state.entities.get('taxonomies');

const fetchingSelector = (state) => state.entities.getIn(['taxonomies','fetching']);

const taxonomiesSelector = (state) => state.entities.getIn(['taxonomies','taxonomies']);

export {
  rootSelector,
  fetchingSelector,
  taxonomiesSelector,
};
