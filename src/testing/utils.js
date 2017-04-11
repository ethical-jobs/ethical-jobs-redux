import Immutable from 'immutable';

/**
 * Creates a keyed state tree
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export function createStateTree(key, reducer, action = undefined, initialState = undefined) {
  return Immutable.fromJS({
    entities: {
      [key]: reducer(initialState, action),
    }
  });
}
