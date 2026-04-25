import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import { SERVICES } from '@/config/services';
import ButtonComponent from '../buttonComponent/ButtonComponent';
import InterTightRegular from '../fontComponents/InterTightRegular';


interface Props {
  selected: string[];
  onToggle: (type: string) => void
}
const ServiceChips = ({selected, onToggle} : Props) => {

  return (
    <View style={styles.container}>
      {SERVICES.map(item => {
        const isSelected = selected.includes(item.type);

        return (
          <ButtonComponent
            key={item.type}
            style={[
              styles.chip,
              isSelected && styles.selectedChip,
              item.type === 'Upload my own list' && styles.uploadChip,
            ]}
            onPress={() => onToggle(item.type)}
            activeOpacity={0.8}
          >
            <Image source={item.icon} style={styles.icon} />

            <InterTightRegular fsize={14} fcolor="#2D2D2D">
              {item.type}
            </InterTightRegular>
          </ButtonComponent>
        );
      })}
    </View>
  );
};

export default React.memo(ServiceChips);
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },

  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D6D8E7',
    backgroundColor: '#F7F8FC',
  },

  selectedChip: {
    backgroundColor: '#082B600A',
    borderColor: '#082B60',
  },

  uploadChip: {
    backgroundColor: '#fff',
  },

  icon: {
    width: 16,
    height: 16,
    marginRight: 6,
    resizeMode: 'contain',
  },

  text: {
    fontSize: 13,
    color: '#2D2D2D',
  },

  selectedText: {
    color: '#2F5BFF',
    fontWeight: '500',
  },
});