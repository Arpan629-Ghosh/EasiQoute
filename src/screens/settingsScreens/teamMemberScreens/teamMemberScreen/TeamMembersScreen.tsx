import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import Header from '@/components/header/Header';
import { ActivityIndicator, FlatList, Image, View } from 'react-native';
import { icons } from '@/config/icons';
import AppInput from '@/components/appInput/AppInput';
import AppButton from '@/components/appButton/AppButton';
import { RootScreenProps } from '@/types/navigation.types';
import { useSettings } from '@/hooks/apis/useSettings';
import Loader from '@/components/loader/Loader';
import RenderTeamMembers from '@/components/renderTeamMembers/RenderTeamMembers';
import { MemberDetails } from '@/types/apis/settings.types';
import { useDebounce } from '@/hooks/useDebounce';
import EmptyStateScreen from '@/components/emptyStateScreen/EmptyStateScreen';
import { images } from '@/config/images';
import { useTranslation } from 'react-i18next';

const TeamMembersScreen = ({
  navigation,
}: RootScreenProps<'TeamMembersScreen'>) => {
  const [search, setSearch] = useState<string>('');
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const page = useRef(1);
  const onEndReachedCalledDuringMomentum = useRef(false);

  const debouncedSearch = useDebounce(search);
  const { theme } = useAppTheme();
  const { t } = useTranslation();
  const {
    loadingTeamMembers,
    teamMembers,
    member_current_page,
    member_last_page,
    fetchTeamMembers,
  } = useSettings();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const navigateToAddMember = () => {
    navigation.navigate('AddMemberScreen');
  };

  useEffect(() => {
    page.current = 1;
    fetchTeamMembers({
      search: debouncedSearch,
      page: page.current,
    });
  }, [fetchTeamMembers, debouncedSearch]);

  const hasMore = useMemo(() => {
    return member_current_page < member_last_page;
  }, [member_current_page, member_last_page]);

  const handleRefresh = useCallback(async () => {
    if (refreshing) {
      return;
    }
    page.current = 1;
    setRefreshing(true);
    await fetchTeamMembers({
      search: debouncedSearch,
      page: page.current,
    });
    setRefreshing(false);
  }, [refreshing, fetchTeamMembers, debouncedSearch]);

  const handleLoadMore = useCallback(async () => {
    if (paginationLoading || refreshing || !hasMore) {
      return;
    }
    try {
      setPaginationLoading(true);
      const nextPage = page.current + 1;
      page.current = nextPage;
      await fetchTeamMembers({
        search: debouncedSearch,
        page: nextPage,
      });
    } finally {
      setPaginationLoading(false);
    }
  }, [
    paginationLoading,
    refreshing,
    hasMore,
    fetchTeamMembers,
    debouncedSearch,
  ]);

  const renderEmpty = useMemo(() => {
    if (loadingTeamMembers) {
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
  }, [loadingTeamMembers]);

  const renderItem = useCallback(({ item }: { item: MemberDetails }) => {
    return <RenderTeamMembers item={item} />;
  }, []);

  const renderFooter = useMemo(() => {
    if (!paginationLoading) {
      return null;
    }

    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" />
      </View>
    );
  }, [paginationLoading, styles.loaderContainer]);

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
          data={teamMembers}
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
          maintainVisibleContentPosition={{
            minIndexForVisible: 0,
          }}
          onMomentumScrollBegin={() => {
            onEndReachedCalledDuringMomentum.current = false;
          }}
          onEndReached={() => {
            if (!onEndReachedCalledDuringMomentum.current) {
              handleLoadMore();

              onEndReachedCalledDuringMomentum.current = true;
            }
          }}
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
      {!refreshing && !paginationLoading && (
        <Loader visible={loadingTeamMembers} />
      )}
    </View>
  );
};

export default TeamMembersScreen;
