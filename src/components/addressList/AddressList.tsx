import React, { useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { SearchAddressPayload } from '@/types/apis/auth.types';
import RenderAddress from '../renderAddress/RenderAddress';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';

interface AddressProp {
  response: SearchAddressPayload[];
  onSelect: (item: SearchAddressPayload) => void;
}

const AddressList: React.FC<AddressProp> = ({ response, onSelect }) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme])
  return (
    <FlatList
      data={response}
      renderItem={({ item }) => <RenderAddress item={item} onPress={() => onSelect(item)}/>}
      keyExtractor={(item, index) => `${item.postcode}-${index}`}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

export default React.memo(AddressList);

const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 58,
    left: 0,
    right: 0,
    maxHeight: 240,
    backgroundColor: theme.background,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.border,
    zIndex: 999,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },

  contentContainer: {
    flexGrow: 1,
    paddingVertical: 6,
  },
});
