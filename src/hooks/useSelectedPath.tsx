import { MenuProps } from 'antd';
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';

/** * Get selected route path. */
// export const useGetSelectedPath = () => {
// 	const location = useLocation();

// 	const selectedPath = location.pathname;

// 	return selectedPath;
// };

/** * Get selected route path. */
export const useGetSelectedPath = () => {
	const { pathname } = useLocation();
	const [selectedPath, setSelectedPath] = useState<string>(pathname);

	useEffect(() => {
		if (pathname && selectedPath !== pathname) {
			setSelectedPath(pathname);
		}
	}, [pathname, selectedPath]);

	const selectCurrentPath: MenuProps['onClick'] = (e) => {
		setSelectedPath(e.key);
	};

	return { selectedPath, selectCurrentPath };
};
