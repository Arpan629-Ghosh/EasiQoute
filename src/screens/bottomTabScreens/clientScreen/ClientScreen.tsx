import { View, StatusBar, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InterTightSemiBold from '@/components/fontComponents/InterTightSemiBold';
import Input from '@/components/inputComponent/Input';
import { icons } from '@/config/icons';
import ClientSortBottomSheet from '@/components/clientSortBottomSheet/ClientSortBottomSheet';
import { ClientScreenProps } from '@/types/navigation.types';
import { useClient } from '@/hooks/apis/useClient';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '@/components/loader/Loader';
import { useToast } from '@/hooks/useToast';
import RenderClients from '@/components/renderClients/RenderClients';
import { useDebounce } from '@/hooks/useDebounce';

const ClientScreen = ({navigation} : ClientScreenProps) => {
  const [open, setOpen] = useState(false);
  const [selctedSortOption, setSelectedSortOptions] = useState<string>("");
  const [search, setSearch] = useState<string>("")
  const { theme, isDark } = useAppTheme();
  const { showToast } = useToast();
  const { getClients, loading, clients, current_page, last_page } = useClient();
  const debouncedSearch = useDebounce(search, 500)
  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      getClients('asc');
    }, [getClients]),
  );
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const navigateToAddClient = () => {
    navigation.navigate("AddClientScreen")
  }

  const toggleSort = useCallback(
    async (type: string) => {
      const updatedStatus = selctedSortOption === type ? '' : type;

      setSelectedSortOptions(updatedStatus);

      try {
        let sort = '';

        switch (updatedStatus) {
          case 'Most Active':
            sort = 'ma';
            break;

          case 'Recently Added':
            sort = 'desc';
            break;

          default:
            sort = 'asc';
        }

        await getClients(sort);
      } catch (error) {
        showToast(String(error), 'error');
      }
    },
    [selctedSortOption, getClients, showToast],
  );

  const processedData = useMemo(() => {
    let result = clients;

    if (!debouncedSearch.trim()) return result;

    result = result.filter((item) => 
      item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )

    return result;
  }, [clients, debouncedSearch])

  
  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <View
            style={[styles.headerComponent, { paddingTop: insets.top + 12 }]}
          >
            <InterTightSemiBold fsize={24} fcolor={theme.textPrimary}>
              Clients
            </InterTightSemiBold>
            <View style={styles.topComponent}>
              <View style={styles.inputicon}>
                <Image source={icons.ic_whitesearch} style={styles.searchic} />

                <Input
                  bg={theme.searchInput}
                  style={styles.noBorderInput}
                  placeholder="Search ‘client name’"
                  value={search}
                  onChangeText={setSearch}
                />
              </View>
              <TouchableOpacity onPress={() => setOpen(true)}>
                <Image source={icons.ic_clientsort} style={styles.img} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <FlatList
          data={processedData}
          renderItem={({ item }) => <RenderClients item={item} />}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatlist}
          style={styles.card}
        />

        <View style={styles.add}>
          <TouchableOpacity activeOpacity={0.8} onPress={navigateToAddClient}>
            <Image source={icons.ic_add} style={styles.ic} />
          </TouchableOpacity>
        </View>
      </View>
      <ClientSortBottomSheet
        visible={open}
        onClose={handleClose}
        selectedSortOption={selctedSortOption}
        onToggleSort={toggleSort}
      />
      <Loader visible={ loading } />
    </LinearGradient>
  );
};

export default ClientScreen;
