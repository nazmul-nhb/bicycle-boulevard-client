import { theme } from 'antd';
import { useAppSelector } from '../app/hooks';
import { selectTheme } from '../app/features/themeSlice';

/** Use antd theme algorithm and boolean state if the theme is dark. */
export const useTheme = () => {
	const appTheme = useAppSelector(selectTheme);
	const algorithm = appTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm;

	const isDarkTheme = appTheme === 'dark';

	return { isDarkTheme, algorithm };
};
