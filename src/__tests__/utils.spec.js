import { REQUEST, SUCCESS, FAILURE } from 'actionTypes'
import { createActionType } from 'utils';

describe('createActionType function', () => {

  it('always returns a string', () => {
    expect(typeof createActionType()).toBe('string');
    expect(typeof createActionType('FOOBAR')).toBe('string');
  });

  it('returns a correctly namespaced action', () => {
    expect(createActionType('SOME_ACTION')).toBe('ej/SOME_ACTION');
  });
});

describe('async action type functions', () => {

  it('they always return a string', () => {
    expect(typeof REQUEST()).toBe('string');
    expect(typeof SUCCESS()).toBe('string');
    expect(typeof FAILURE()).toBe('string');
  });

  it('they append async action types correctly', () => {
    expect(REQUEST('SOME_ACTION')).toBe('SOME_ACTION_REQUEST');
    expect(SUCCESS('SOME_ACTION')).toBe('SOME_ACTION_SUCCESS');
    expect(FAILURE('SOME_ACTION')).toBe('SOME_ACTION_FAILURE');
  });
});
