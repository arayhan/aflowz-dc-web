import { useEffect, useRef } from 'react';
import { useAppStore } from './store';
import LoadingBar from 'react-top-loading-bar';
import { APP_COLOR_PRIMARY } from './utils/constants';
import { AppRoutes } from './AppRoutes';

function App() {
	const loaderRef = useRef(null);

	const { isPageLoading } = useAppStore();

	useEffect(() => {
		if (isPageLoading) loaderRef.current.continuousStart();
		else loaderRef.current.complete();
	}, [isPageLoading]);

	return (
		<div>
			<LoadingBar color={APP_COLOR_PRIMARY} ref={loaderRef} />
			<AppRoutes />
		</div>
	);
}

export default App;
