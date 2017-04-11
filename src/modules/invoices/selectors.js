import { createSelector } from 'reselect';
import { filterEntitiesByOrgId } from '../../filters';

const rootSelector = (state) => state.entities.get('invoices');

const fetchingSelector = (state) => state.entities.getIn(['invoices','fetching']);

const querySelector = (state) => state.entities.getIn(['jobs','query']);

const filtersSelector = (state) => state.entities.getIn(['invoices','filters']);

const resultSelector = (state) => state.entities.getIn(['invoices','result']);

const invoicesSelector = createSelector(
  rootSelector,
  (invoices) => invoices.getIn(['entities','invoices'])
);

const invoiceByIdSelector = createSelector(
  [invoicesSelector, resultSelector],
  (invoices, result) => invoices.get(result.first().toString())
);

const invoicesByFiltersSelector = createSelector(
  [invoicesSelector, filtersSelector],
  (invoices, filters) => invoices
    .filter(invoice => filterEntitiesByOrgId(invoice, filters.get('organisationId')))
);

export {
  rootSelector,
  fetchingSelector,
  querySelector,
  filtersSelector,
  resultSelector,
  invoicesSelector,
  invoiceByIdSelector,
  invoicesByFiltersSelector,
};
