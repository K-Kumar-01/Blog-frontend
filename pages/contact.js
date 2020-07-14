import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import ContactForm from '../components/form/ContactForm';
const Index = () => {
	return (
		<div>
			<Layout>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-8 offset-2">
							<h2>Contact Form</h2>
							<br />
							<ContactForm />
						</div>
					</div>
				</div>
			</Layout>
		</div>
	);
};

export default Index;
