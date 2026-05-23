import { useAppTheme } from "@/hooks/useAppTheme";
import { CreateCategoriesPayload } from "@/types/apis/settings.types";
import { Theme } from "@/types/theme.types";
import { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import InterTightRegular from "../fontComponents/InterTightRegular";

interface Props {
    item: CreateCategoriesPayload;
    onPress: () => void
}

const RenderCategoriesDropDown: React.FC<Props> = ({item, onPress}) => {
    const { theme } = useAppTheme();
    const styles = useMemo(() => createStyles(theme), [theme])
  return (
    <View style={styles.items}>
      <Pressable style = {styles.content} onPress={onPress}>
        <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
          {item.name}
        </InterTightRegular>
      </Pressable>
      <View style={styles.border} />
    </View>
  );
};

export default RenderCategoriesDropDown;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    border: {
      borderWidth: 0.5,
      borderColor: theme.border,
    },
    items: {
      marginBottom: 5,
      },
      content: {
          marginHorizontal: 10,
          marginBottom: 5
    }
  });