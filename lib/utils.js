"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createActionType = createActionType;
exports.REQUEST = REQUEST;
exports.SUCCESS = SUCCESS;
exports.FAILURE = FAILURE;

/**
 * Generates a namespaced action type
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

function createActionType(base) {
  return "ej/" + base;
}

/**
 * Appends REQUEST asyc action type
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

function REQUEST(actionType) {
  return actionType + "_REQUEST";
}

/**
 * Appends SUCCESS asyc action type
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

function SUCCESS(actionType) {
  return actionType + "_SUCCESS";
}

/**
 * Appends FAILURE asyc action type
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

function FAILURE(actionType) {
  return actionType + "_FAILURE";
}