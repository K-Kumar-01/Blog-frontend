import 'nprogress/nprogress.css';
import '../styles/global.css';
import 'react-quill/dist/quill.snow.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function App({ Component, pageProps }) {
	return <Component {...pageProps} />;
}
