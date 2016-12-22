import { setAuthCookie } from 'library/auth';
import { stringify } from 'query-string';
import {
  FETCH_ORGS_REQUEST,
  FETCH_ORGS_SUCCESS,
  FETCH_ORGS_FAILURE,
  FETCH_ORG_REQUEST,
  FETCH_ORG_SUCCESS,
  FETCH_ORG_FAILURE,
  CREATE_REQUEST,
  CREATE_SUCCESS,
  CREATE_FAILURE,
  ARCHIVE_REQUEST,
  ARCHIVE_SUCCESS,
  ARCHIVE_FAILURE,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
  CREATE_CREDITS_REQUEST,
  CREATE_CREDITS_SUCCESS,
  CREATE_CREDITS_FAILURE,
  DEDUCT_CREDITS_REQUEST,
  DEDUCT_CREDITS_SUCCESS,
  DEDUCT_CREDITS_FAILURE,
} from './constants';

/**
 * Fetch organisations thunk
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function fetchOrganisations(params) {
  return {
    types: [FETCH_ORGS_REQUEST, FETCH_ORGS_SUCCESS, FETCH_ORGS_FAILURE],
    promise: (api) => api.get(`/organisations?${stringify(params)}`),
  };
}

/**
 * Fetch a single organisation
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function fetchOrganisation(organisationId) {
  return {
    types: [FETCH_ORG_REQUEST, FETCH_ORG_SUCCESS, FETCH_ORG_FAILURE],
    promise: (api) => api.get(`/organisation/${organisationId}`),
  };
}

/**
 * Create organisation
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */
export function createOrganisation(values) {
  return {
    types: [CREATE_REQUEST, CREATE_SUCCESS, CREATE_FAILURE],
    promise: (api) => api.post('/organisation/register', values).then(response => {
      if (response.meta && response.meta.token) {
        setAuthCookie(response.meta.token);
      }
      return response;
    }),
    log: {
      values,
    },
    notifications: {
      success: 'Thank you for registering.',
      failure: 'There was an error registering your organisation.',
    },
  };
}

/**
 * Update organisation profile
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function updateOrganisation(organisationId, values) {
  return {
    types: [UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAILURE],
    promise: (api) => api.post(`/organisation/${organisationId}/update`, values),
    log: {
      organisationId,
      values,
    },
    notifications: {
      success: 'Thanks for updating your information! Any updates will take approximately two business hours to appear on your live job ads on EthicalJobs.com.au.',
      failure: 'There was an error updating your organisation.',
    },
  };
}

/**
 * Archive organisation with its jobs and invoices
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function archiveOrganisation(organisationId, restore) {
  const action = restore ? 'restore' : 'delete';
  return {
    types: [ARCHIVE_REQUEST, ARCHIVE_SUCCESS, ARCHIVE_FAILURE],
    promise: (api) => api.post(`/organisation/${organisationId}/${action}`),
    log: {
      organisationId,
      restore: !!restore,
    },
    notifications: {
      success: restore ? 'Organisation has been restored.' : 'Organisation has been archived.',
      failure: restore ? 'There was an error restoring the organisation.' : 'There was an error archiving the organisation.',
    },
  };
}

/**
 * Create credits request
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function createCredits(organisationId, values) {
  return {
    types: [CREATE_CREDITS_REQUEST, CREATE_CREDITS_SUCCESS, CREATE_CREDITS_FAILURE],
    promise: (api) => api.post(`/organisation/${organisationId}/credits/create`, values),
    log: {
      organisationId,
      values,
    },
    notifications: {
      success: `${values.volume} ${values.service_type.toLowerCase()} credits generated.`,
      failure: 'There was an error generating the credits.',
    },
  };
}

/**
 * Deduct credits request
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function deductCredits(organisationId, values) {
  return {
    types: [DEDUCT_CREDITS_REQUEST, DEDUCT_CREDITS_SUCCESS, DEDUCT_CREDITS_FAILURE],
    promise: (api) => api.post(`/organisation/${organisationId}/credits/deduct`, values),
    log: {
      organisationId,
      values,
    },
    notifications: {
      success: `${values.volume} credits deducted.`,
      failure: 'There was an error deducting the credits.',
    },
  };
}

/**
 * Upload organisation logo
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function uploadLogo(organisationId, media) {
  const file = new FormData();
  file.append('logo', media);
  return {
    types: [UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAILURE],
    promise: api => api.post(`/organisation/${organisationId}/logo`, file),
    log: {
      organisationId,
    },
    notifications: {
      success: 'Logo updated.',
      failure: 'There was an error updating your logo.',
    },
  };
}
