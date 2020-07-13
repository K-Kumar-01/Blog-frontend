import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { create, getCategories, removeCategory, singleCategory } from '../../actions/category';
import { isAuth, getCookie } from '../../actions/auth';
import { Alert } from 'reactstrap';

const Category = () => {
	const [values, setValues] = useState({
		categories: [],
		error: false,
		name: '',
		success: false,
		removed: false,
		reload: false,
	});
	const { name, categories, error, success, removed, reload } = values;
	const token = getCookie('token');

	const loadCategories = () => {
		getCategories().then((data) => {
			if (data.error) {
				console.log(error);
			} else {
				setValues({ ...values, categories: data });
			}
		});
	};

	const deleteCategory = (slug) => {
		removeCategory(slug, token)
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error, success: false });
				} else {
					setValues({
						...values,
						error: false,
						reload: !reload,
						success: false,
						name: '',
						removed: true,
					});
				}
			})
			.catch((err) => {
				setValues({
					...values,
					error: 'Some unknown error occurred. Pleases try again',
					success: true,
				});
			});
	};

	const deleteConfirm = (slug) => {
		let answer = window.confirm('Are you sure you want to delete this category? It cannot be undone later');
		if (answer) {
			deleteCategory(slug);
		} else {
		}
	};

	useEffect(() => {
		loadCategories();
	}, [reload]);

	const showCategories = () => {
		if (categories.length === 0) {
			return (
				<div className="mx-auto py-3 text-center">
					<h3 className="text-warning">No categories found</h3>
				</div>
			);
		}
		return categories.map((category) => {
			return (
				<button
					onDoubleClick={() => deleteConfirm(category.slug)}
					title="Double click to delete this category"
					key={category._id}
					className="btn btn-outline-info mx-3 mt-3"
				>
					{category.name}
				</button>
			);
		});
	};

	const handleChange = (e) => {
		setValues({ ...values, name: e.target.value, error: false, success: false, removed: false });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log('create category', name);
		create({ name }, token)
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error, success: false });
				} else {
					setValues({ ...values, error: false, success: true, name: '', reload: !reload, removed: false });
				}
			})
			.catch((err) => {
				setValues({ ...values, error: true, success: false, removed: false });
			});
	};

	const onDismissSuccess = () => {
		setValues({ ...values, success: false });
	};

	const onDismissError = () => {
		setValues({ ...values, error: false });
	};

	const onDismissRemoved = () => {
		setValues({ ...values, removed: false });
	};

	// display messages
	const showSuccess = () => {
		if (success) {
			return (
				<Alert color="success" isOpen={success} toggle={onDismissSuccess} fade={true}>
					Category Created
				</Alert>
			);
		}
	};

	const showError = () => {
		if (error) {
			return (
				<Alert color="danger" isOpen={error.length > 0} toggle={onDismissError} fade={true}>
					{error === '11000 duplicate key error collection: blogdb.categories index: slug already exists'
						? 'Category exists already'
						: error}
				</Alert>
			);
		}
	};

	const showRemoved = () => {
		if (removed) {
			return (
				<Alert color="info" isOpen={removed} toggle={onDismissRemoved} fade={true}>
					Category Deleted
				</Alert>
			);
		}
	};

	return (
		<React.Fragment>
			{showSuccess()}
			{showError()}
			{showRemoved()}
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label className="text-muted" htmlFor="name">
						Name
					</label>
					<input type="text" onChange={handleChange} required value={name} className="form-control" />
				</div>

				<button type="submit" className="btn btn-primary">
					Create
				</button>
			</form>

			<div>{showCategories()}</div>
		</React.Fragment>
	);
};

export default Category;
