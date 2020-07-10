import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { create, getTags, removeTag, singleTag } from '../../actions/tag';
import Router from 'next/router';
import { isAuth, getCookie } from '../../actions/auth';
import { Alert } from 'reactstrap';

const Tag = () => {
	const [values, setValues] = useState({
		tags: [],
		error: false,
		name: '',
		success: false,
		removed: false,
		reload: false,
	});
	const { name, tags, error, success, removed, reload } = values;
	const token = getCookie('token');

	const loadTags = () => {
		getTags().then((data) => {
			if (data.error) {
				console.log(error);
			} else {
				setValues({ ...values, tags: data });
			}
		});
	};

	const deleteTag = (slug) => {
		removeTag(slug, token)
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
		let answer = window.confirm('Are you sure you want to delete this tag? It cannot be undone later');
		if (answer) {
			deleteTag(slug);
		} else {
		}
	};

	useEffect(() => {
		loadTags();
	}, [reload]);

	const showTags = () => {
		// console.log(tags);
		if (tags.length === 0) {
			return (
				<div className="mx-auto py-3 text-center">
					<h3 className="text-warning">No tags found</h3>
				</div>
			);
		}
		return tags.map((tag) => {
			return (
				<button
					onDoubleClick={() => deleteConfirm(tag.slug)}
					title="Double click to delete this tag"
					key={tag._id}
					className="btn btn-outline-info mx-3 mt-3"
				>
					{tag.name}
				</button>
			);
		});
	};

	const handleChange = (e) => {
		setValues({ ...values, name: e.target.value, error: false, success: false, removed: false });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log('create tag', name);
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
					Tag Created
				</Alert>
			);
		}
	};

	const showError = () => {
		if (error) {
			return (
				<Alert color="danger" isOpen={error.length > 0} toggle={onDismissError} fade={true}>
					{error === '11000 duplicate key error collection: blogdb.tags index: slug already exists'
						? 'Tag exists already'
						: error}
				</Alert>
			);
		}
	};

	const showRemoved = () => {
		if (removed) {
			return (
				<Alert color="info" isOpen={removed} toggle={onDismissRemoved} fade={true}>
					Tag Deleted
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

			<div>{showTags()}</div>
		</React.Fragment>
	);
};

export default Tag;
