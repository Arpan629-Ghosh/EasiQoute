import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import Header from '@/components/ui/header/Header';
import { ActivityIndicator, FlatList, Image, View } from 'react-native';
import { icons } from '@/config/icons';
import AppInput from '@/components/ui/appInput/AppInput';
import AppButton from '@/components/ui/appButton/AppButton';
import { RootScreenProps } from '@/types/navigation.types';
import Loader from '@/components/ui/loader/Loader';
import RenderTeamMembers from '@/components/flatlist/renderTeamMembers/RenderTeamMembers';
import { MemberDetails } from '@/types/apis/settings.types';
import { useDebounce } from '@/hooks/useDebounce';
import EmptyStateScreen from '@/components/emptyStateScreen/EmptyStateScreen';
import { images } from '@/config/images';
import { useTranslation } from 'react-i18next';
import { useTeamMemberList } from '@/hooks/apis/settings/useTeamMemberList';

const TeamMembersScreen = ({
  navigation,
}: RootScreenProps<'TeamMembersScreen'>) => {
  const [search, setSearch] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);
  const debouncedSearch = useDebounce(search);
  const { theme } = useAppTheme();
  const { t } = useTranslation();
  const {
    teamMemberListData,
    isPending,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useTeamMemberList({
    search: debouncedSearch.trim()
  });
  const styles = useMemo(() => createStyles(theme), [theme]);

  const navigateToAddMember = () => {
    navigation.navigate('AddMemberScreen');
  };

  const handleRefresh = useCallback(async () => {
      try {
        setRefreshing(true);
        await refetch();
      } finally {
        setRefreshing(false);
      }
    }, [refetch]);

  const handleLoadMore = useCallback(async () => {
      if (!hasNextPage || isFetchingNextPage || isFetching) {
        return;
      }
      fetchNextPage();
    }, [hasNextPage, isFetchingNextPage, isFetching, fetchNextPage]);

  const renderEmpty = useMemo(() => {
    if (isFetching) {
      return null;
    }
    return (
      <EmptyStateScreen
        icon={images.img_teamEmpty}
        primaryText="No Team Members Added"
        message="Click on the “+ Add Member”"
        nextMessage=" below to add team members"
      />
    );
  }, [isFetching]);

  const renderItem = useCallback(({ item }: { item: MemberDetails }) => {
    return <RenderTeamMembers item={item} />;
  }, []);

  const renderFooter = useCallback(() => {
      return isFetchingNextPage && <ActivityIndicator size="small" />;
    }, [isFetchingNextPage]);

console.log(teamMemberListData)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header txt={t('header.teamMembers')} borderBottomEnabled={true}>
          <View style={styles.input}>
            <View style={styles.inputicon}>
              <Image source={icons.ic_whitesearch} style={styles.searchic} />
              <AppInput
                inputWidth={325}
                bg={theme.searchInput}
                style={styles.noBorderInput}
                placeholder={t('inputs.search.tmSearchPlaceholder')}
                value={search}
                onChangeText={setSearch}
              />
            </View>
          </View>
        </Header>
      </View>
      <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
        <FlatList
          data={teamMemberListData}
          renderItem={renderItem}
          keyExtractor={item => String(item.id)}
          style={styles.flatlist}
          contentContainerStyle={styles.flatlistContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          refreshing={refreshing}
          onRefresh={handleRefresh}
          removeClippedSubviews={false}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          initialNumToRender={8}
          windowSize={5}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
        />
        <View style={styles.footer}>
          <View style={styles.footerContainer}>
            <AppButton
              bg={theme.primary}
              bttnTxt={t('button.addMembers')}
              txtColor={theme.primaryText}
              gap={8}
              onPress={navigateToAddMember}
            >
              <Image source={icons.ic_addpeople} style={styles.icn} />
            </AppButton>
          </View>
        </View>
      </LinearGradient>
      
        <Loader visible={isPending} />
   
    </View>
  );
};

export default TeamMembersScreen;
