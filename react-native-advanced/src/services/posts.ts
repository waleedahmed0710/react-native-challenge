import { QueryFunctionContext } from '@tanstack/react-query';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

type Post = {
  id: number;
  title: string;
  body: string;
};

export const fetchPosts = async ({ pageParam }: QueryFunctionContext): Promise<Post[]> => {
  const page = typeof pageParam === 'number' ? pageParam : 1;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
};

export const fetchPostById = async (id: number) => {
  const res = await fetch(`${BASE_URL}/posts/${id}`);
  if (!res.ok) throw new Error('Failed to fetch post');
  return res.json();
};

export const createPost = async (data: { title: string; body: string }) => {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updatePost = async (id: number, data: { title: string; body: string }) => {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const createRemotePost = async (post: Post) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });

  if (!res.ok) throw new Error('Failed to create post remotely');
  return res.json();
};