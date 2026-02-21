import { useGetUserStats } from './useQueries';
import { useInternetIdentity } from './useInternetIdentity';

export function useUserProgress() {
  const { identity } = useInternetIdentity();
  const principal = identity?.getPrincipal();

  return useGetUserStats(principal);
}
