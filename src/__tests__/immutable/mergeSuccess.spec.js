import { fromJS, is, OrderedMap, List, Map } from 'immutable';
import ImmtuableUtils from '../../immutable';

describe('mergeSuccess function', () => {

  const state = fromJS({
    fetching: true,
    error: false,
    entities: {
      countries: {
        22: { id: 22, title: 'Ethiopia' },
        44: { id: 44, title: 'Botswana' },
        55: { id: 55, title: 'Argentina' },
      },
      continents: {
        12: { id: 12, title: 'Africa' },
        7: { id: 7, title: 'South America' },
      }
    },
    result: 298,
  });

  const actual = ImmtuableUtils.mergeSuccess(state, {
    data: {
      entities: {
        countries: {
          22: { id: 22, title: 'Ethiopia', population: 99390000, size: '1.104m km2', },
        },
        continents: {
          12: { id: 12, title: 'Africa', countries: 54,  },
        }
      },
      result: 22,
    },
  });

  const expected = fromJS({
    fetching: false,
    error: false,
    entities: {
      countries: {
        22: { id: 22, title: 'Ethiopia', population: 99390000, size: '1.104m km2', },
      },
      continents: {
        12: { id: 12, title: 'Africa', countries: 54,  },
      }
    },
    result: 22,
  });

  it('returns correct success state', () => {
    expect(is(actual, expected)).toBe(true);
  });
});