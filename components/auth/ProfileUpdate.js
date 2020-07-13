import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { getCookie, isAuth, updateUser } from '../../actions/auth';
import { getProfile, update } from '../../actions/user';
import Loading from '../loading/Loading';
import { API } from '../../config';

const ProfileUpdate = () => {
	const [values, setValues] = useState({
		username: '',
		name: '',
		email: '',
		password: '',
		success: false,
		error: false,
		loading: false,
		about: '',
		photo: '',
		userData: '',
	});
	const token = getCookie('token');
	const [photogUsername, setPhotogUsername] = useState();
	const { email, name, username, password, success, error, loading, photo, userData, about } = values;

	const init = () => {
		getProfile(token)
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error });
				} else {
					let userFormData = new FormData();
					userFormData.set('name', data.name);
					userFormData.set('username', data.username);
					setValues({
						...values,
						username: data.username,
						name: data.name,
						email: data.email,
						about: data.about,
						userData: userFormData,
					});
					setPhotogUsername(data.username);
				}
			})
			.catch((err) => {
				setValues({ ...values, error: err });
			});
	};

	useEffect(() => {
		init();
	}, []);

	const handleChange = (name) => (e) => {
		const value = name === 'photo' ? e.target.files[0] : e.target.value;
		userData.set(name, value);
		setValues({ ...values, [name]: value, userData, error: false, success: false });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, loading: true });
		update(token, userData).then((data) => {
			if (data.error) {
				setValues({ ...values, loading: false, error: data.error, success: false });
			} else {
				updateUser(data,()=>{
                    setValues({
                        ...values,
                        username: data.username,
                        name: data.name,
                        email: data.email,
                        about: data.about,
                        success: true,
                        loading: false,
                    });
                    setPhotogUsername(data.username);
                });
			}
		});
	};

	const profileUpdateForm = () => {
		return (
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label className="btn btn-outline-info">
						Profile Image
						<input type="file" accept="image/*" onChange={handleChange('photo')} hidden />
					</label>
				</div>
				<div className="form-group">
					<label className="text-muted" htmlFor="username">
						Username
					</label>
					<input
						type="text"
						name="username"
						className="form-control"
						value={username}
						onChange={handleChange('username')}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted" htmlFor="name">
						Name
					</label>
					<input
						type="text"
						name="name"
						className="form-control"
						value={name}
						onChange={handleChange('name')}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted" htmlFor="email">
						Email
					</label>
					<input
						type="email"
						name="email"
						className="form-control"
						value={email}
						onChange={handleChange('email')}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted" htmlFor="about">
						About
					</label>
					<textarea name="about" className="form-control" value={about} onChange={handleChange('about')} />
				</div>
				<div className="form-group">
					<label className="text-muted" htmlFor="password">
						Password
					</label>
					<input
						type="password"
						name="password"
						className="form-control"
						value={password}
						onChange={handleChange('password')}
					/>
				</div>
				<div className="form-group">
					<button className="btn btn-primary" type="submit">
						Submit
					</button>
				</div>
			</form>
		);
	};

	const showError = () => {
		return (
			<div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
				{error}
			</div>
		);
	};

	const showSuccess = () => {
		return (
			<div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
				Details updated successfully
			</div>
		);
	};

	return (
		<React.Fragment>
			<div className="container">
				{loading && <Loading />}
				{showError()}
				{showSuccess()}
				<div className="row">
					<div className="col-md-4">
						<img
							src={`${API}/user/photo/${photogUsername}`}
							className="img-fluid img mb-3"
							style={{ maxHeight: 'auto', maxWidth: '100%' }}
							alt="user profile"
						/>
					</div>
					<div className="col-md-8 mb-5">{profileUpdateForm()}</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ProfileUpdate;
