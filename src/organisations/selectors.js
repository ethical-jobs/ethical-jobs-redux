import { createSelector } from 'reselect';
import { mapObjectToArray } from 'library/map';

const baseSelector = (state) => state.entities.organisations;

const requestingSelector = createSelector(
  baseSelector,
  (base) => base._requesting
);

const entitiesSelector = createSelector(
  baseSelector,
  (base) => base.entities
);

//
// Organisations
//

const organisationsSelector = createSelector(
  entitiesSelector,
  (entities) => entities.organisations
);

const organisationsArraySelector = createSelector(
  organisationsSelector,
  (organisations) => mapObjectToArray(organisations)
);

//
// Single Organisation
//

const organisationResultSelector = state => state.entities.organisations.result;

const organisationByIdSelector = createSelector(
  [organisationsSelector, organisationResultSelector],
  (organisations, result) => organisations && result ? organisations[result] : null
);

//
// Organisation users selectors
//

const usersSelector = createSelector(
  entitiesSelector,
  (entities) => entities.users
);


const organisationOwnerSelector = createSelector(
  [usersSelector, organisationByIdSelector],
  (users, organisation) => users && organisation ? users[organisation.owner_id] : null
);

export {
  requestingSelector,
  organisationsSelector,
  organisationsArraySelector,
  organisationByIdSelector,
  organisationOwnerSelector,
};
