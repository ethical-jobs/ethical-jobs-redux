import { fromJS, is } from 'immutable';
import ImmtuableUtils from '../../immutable';

describe('entitiesMerger function', () => {

  const beforeState = fromJS({
    title: 'Kingdoms',
    animals: {
      mamals: {
        bovine: ['cows','sheep','pigs'],
        porpoise: ['dolphin','orca','false-whales'],
      },
      molluscs: ['cephalopods','snails','clams'],
    }
  });

  const afterState = beforeState.mergeWith(ImmtuableUtils.entitiesMerger, fromJS({
    title: 'Kingdoms v2',
    animals: {
      mamals: {
        bovine: ['bison','taurus'],
        porpoise: ['dolphin','orca','false-whales'],
      },
      molluscs: ['cephalopods','clams'],
    }
  }));

  it('replaces list items not appending them', () => {
    const shouldBe = fromJS({
      title: 'Kingdoms v2',
      animals: {
        mamals: {
          bovine: ['bison','taurus'],
          porpoise: ['dolphin','orca','false-whales'],
        },
        molluscs: ['cephalopods','clams'],
      }
    });
    expect(is(
      afterState,
      shouldBe
    )).toBe(true);
  });
});