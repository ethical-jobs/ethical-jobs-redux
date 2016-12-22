import Immutable from 'immutable';
import { filterEntitiesByOrgId, filterJobsByType } from 'filters';
import { APPROVED, PENDING, EXPIRED } from 'jobTypes';

describe('filterEntitiesByOrgId function', () => {

  it('returns true without organisationId argument', () => {
    const entity = Immutable.fromJS({
      id: 1,
      organisation_id: 7,
    });
    expect(filterEntitiesByOrgId(entity)).toBe(true);
  });

  it('returns true with matching entity', () => {
    const entity = Immutable.fromJS({
      id: 1,
      organisation_id: 7,
    });
    expect(filterEntitiesByOrgId(entity, 7)).toBe(true);
  });

  it('returns false with non-matching entity', () => {
    const entity = Immutable.fromJS({
      id: 1,
      organisation_id: 7,
    });
    expect(filterEntitiesByOrgId(entity, 17)).toBe(false);
  });
});

describe('filterJobsByType function', () => {

  it('returns true with invalid or undefined jobType argument', () => {
    const job = Immutable.fromJS({
      id: 1,
      status: APPROVED,
    });
    expect(filterJobsByType(job)).toBe(true);
    expect(filterJobsByType(job, 'FOO')).toBe(true);
  });

  it('returns correct responses when job: APPROVED, non-expired', () => {
    const job = Immutable.fromJS({
      id: 1,
      status: APPROVED,
      expired: false,
    });
    expect(filterJobsByType(job, APPROVED)).toBe(true);
    expect(filterJobsByType(job, PENDING)).toBe(false);
    expect(filterJobsByType(job, EXPIRED)).toBe(false);
  });

  it('returns correct responses when job: APPROVED, expired', () => {
    const job = Immutable.fromJS({
      id: 1,
      status: APPROVED,
      expired: true,
    });
    expect(filterJobsByType(job, APPROVED)).toBe(false);
    expect(filterJobsByType(job, PENDING)).toBe(false);
    expect(filterJobsByType(job, EXPIRED)).toBe(true);
  });

  it('returns correct responses when job: PENDING, non-expired', () => {
    const job = Immutable.fromJS({
      id: 1,
      status: PENDING,
      expired: false,
    });
    expect(filterJobsByType(job, APPROVED)).toBe(false);
    expect(filterJobsByType(job, PENDING)).toBe(true);
    expect(filterJobsByType(job, EXPIRED)).toBe(false);
  });

  it('returns correct responses when job: PENDING, expired', () => {
    const job = Immutable.fromJS({
      id: 1,
      status: PENDING,
      expired: true,
    });
    expect(filterJobsByType(job, APPROVED)).toBe(false);
    expect(filterJobsByType(job, PENDING)).toBe(false);
    expect(filterJobsByType(job, EXPIRED)).toBe(true);
  });

});