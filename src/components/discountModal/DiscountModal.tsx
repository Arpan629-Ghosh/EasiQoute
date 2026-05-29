import { StyleSheet, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import MiddleModalComponent from '../modal/MiddleModalComponent'
import InterTightMedium from '../fontComponents/InterTightMedium';
import { useAppTheme } from '@/hooks/useAppTheme';
import InterTightRegular from '../fontComponents/InterTightRegular';
import Input from '../inputComponent/Input';
import ButtonComponent from '../buttonComponent/ButtonComponent';
import { Theme } from '@/types/theme.types';


interface Props {
  visible: boolean;
  onClose: () => void;
  onDiscount: (discount: number) => void
}
const DiscountModal = ({ visible, onClose, onDiscount }: Props) => {
  const [input, setInput] = useState<string>("");
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme])

  const handleDiscount = () => {
    const discount = Number(input);
    onDiscount(discount)
    if(input.trim())
      onClose()
  }
  
  return (
    <MiddleModalComponent visible={visible} onClose={onClose}>
      <View style={styles.header}>
        <InterTightMedium fsize={18} fcolor={theme.textPrimary}>
          Add Discount
        </InterTightMedium>
      </View>
      <View style={styles.content}>
        <View style={styles.inp}>
          <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
            Discount (in %)
          </InterTightRegular>
          <Input
            placeholder="e.g. 20"
            value={input}
            onChangeText={setInput}
            keyboardType='numeric'
          />
        </View>
      </View>
      <View style={styles.footer}>
        <ButtonComponent
          bg={theme.primary}
          bttnTxt="Apply"
          txtColor={theme.primaryText}
          onPress={handleDiscount}
        />
        <ButtonComponent
          bg={theme.background}
          bttnTxt="Cancel"
          txtColor="#D23949"
          onPress={onClose}
        />
      </View>
    </MiddleModalComponent>
  );
}

export default React.memo(DiscountModal)

const createStyles =  (theme: Theme) => StyleSheet.create({
  header: {
    gap: 16,
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.border
  },
  content: {
    gap: 16,
    paddingVertical: 24,
    paddingHorizontal: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.border
  },
  inp: {
    gap: 8,
  },
  footer: {
    padding: 12,
  },
});