import { ErrorBoundary, Footer, Header, Main } from "./components";

const App = () => {
	return (
		<ErrorBoundary>
			<Header />
			<Main />
			<Footer />
		</ErrorBoundary>
	);
};

export default App;
