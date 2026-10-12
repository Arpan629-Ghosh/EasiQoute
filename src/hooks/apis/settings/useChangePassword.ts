import { settingsServices } from "@/apis/services/settings.services";
import { ChangePassword } from "@/types/apis/settings.types";
import { useMutation } from "@tanstack/react-query";


export const useChangePassword = () => {

    const changePasswordMutation = useMutation({
        mutationFn: (payload: ChangePassword) =>
            settingsServices.changePassword(payload),
    });

    return {
        changePassword: changePasswordMutation.mutate,
        changePasswordAsync: changePasswordMutation.mutateAsync,
        isChangingPassword: changePasswordMutation.isPending,
        isChangePasswordError: changePasswordMutation.isError,
        changePasswordError: changePasswordMutation.error
    } 
}   