import promiseMiddleware from 'redux-promise-middleware';

/**
 * Wrapped redux-promise-middleware with custom suffixes
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export default function globalPromiseMiddleware() {
    return promiseMiddleware({ promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'] });
}
