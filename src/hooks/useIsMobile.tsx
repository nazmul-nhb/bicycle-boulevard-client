import { useState, useEffect } from 'react';

/** * Custom hook to detect mobile screen width dynamically. */
export const useIsMobile = (): boolean => {
	const [isMobile, setIsMobile] = useState(window.innerWidth < 840);

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 840);

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return isMobile;
};
