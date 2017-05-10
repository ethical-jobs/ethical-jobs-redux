import isPromise from 'isPromise'

describe('isPromise function', () => {

  it('returns true if passed a promise', () => {
    const aPromise = new Promise(resolve => resolve('resolves with string'));
    expect(isPromise(aPromise)).toBe(true);
  });

  it('returns false if passed anything but a promise', () => {
    expect(isPromise({})).toBe(false);
    expect(isPromise(123)).toBe(false);
    expect(isPromise('a string')).toBe(false);
    expect(isPromise(new Error)).toBe(false);
    expect(isPromise(() => {})).toBe(false);
  });
});