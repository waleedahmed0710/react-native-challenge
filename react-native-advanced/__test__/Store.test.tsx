import { usePostStore } from '../src/store/usePostsStore';

describe('usePostsStore', () => {
  it('adds a post', () => {
    const post = { id: 123, title: 'New Post', body: 'Body' };
    usePostStore.getState().addPost(post);
    expect(usePostStore.getState().posts).toContainEqual(post);
  });

  it('updates a post', () => {
    const id = 123;
    usePostStore.getState().updatePost({ id, title: 'Updated', body: 'Changed' });
    expect(usePostStore.getState().posts.find(p => p.id === id)?.title).toBe('Updated');
  });
});
