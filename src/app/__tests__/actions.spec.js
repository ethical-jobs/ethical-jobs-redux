import Api from 'api';
import * as AppActions from 'app/actions';

test('fetchAppData creates correct async action', () => {
  expect(AppActions.fetchAppData()).toEqual({
    type: AppActions.FETCH_APP_DATA,
    payload: Api.initialize(),
  });
});
