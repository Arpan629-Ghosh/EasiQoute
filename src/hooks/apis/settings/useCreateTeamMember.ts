import { settingsServices } from "@/apis/services/settings.services";
import { CreateTeamMemberPayload } from "@/types/apis/settings.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useCreateTeamMember = () => {
    const queryClient = useQueryClient();
    const createTeamMemberMutation = useMutation({
      mutationFn: (payload: CreateTeamMemberPayload) =>
            settingsServices.createTeamMember(payload),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['team-members'],
            });
        }
    });

    return {
        createTeamMember: createTeamMemberMutation.mutate,
        createTeamMemberAsync: createTeamMemberMutation.mutateAsync,
        isCreatingTeamMember: createTeamMemberMutation.isPending,
        isCreateTeamMemberError: createTeamMemberMutation.isError,
        createTeamMemberError: createTeamMemberMutation.error
    }
}