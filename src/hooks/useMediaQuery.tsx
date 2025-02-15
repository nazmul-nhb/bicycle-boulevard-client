import { useEffect, useState } from 'react';

/**
 * * Custom hook to detect mobile screen width dynamically.
 * @param width - The width to check if the current window size matches it. Default is `840`.
 * @returns Boolean: `true` if matches, otherwise `false`.
 * */
export const useMediaQuery = (width: number = 840): boolean => {
	const [isMobile, setIsMobile] = useState(window.innerWidth < width);

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < width);

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [width]);

	return isMobile;
};
