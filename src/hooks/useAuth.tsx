import { useAppSelector } from '../app/hooks';
import { selectToken, selectUser } from '../app/features/authSlice';

export const useAuth = () => {
	const user = useAppSelector(selectUser);
	const token = useAppSelector(selectToken);

	return { user, token };
};
