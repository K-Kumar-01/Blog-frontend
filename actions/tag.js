import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const create = (tag, token) => {
	return fetch(`${API}/tag`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(tag),
	})
		.then((response) => {
			handleResponse(response);
			return response.json();
		})
		.catch((err) => {
			return res.status(400).json({
				error: err,
			});
		});
};

export const getTags = () => {
	return fetch(`${API}/tags`, {
		method: 'GET',
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			res.status(404).json({
				error: err,
			});
		});
};

export const singleTag = (slug) => {
	return fetch(`${API}/tag/${slug}`, {
		method: 'GET',
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const removeTag = (slug, token) => {
	return fetch(`${API}/tag/${slug}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			handleResponse(response);
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};
