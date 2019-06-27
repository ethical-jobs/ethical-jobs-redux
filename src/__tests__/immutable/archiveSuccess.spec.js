import { fromJS, is, OrderedSet } from 'immutable';
import ImmtuableUtils from '../../immutable';

describe('archiveSuccess function', () => {
  const archivableUserId = 291291;
  const archivableUser = {
    id: archivableUserId,
    first_name: 'Archivable',
    last_name: 'Member',
    email: 'archivable@ethicaljobs.com.au',
    username: 'archivable',
    roles: ['employer-member'],
  };

  const archiveResponse = {
    data: {
      entities: {
        users: {
          [archivableUserId]: archivableUser,
        }
      },
      result: archivableUserId
    }
  };

  const userId = 123456;
  const user = {
    id: userId,
    first_name: 'Organisation',
    last_name: 'Member',
    email: 'member@bayside.vic.gov.au',
    username: 'member',
    roles: ['employer-member'],
  };

  const beforeState = fromJS({
    fetching: true,
    error: false,
    filters: {
      organisation_id: 123,
    },
    entities: {
      users: {
        [userId]: user,
        [archivableUserId]: archivableUser,
      }
    },
    results: new OrderedSet([ // fromJS would convert this to a List, but redux state maintains this as an OrderedSet
      userId,
      archivableUserId,
    ]),
    result: archivableUserId,
  });

  const afterState = ImmtuableUtils.archiveSuccess(beforeState, archiveResponse);

  it('returns correct request lifecycle state', () => {
    expect(afterState.get('fetching')).toBe(false);
    expect(afterState.get('error')).toBe(false);
  });

  it('removes archived id from results', () => {
    expect(
      is(afterState.get('results'), new OrderedSet([123456]))
    ).toBe(true);
  });

  it('sets result state false', () => {
    expect(afterState.get('result')).toBe(false);
  });

  it('removes archived entity from entities', () => {
    const shouldBe = fromJS({
      users: {
        [userId]: user,
      },
    });

    expect(
      is(afterState.get('entities'), shouldBe)
    ).toBe(true);
  });
});
