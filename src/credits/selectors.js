const rootSelector = (state) => state.entities.get('credits');

const fetchingSelector = (state) => state.entities.getIn(['credits','fetching']);

const creditPacksSelector = (state) => state.entities.getIn(['credits','creditPacks']);

export {
  rootSelector,
  fetchingSelector,
  creditPacksSelector,
};
