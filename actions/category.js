import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const create = (category, token) => {
	return fetch(`${API}/category`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(category),
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

export const getCategories = () => {
	return fetch(`${API}/categories`, {
		method: 'GET',
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const singleCategory = (slug) => {
	return fetch(`${API}/category/${slug}`, {
		method: 'GET',
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const removeCategory = (slug, token) => {
	return fetch(`${API}/category/${slug}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};
