import { fetchUsers } from "../services/users";
import { useInfiniteQuery } from '@tanstack/react-query'
import { type User } from '../types.d'

export const useUsers = () => {
    const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<{ nextCursor?: number, users: User[] }>({
        queryKey: ['users'],
        initialPageParam: 1,
        queryFn: fetchUsers,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 30 // 30 segundos, tiempo de espera caducidad datos
    })

    return {
        refetch,
        fetchNextPage,
        isLoading,
        isError,
        users: data?.pages?.flatMap(page => page.users) ?? [],
        hasNextPage
    }
}