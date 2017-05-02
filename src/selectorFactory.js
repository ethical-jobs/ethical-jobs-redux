import Immutable from 'immutable';
import ImmutableTools from 'ethical-jobs-redux';
import { createSelector } from 'reselect';

const create = (key, property) => state => state.getIn(['entities', key, property])

const createWithDefault = (key, property, defaultVal) => state => state.getIn([
  'entities', key, property
], defaultVal)

const createFiltersSelector = key => createWithDefault(key, 'filters', Immutable.Map());

const createPropFiltersSelector = () => (state, props) => Immutable.Map(props.filters, Immutable.Map());

const createResultSelector = key => createWithDefault(key, 'result', false);

const createResultsSelector = key => createWithDefault(key, 'results', Immutable.List());

const createEntitiesSelector = (key, nestedKey) => state => state.getIn([
  'entities', key, 'entities', nestedKey || key
], Immutable.Map());

const createOrderedEntitiesSelector = (entitiesSelector, resultsSelector) => createSelector(
  [entitiesSelector, resultsSelector],
  (entities, results) => ImmutableTools.createOrderedMap(results, entities)
);

const createIdSelector = (entitiesSelector, resultSelector) => createSelector(
  [entitiesSelector, resultSelector],
  (entities, result) => entities.get(result.toString())
);

export default {
  create,
  createWithDefault,
  createFiltersSelector,
  createPropFiltersSelector,
  createResultSelector,
  createResultsSelector,
  createEntitiesSelector,
  createOrderedEntitiesSelector,
  createIdSelector,
};
