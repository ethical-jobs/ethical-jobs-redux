import { fromJS, is } from 'immutable';
import ImmtuableUtils from '../../immutable';

describe('mergeSuccess function', () => {

  const beforeState = fromJS({
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
    results: [22,44,55],
  });

  const afterState = ImmtuableUtils.mergeSuccess(beforeState, {
    data: {
      entities: {
        countries: {
          22: { id: 22, title: 'Ethiopia', population: 99390000, size: '1.104m km2', tribes: ['Oromo','Amhara','Somali'] },
        },
        continents: {
          12: { id: 12, title: 'Africa', countries: 54 },
        }
      },
      result: 22,
    },
  });

  it('returns correct request lifecycle state', () => {
    expect(afterState.get('fetching')).toBe(false);
    expect(afterState.get('error')).toBe(false);
  });

  it('returns the correct result identifier', () => {
    expect(
      is(afterState.get('results'), beforeState.get('results'))
    ).toBe(true);
  });

  it('does not effect the results state', () => {
    expect(afterState.get('result')).toBe(22);
  });

  it('merges new entities', () => {
    const shouldBe = fromJS({
      countries: {
        22: { id: 22, title: 'Ethiopia', population: 99390000, size: '1.104m km2', tribes: ['Oromo','Amhara','Somali'] },
        44: { id: 44, title: 'Botswana' },
        55: { id: 55, title: 'Argentina' },
      },
      continents: {
        12: { id: 12, title: 'Africa', countries: 54 },
        7: { id: 7, title: 'South America' },
      }
    });
    expect(
      is(afterState.get('entities'), shouldBe)
    ).toBe(true);
  });

  it('merges new entities with small changes', () => {
    const afterAfterState = ImmtuableUtils.mergeSuccess(afterState, {
      data: {
        entities: {
          countries: {
            22: { id: 22, title: 'Ethiopia', population: 99390000, size: '1.104m km2', tribes: ['Tigraway','Amhara','Somali'] },
          },
        },
        result: 22,
      },
    });
    const shouldBe = fromJS({
      countries: {
        22: { id: 22, title: 'Ethiopia', population: 99390000, size: '1.104m km2', tribes: ['Tigraway','Amhara','Somali'] },
        44: { id: 44, title: 'Botswana' },
        55: { id: 55, title: 'Argentina' },
      },
      continents: {
        12: { id: 12, title: 'Africa', countries: 54 },
        7: { id: 7, title: 'South America' },
      }
    });
    expect(
      is(afterAfterState.get('entities'), shouldBe)
    ).toBe(true);
  });
});