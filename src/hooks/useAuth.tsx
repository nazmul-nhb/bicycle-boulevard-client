import { useMemo } from 'react';
import { useGetMeQuery } from '../app/api/authApi';
import { selectToken, selectUser } from '../app/features/authSlice';
import { useAppSelector } from '../app/hooks';

export const useAuth = () => {
	const user = useAppSelector(selectUser);
	const token = useAppSelector(selectToken);

	const { data, isLoading } = useGetMeQuery(undefined, { skip: !!user || !token });

	const authUser = useMemo(() => data?.data || user, [data, user]);

	return { user: authUser, token, isLoading };
};
