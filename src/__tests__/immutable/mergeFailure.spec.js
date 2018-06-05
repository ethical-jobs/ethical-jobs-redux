import { fromJS, is, OrderedMap, List, Map } from 'immutable';
import ImmtuableUtils from '../../immutable';

describe('mergeFailure function', () => {

  const beforeState = fromJS({
    fetching: true,
    error: false,
    entities: {
      countries: {
        22: { id: 22, title: 'Ethiopia' },
      },
      continents: {
        12: { id: 12, title: 'Africa' },
      }
    },
    result: 298,
    results: [22, 44, 55],
  });

  const afterState = ImmtuableUtils.mergeFailure(beforeState, {
    message: 'An error occured',
  });

  it('sets fetching to false', () => {
    expect(afterState.get('fetching')).toBe(false);
  });

  it('sets the error to the response', () => {
    const shouldBe = fromJS({
      message: 'An error occured',
    });
    expect(is(
      afterState.get('error'),
      shouldBe
    )).toBe(true);
  });

  it('merges instance of Error', () => {
    const errorInstance = new Error('Another error occured.');
    const afterState = ImmtuableUtils.mergeFailure(beforeState, errorInstance);
    expect(is(
      afterState.get('error'),
      errorInstance
    )).toBe(true);
  });
});
