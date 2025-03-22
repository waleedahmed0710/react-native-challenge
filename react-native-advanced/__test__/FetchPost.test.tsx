import { fetchPosts } from "../src/services/posts";

global.fetch = jest.fn();

describe('fetchPosts', () => {
  it('returns posts on success', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, title: 'Test', body: 'Body' }],
    });

    const result = await fetchPosts({ pageParam: 1 });
    expect(result.length).toBe(1);
    expect(result[0].title).toBe('Test');
  });

  it('throws on network failure', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    await expect(fetchPosts({ pageParam: 1 })).rejects.toThrow('Failed to fetch posts');
  });
});
