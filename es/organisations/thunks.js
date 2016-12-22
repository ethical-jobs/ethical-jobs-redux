'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchOrganisations = fetchOrganisations;
exports.fetchOrganisation = fetchOrganisation;
exports.createOrganisation = createOrganisation;
exports.updateOrganisation = updateOrganisation;
exports.archiveOrganisation = archiveOrganisation;
exports.createCredits = createCredits;
exports.deductCredits = deductCredits;
exports.uploadLogo = uploadLogo;

var _auth = require('library/auth');

var _queryString = require('query-string');

var _constants = require('./constants');

/**
 * Fetch organisations thunk
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

function fetchOrganisations(params) {
  return {
    types: [_constants.FETCH_ORGS_REQUEST, _constants.FETCH_ORGS_SUCCESS, _constants.FETCH_ORGS_FAILURE],
    promise: function promise(api) {
      return api.get('/organisations?' + (0, _queryString.stringify)(params));
    }
  };
}

/**
 * Fetch a single organisation
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

function fetchOrganisation(organisationId) {
  return {
    types: [_constants.FETCH_ORG_REQUEST, _constants.FETCH_ORG_SUCCESS, _constants.FETCH_ORG_FAILURE],
    promise: function promise(api) {
      return api.get('/organisation/' + organisationId);
    }
  };
}

/**
 * Create organisation
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */
function createOrganisation(values) {
  return {
    types: [_constants.CREATE_REQUEST, _constants.CREATE_SUCCESS, _constants.CREATE_FAILURE],
    promise: function promise(api) {
      return api.post('/organisation/register', values).then(function (response) {
        if (response.meta && response.meta.token) {
          (0, _auth.setAuthCookie)(response.meta.token);
        }
        return response;
      });
    },
    log: {
      values: values
    },
    notifications: {
      success: 'Thank you for registering.',
      failure: 'There was an error registering your organisation.'
    }
  };
}

/**
 * Update organisation profile
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

function updateOrganisation(organisationId, values) {
  return {
    types: [_constants.UPDATE_REQUEST, _constants.UPDATE_SUCCESS, _constants.UPDATE_FAILURE],
    promise: function promise(api) {
      return api.post('/organisation/' + organisationId + '/update', values);
    },
    log: {
      organisationId: organisationId,
      values: values
    },
    notifications: {
      success: 'Thanks for updating your information! Any updates will take approximately two business hours to appear on your live job ads on EthicalJobs.com.au.',
      failure: 'There was an error updating your organisation.'
    }
  };
}

/**
 * Archive organisation with its jobs and invoices
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

function archiveOrganisation(organisationId, restore) {
  var action = restore ? 'restore' : 'delete';
  return {
    types: [_constants.ARCHIVE_REQUEST, _constants.ARCHIVE_SUCCESS, _constants.ARCHIVE_FAILURE],
    promise: function promise(api) {
      return api.post('/organisation/' + organisationId + '/' + action);
    },
    log: {
      organisationId: organisationId,
      restore: !!restore
    },
    notifications: {
      success: restore ? 'Organisation has been restored.' : 'Organisation has been archived.',
      failure: restore ? 'There was an error restoring the organisation.' : 'There was an error archiving the organisation.'
    }
  };
}

/**
 * Create credits request
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

function createCredits(organisationId, values) {
  return {
    types: [_constants.CREATE_CREDITS_REQUEST, _constants.CREATE_CREDITS_SUCCESS, _constants.CREATE_CREDITS_FAILURE],
    promise: function promise(api) {
      return api.post('/organisation/' + organisationId + '/credits/create', values);
    },
    log: {
      organisationId: organisationId,
      values: values
    },
    notifications: {
      success: values.volume + ' ' + values.service_type.toLowerCase() + ' credits generated.',
      failure: 'There was an error generating the credits.'
    }
  };
}

/**
 * Deduct credits request
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

function deductCredits(organisationId, values) {
  return {
    types: [_constants.DEDUCT_CREDITS_REQUEST, _constants.DEDUCT_CREDITS_SUCCESS, _constants.DEDUCT_CREDITS_FAILURE],
    promise: function promise(api) {
      return api.post('/organisation/' + organisationId + '/credits/deduct', values);
    },
    log: {
      organisationId: organisationId,
      values: values
    },
    notifications: {
      success: values.volume + ' credits deducted.',
      failure: 'There was an error deducting the credits.'
    }
  };
}

/**
 * Upload organisation logo
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

function uploadLogo(organisationId, media) {
  var file = new FormData();
  file.append('logo', media);
  return {
    types: [_constants.UPDATE_REQUEST, _constants.UPDATE_SUCCESS, _constants.UPDATE_FAILURE],
    promise: function promise(api) {
      return api.post('/organisation/' + organisationId + '/logo', file);
    },
    log: {
      organisationId: organisationId
    },
    notifications: {
      success: 'Logo updated.',
      failure: 'There was an error updating your logo.'
    }
  };
}