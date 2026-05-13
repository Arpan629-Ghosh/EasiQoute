import React, { useMemo } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import Header from '@/components/header/Header';
import { Image, View } from 'react-native';
import { icons } from '@/config/icons';
import Input from '@/components/inputComponent/Input';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import { TeamMembersScreenProps } from '@/types/navigation.types';

const TeamMembersScreen = ({navigation} : TeamMembersScreenProps) => {
  const { theme } = useAppTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);
    
    const navigateToAddMember = () => {
        navigation.navigate("AddMemberScreen")
    }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header txt="Team Members" borderBottomEnabled={true}>
          <View style={styles.input}>
            <View style={styles.inputicon}>
              <Image source={icons.ic_whitesearch} style={styles.searchic} />
              <Input
                inputWidth={325}
                bg={theme.searchInput}
                style={styles.noBorderInput}
                placeholder="Search ‘Team Members’"
              />
            </View>
          </View>
        </Header>
      </View>
      <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
        <View style={styles.footer}>
          <View style={styles.footerContainer}>
            <ButtonComponent
              bg={theme.primary}
              bttnTxt="Add Member"
              txtColor={theme.primaryText}
                          gap={8}
                          onPress={navigateToAddMember}
            >
              <Image source={icons.ic_addpeople} style={styles.icn} />
            </ButtonComponent>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default TeamMembersScreen;
