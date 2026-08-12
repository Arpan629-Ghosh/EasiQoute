import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,

  View,
} from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import Header from '@/components/header/Header';
import LinearGradient from 'react-native-linear-gradient';
import InterTightRegular from '@/components/appFonts/InterTightRegular';
import AppInput from '@/components/appInput/AppInput';
import AppButton from '@/components/appButton/AppButton';
import { useSettings } from '@/hooks/apis/useSettings';
import { useToast } from '@/hooks/useToast';
import { RootScreenProps } from '@/types/navigation.types';
import { CreateTeamMemberPayload } from '@/types/apis/settings.types';

interface AddMemberForm {
  name: string;
  email: string;
  password: string;
}

const AddMemberScreen = ({navigation, route} : RootScreenProps<'AddMemberScreen'>) => {
  const [addMemberForm, setAddMemberForm] = useState<AddMemberForm>({
    name: route.params?.name || '',
    email: route.params?.email ||  '',
    password: '',
  });

  const nameRef = useRef<TextInput | null>(null);
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const { theme } = useAppTheme();
  const { showToast } = useToast();
  const {createTeamMembers, settingLoading} = useSettings()
  const styles = useMemo(() => createStyles(theme), [theme]);
  const editId = route.params?.editId;
  const isEdit = !!editId

  const handleInput = (name: string, value: string) => {
    setAddMemberForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddMember = async() => {
    try {

      const payload: CreateTeamMemberPayload = {
        name: addMemberForm.name,
        email: addMemberForm.email,
        password: addMemberForm.password,
      };

      if (isEdit) payload.id = editId;
      await createTeamMembers(payload)
      showToast(isEdit ? 'Team member updated successfully' : 'Team member created successfully.');
      navigation.goBack();
    } catch (error) {
      showToast(String(error), 'error');
    }
  }

  return (
    <View style={styles.container}>
      <Header
        txt={editId ? 'Edit Members' : 'Add Members'}
        borderBottomEnabled={true}
      />

      <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboard}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollview}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.formContainer}>
              <View style={styles.inp}>
                <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                  Name
                </InterTightRegular>

                <AppInput
                  ref={nameRef}
                  placeholder="Enter name"
                  keyboardType="name-phone-pad"
                  returnKeyType="next"
                  textContentType="name"
                  value={addMemberForm.name}
                  onChangeText={txt => handleInput('name', txt)}
                  onSubmitEditing={() => emailRef.current?.focus()}
                />
              </View>

              <View style={styles.inp}>
                <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                  Email
                </InterTightRegular>

                <AppInput
                  ref={emailRef}
                  placeholder="Enter Email"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  returnKeyType="next"
                  autoCapitalize='none'
                  value={addMemberForm.email}
                  onChangeText={txt => handleInput('email', txt)}
                  onSubmitEditing={() => passwordRef.current?.focus()}
                />
              </View>

              <View style={styles.inp}>
                <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                  Password
                </InterTightRegular>

                <AppInput
                  ref={passwordRef}
                  placeholder="Enter Password"
                  textContentType="password"
                  secureTextEntry={true}
                  returnKeyType="done"
                  value={addMemberForm.password}
                  onChangeText={txt => handleInput('password', txt)}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <View style={styles.footer}>
          <View style={styles.footerContainer}>
            <AppButton
              bg={theme.primary}
              bttnTxt={editId ? 'Update Member' : 'Add Member'}
              txtColor={theme.primaryText}
              showLoader={settingLoading}
              onPress={handleAddMember}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default AddMemberScreen;
