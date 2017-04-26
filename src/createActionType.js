
/**
 * Promise Generates a namespaced action type
 * @return String
 */
export default function createActionType(base) {
  return `ej/${base}`;
}
