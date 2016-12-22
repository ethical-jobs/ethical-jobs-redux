
/**
 * Generates a namespaced action type
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function createActionType(base) {
  return `ej/${base}`;
}

/**
 * Appends REQUEST asyc action type
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function REQUEST(actionType) {
  return `${actionType}_REQUEST`;
}

/**
 * Appends SUCCESS asyc action type
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function SUCCESS(actionType) {
  return `${actionType}_SUCCESS`;
}

/**
 * Appends FAILURE asyc action type
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function FAILURE(actionType) {
  return `${actionType}_FAILURE`;
}
