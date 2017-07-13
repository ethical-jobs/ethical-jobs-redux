import {fromJS, is, OrderedMap, List, Map} from 'immutable';
import ImmtuableUtils from '../../immutable';

describe('mergeDeleteSuccess function', () => {

    const state = fromJS({
        fetching: true,
        error: false,
        entities: {
            media: {
                '18959': {
                    original_file_name: 'Screen Shot 2017-07-13 at 11.05.25 am.png',
                    size: '268082',
                    path: 'media',
                    mime_type: 'image/png',
                    created_at: 1499918354000,
                    file_name: '1499918351_z60bx_.png',
                    url: '//d27jjb85n91zzw.cloudfront.net/media/1499918351_z60bx_.png',
                    parent_id: 69933,
                    updated_at: 1499918354000,
                    id: 18959
                }
            },
            countries: {
                22: {id: 22, title: 'Ethiopia'},
                44: {id: 44, title: 'Botswana'},
                55: {id: 55, title: 'Argentina'},
            },
            continents: {
                12: {id: 12, title: 'Africa'},
                7: {id: 7, title: 'South America'},
            }
        },
        result: 298,
    });

    const actual = ImmtuableUtils.mergeDeleteSuccess(state, {
        data: {
            entities: {
                countries: {
                    22: {id: 22, title: 'Ethiopia', population: 99390000, size: '1.104m km2',},
                },
                continents: {
                    12: {id: 12, title: 'Africa', countries: 54,},
                }
            },
            result: 22,
        },
    }, 'media');

    const expected = fromJS({
        fetching: false,
        error: false,
        entities: {
            countries: {
                22: {id: 22, title: 'Ethiopia', population: 99390000, size: '1.104m km2',},
                44: {id: 44, title: 'Botswana'},
                55: {id: 55, title: 'Argentina'},
            },
            continents: {
                12: {id: 12, title: 'Africa', countries: 54,},
                7: {id: 7, title: 'South America'},
            }
        },
        result: 22,
    });

    it('returns correct success state', () => {
        expect(is(actual, expected)).toBe(true);
    });
});