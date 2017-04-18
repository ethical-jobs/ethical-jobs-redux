/**
 * Appends REQUEST asyc action type
 * @return String
 */
export function REQUEST(actionType) {
  return `${actionType}_REQUEST`;
}

/**
 * Appends SUCCESS asyc action type
 * @return String
 */
export function SUCCESS(actionType) {
  return `${actionType}_SUCCESS`;
}

/**
 * Appends FAILURE asyc action type
 * @return String
 */
export function FAILURE(actionType) {
  return `${actionType}_FAILURE`;
}
