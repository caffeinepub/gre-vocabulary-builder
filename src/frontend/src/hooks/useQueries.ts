import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Question, UserStats } from '../backend';
import { Principal } from '@icp-sdk/core/principal';
import { toast } from 'sonner';

export function useGetPracticeQuestion() {
  const { actor, isFetching } = useActor();

  return useQuery<Question>({
    queryKey: ['practiceQuestion'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getPracticeQuestion();
    },
    enabled: !!actor && !isFetching,
    staleTime: 0 // Always fetch fresh questions
  });
}

export function useSubmitAnswer() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (isCorrect: boolean) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.submitAnswer(isCorrect);
    },
    onSuccess: () => {
      // Invalidate user stats to refresh progress
      queryClient.invalidateQueries({ queryKey: ['userStats'] });
    },
    onError: (error) => {
      toast.error('Failed to submit answer');
      console.error('Submit answer error:', error);
    }
  });
}

export function useGetUserStats(userPrincipal?: Principal) {
  const { actor, isFetching } = useActor();

  return useQuery<UserStats>({
    queryKey: ['userStats', userPrincipal?.toString()],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      if (!userPrincipal) throw new Error('User principal not provided');
      return actor.getUserStats(userPrincipal);
    },
    enabled: !!actor && !isFetching && !!userPrincipal
  });
}
