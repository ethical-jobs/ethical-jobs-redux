import isPromise from '../isPromise';

/**
 * Global promise catcher / logger
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */
export default function globalErrorMiddleware() {
  return next => action => {
    // If not a promise, continue on
    if (!isPromise(action.payload)) {
      return next(action);
    }

    // Dispatch initial pending promise, but catch any errors
    return next(action).catch(error => {
      throw error; // TODO: log error in Rollbar
    });
  };
}