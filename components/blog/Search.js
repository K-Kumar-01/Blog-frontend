import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import renderHTML from 'react-render-html';
import { API } from '../../config';
import { listSearch } from '../../actions/blog';
import Loading from '../loading/Loading';

const Search = () => {
	const [values, setValues] = useState({
		search: undefined,
		results: [],
		searched: false,
		message: '',
		errors: '',
		loading: false,
	});
	const { search, searched, results, message, errors, loading } = values;

	const searchSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, loading: true });
		listSearch({ search })
			.then((data) => {
				if (data.error) {
					setValues({ ...values, errors: data.error, loading: false });
				} else {
					setValues({
						...values,
						searched: true,
						results: data,
						message: `${data.length || 0} blogs found`,
						loading: false,
					});
				}
			})
			.catch((err) => {
				setValues({ ...values, errors: err });
			});
	};

	const handleChange = (e) => {
		setValues({ ...values, errors: '', search: e.target.value, searched: false, results: [], loading: false });
	};

	const searchedBlogs = (results = []) => {
		return (
			<div className="jumbotron bg-white">
				{message && <p className="pt-4 text-muted font-italic">{message}</p>}
				{results.map((blog) => {
					return (
						<div key={blog._id}>
							<Link href={`/blogs/${blog.slug}`}>
								<a className="text-primary">{blog.title}</a>
							</Link>
						</div>
					);
				})}
			</div>
		);
	};

	const searchForm = () => {
		return (
			<form onSubmit={searchSubmit}>
				<div className="row">
					<div className="col-md-8">
						<input
							type="search"
							className="form-control"
							placeholder="Search blogs"
							onChange={handleChange}
						/>
					</div>
					<div className="col-md-4">
						<button className="btn btn-block btn-outline-primary" type="submit">
							Search
						</button>
					</div>
				</div>
			</form>
		);
	};

	return (
		<div className="container-fluid">
			<div className="pt-3 pb-5">{searchForm()}</div>
			{loading && <Loading />}
			{searched && <div style={{ marginTop: '-120px', marginBottom: '-80px' }}>{searchedBlogs(results)}</div>}
		</div>
	);
};

export default Search;
