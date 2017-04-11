import Api from 'api';
import App from 'modules/app';

test('fetchAppData creates correct async action', () => {
  expect(App.actions.fetchAppData()).toEqual({
    type: App.actions.FETCH_APP_DATA,
    payload: Api.get('/'),
  });
});
