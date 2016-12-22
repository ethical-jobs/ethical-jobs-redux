import { createSelector } from 'reselect';
import { isSuperAdmin } from 'library/auth';

const authSelector = (state) => state.auth;

const entitiesSelector = createSelector(
  authSelector,
  (auth) => auth.entities
);

const userSelector = createSelector(
  [entitiesSelector, authSelector],
  (entities, auth) => entities.users && auth.result ? entities.users[auth.result] : null // assume its the first user, cause it just is!
);

const organisationSelector = createSelector(
  entitiesSelector,
  userSelector,
  (entities, user) => entities && entities.organisations && user ? entities.organisations[user.organisation_id] : null
);

const isSuperAdminSelector = createSelector(
  userSelector,
  (user) => isSuperAdmin(user)
);

export {
  authSelector,
  userSelector,
  organisationSelector,
  isSuperAdminSelector,
};
