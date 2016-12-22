import * as AppActions from 'app/actions';
import Api from 'api';

test('fetchAppData creates correct async action', () => {
  expect(AppActions.fetchAppData()).toEqual({
    type: AppActions.FETCH_APP_DATA,
    payload: Api.initialize(),
  });
});
