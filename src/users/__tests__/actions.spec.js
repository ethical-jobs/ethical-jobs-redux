import Api from 'api';
import * as ActionTypes from 'users/actions';
import {
  update,
} from 'users/actions';

test('update action creates correct action', () => {
  const params = { foo: 'bar', bar: 'foo' };
  expect(update(params)).toEqual({
    type: ActionTypes.UPDATE,
    payload: Api.updateUser(params),
  });
});

