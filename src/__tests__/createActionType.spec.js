import createActionType from 'createActionType';

describe('createActionType function', () => {

  it('always returns a string', () => {
    expect(typeof createActionType()).toBe('string');
    expect(typeof createActionType('FOOBAR')).toBe('string');
  });

  it('returns a correctly namespaced action', () => {
    expect(createActionType('SOME_ACTION')).toBe('ej/SOME_ACTION');
  });
});
