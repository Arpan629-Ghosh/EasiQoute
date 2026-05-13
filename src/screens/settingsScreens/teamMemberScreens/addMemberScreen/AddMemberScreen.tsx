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
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import Input from '@/components/inputComponent/Input';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';

interface AddMemberForm {
  name: string;
  email: string;
  password: string;
}

const AddMemberScreen = () => {
  const [addMemberForm, setAddMemberForm] = useState<AddMemberForm>({
    name: '',
    email: '',
    password: '',
  });

  const nameRef = useRef<TextInput | null>(null);
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleInput = (name: string, value: string) => {
    setAddMemberForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <Header txt="Add Members" borderBottomEnabled={true}  />

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

                <Input
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

                <Input
                  ref={emailRef}
                  placeholder="Enter Email"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  returnKeyType="next"
                  value={addMemberForm.email}
                  onChangeText={txt => handleInput('email', txt)}
                  onSubmitEditing={() => passwordRef.current?.focus()}
                />
              </View>

              <View style={styles.inp}>
                <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                  Password
                </InterTightRegular>

                <Input
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
            <ButtonComponent
              bg={theme.primary}
              bttnTxt="Add Member"
              txtColor={theme.primaryText}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default AddMemberScreen;
