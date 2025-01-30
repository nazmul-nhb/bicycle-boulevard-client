import { useLocation } from 'react-router';

export const useGetSelectedPath = () => {
	const location = useLocation();

	const selectedPath = location.pathname;

	return selectedPath;
};
