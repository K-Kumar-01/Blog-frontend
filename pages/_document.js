import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	// needed for server rendering of pages and here we are rendering statically pages(some)
	// static async getInitialProps(ctx) {
	// 	const initialProps = await Document.getInitialProps(ctx);
	// 	return { ...initialProps };
	// }

	render() {
		return (
			<Html lang="en">
				<Head>
					<meta charSet="UTF-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<link
						rel="stylesheet"
						href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
						integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
						crossOrigin="anonymous"
					/>
					<link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet" />
				</Head>
				<body>
					<Main />
					<NextScript />

					{/* Will use reactstrap so just commenting it out
					<script
						src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
						integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
						crossOrigin="anonymous"
					></script>
					<script
						src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
						integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
						crossOrigin="anonymous"
					></script>
					<script
						src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
						integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
						crossOrigin="anonymous"
					></script> */}
				</body>
			</Html>
		);
	}
}

export default MyDocument;
