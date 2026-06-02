import { StyleSheet, View } from 'react-native';
import React from 'react';
import InterTightSemiBold from '../fontComponents/InterTightSemiBold';
import ButtonComponent from '../buttonComponent/ButtonComponent';
import MiddleModalComponent from '../modal/MiddleModalComponent';
import { useAuth } from '@/hooks/apis/useAuth';
import { useToast } from '@/hooks/useToast';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation.types';
import { useAppTheme } from '@/hooks/useAppTheme';

interface Props {
  visible: boolean;
  onClose: () => void;
}
const LogoutModal = ({ visible, onClose }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { logout, loading } = useAuth();
  const { showToast } = useToast();
  const { theme } = useAppTheme();
  const handleLogout = async () => {
    try {
      await logout();
      showToast('Logout Successful');
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'LoginScreen',
            params: {
              isSessionExist: true
            }
          }
        ]
      })
    } catch (error) {
      showToast(String(error), 'error');
    }
  };
  return (
    <MiddleModalComponent visible={visible} onClose={onClose}>
      <View style = {styles.container}>
        <InterTightSemiBold
          fsize={20}
          fcolor={theme.textPrimary}
          textAlign="center"
        >
          Are you sure you want to{'            '} Logout?
        </InterTightSemiBold>
      </View>

      <View style={styles.buttonContainer}>
        <ButtonComponent
          bg={theme.primary}
          bttnTxt="Logout"
          txtColor={theme.primaryText}
          showLoader={loading}
          onPress={handleLogout}
        />
        <ButtonComponent
          onPress={onClose}
          bttnTxt="Cancel"
          txtColor="#D23949"
        />
      </View>
    </MiddleModalComponent>
  );
};

export default React.memo(LogoutModal);

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 12,
  },
  buttonContainer: {
    flex: 1,
    marginTop: 24,
    width: '100%',
    paddingHorizontal: 12,
  },
});
