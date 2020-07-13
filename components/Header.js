import React, { useState } from 'react';
import { APP_NAME } from '../config';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Link from 'next/link';
import { isAuth, signout } from '../actions/auth';
import Router from 'next/router';
import NProgress from 'nprogress';
import styles from './navlinks.module.css';
import Search from './blog/Search';

NProgress.configure({ showSpinner: false });
Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Header = (props) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<React.Fragment>
			<Navbar color="light" light expand="md">
				<Link href="/">
					<NavLink className={`${styles.link} font-weight-bold`}>{APP_NAME}</NavLink>
				</Link>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="ml-auto" navbar>
						<NavItem>
							<Link href="/blogs">
								<NavLink className={styles.link}>Blogs</NavLink>
							</Link>
						</NavItem>
						{!isAuth() && (
							<React.Fragment>
								<NavItem>
									<Link href="/signin">
										<NavLink className={styles.link}>Signin</NavLink>
									</Link>
								</NavItem>
								<NavItem>
									<Link href="/signup">
										<NavLink className={styles.link}>Signup</NavLink>
									</Link>
								</NavItem>
							</React.Fragment>
						)}

						{isAuth() && (
							<NavItem>
								<Link href={isAuth().role === 1 ? '/admin' : '/user'}>
									<NavLink className={styles.link}>{`${isAuth().name}'s Dashboard`}</NavLink>
								</Link>
							</NavItem>
						)}

						{isAuth() && (
							<NavItem>
								<NavLink
									className={styles.link}
									onClick={() => signout(() => Router.replace(`/signin`))}
								>
									Signout
								</NavLink>
							</NavItem>
						)}
					</Nav>
				</Collapse>
			</Navbar>
			<Search />
		</React.Fragment>
	);
};

export default Header;
