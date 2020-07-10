import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const createBlog = (blog, token) => {
	return fetch(`${API}/blog`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: blog,
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			return response.status(400).json({
				error: err,
			});
		});
};
