import Immutable from 'immutable';
import { fromJS } from 'utils/immutable';
import * as Assert from 'testing/assertions';
import Posts from 'modules/posts';

const { selectors } = Posts;

test('rootSelector returns correct state slice ', () => {
  expect(
    Assert.rootSelector('posts', selectors.rootSelector)
  ).toBe(true);
});

test('fetchingSelector returns correct state slice', () => {
  expect(
    Assert.fetchingSelector('posts', selectors.fetchingSelector)
  ).toBe(true);
});

test('filtersSelector returns correct state slice', () => {
  expect(
    Assert.filtersSelector('posts', selectors.filtersSelector)
  ).toBe(true);
});

test('resultSelector selector returns correct state slice', () => {
  expect(
    Assert.resultSelector('posts', selectors.resultSelector)
  ).toBe(true);
});

test('postsSelector selector returns correct state slice', () => {
  expect(
    Assert.entitiesSelector('posts', 'posts', selectors.postsSelector)
  ).toBe(true);
});

/*
|--------------------------------------------------------------------------
| Single post selector
|--------------------------------------------------------------------------
*/

test('postByIdSelector selector returns correct state slice', () => {
  const state = fromJS({
    entities: {
      posts: {
        entities: {
          posts: {
            554: 'foo-bar-bam',
          },
        },
        result: 554,
      },
    }
  });
  const result = selectors.postByIdSelector(state);
  expect(Immutable.is('foo-bar-bam', result)).toBe(true);
});
