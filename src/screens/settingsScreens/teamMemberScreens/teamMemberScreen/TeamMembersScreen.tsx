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
import Input from '@/components/inputComponent/Input';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import { RootScreenProps } from '@/types/navigation.types';
import { useSettings } from '@/hooks/apis/useSettings';
import Loader from '@/components/loader/Loader';
import RenderTeamMembers from '@/components/renderTeamMembers/RenderTeamMembers';
import { MemberDetails } from '@/types/apis/settings.types';
import { useDebounce } from '@/hooks/useDebounce';

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
        <Header txt="Team Members" borderBottomEnabled={true}>
          <View style={styles.input}>
            <View style={styles.inputicon}>
              <Image source={icons.ic_whitesearch} style={styles.searchic} />
              <Input
                inputWidth={325}
                bg={theme.searchInput}
                style={styles.noBorderInput}
                placeholder="Search ‘Team Members’"
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
        />
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
      {(!refreshing && !paginationLoading) && <Loader visible={loadingTeamMembers} />}
    </View>
  );
};

export default TeamMembersScreen;
