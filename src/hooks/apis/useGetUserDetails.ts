import { authServices } from "@/apis/services/auth.services"
import { settingsServices } from "@/apis/services/settings.services";
import { CompanyPayload, ProfileSetupPayload } from "@/types/apis/auth.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const useGetUserDetails = () => {

    const queryClient = useQueryClient();
    const userDetails = useQuery({
        queryKey: ["userDetails"],
        queryFn: async () => {
            const response = await authServices.getUserDetails();
            return {
                data: response.payload ?? null
            }
        }
    });

    const updateCompanyProfile = useMutation({
        mutationFn: (payload: CompanyPayload) => 
            settingsServices.companyProfileUpdate(payload),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
              queryKey: ['userDetails'],
            });
        }
    })

    const updateUserProfile = useMutation({
        mutationFn: (payload: ProfileSetupPayload) => 
            authServices.profileSetup(payload),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['userDetails']
            })
        }
    })

    return {
        userDetails: userDetails.data?.data,
        refetch: userDetails.refetch,
        updateCompanyProfileAsync: updateCompanyProfile.mutateAsync,
        isUpdating: updateCompanyProfile.isPending,
        isUpdatingError: updateCompanyProfile.isError,
        updateError: updateCompanyProfile.error,
        updateProfileAsync: updateUserProfile.mutateAsync,
        isProfileUpdating: updateUserProfile.isPending,
        updateUserProfileError: updateUserProfile.error,
        isUpdateProfileError: updateUserProfile.isError
    }
}