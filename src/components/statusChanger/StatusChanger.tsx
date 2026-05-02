import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import ModalComponent from '../modal/ModalComponent';
import InterTightMedium from '../fontComponents/InterTightMedium';
import ButtonComponent from '../buttonComponent/ButtonComponent';
import InterTightRegular from '../fontComponents/InterTightRegular';
import { StatusData } from '@/config/status';
import { icons } from '@/config/icons';

type Props = {
    visible: boolean;
    selectedStatus: string;
  onClose: () => void;
    onToggleStatus: (type: string) => void;
   
};
const StatusChanger = ({ visible,selectedStatus,  onClose, onToggleStatus }: Props) => {
  return (
    <ModalComponent visible={visible} onClose={onClose} mheight={461}>
      <View style={styles.modal}>
        <View style={styles.header}>
          <InterTightMedium fsize={18} fcolor="#2D2D2D">
            Quote Status
          </InterTightMedium>
        </View>

        <View style={styles.status}>
          {StatusData.map(item => {
            const isSelected = selectedStatus.includes(item.type);

            return (
              <View key={item.type} style={styles.statusView}>
                <ButtonComponent
                  key={item.type}
                  onPress={() => onToggleStatus(item.type)}
                  activeOpacity={0.8}
                  style={styles.statusBttn}
                >
                  <Image source={item.icon} style={styles.icon} />

                  <InterTightRegular
                    fsize={16}
                    fcolor={isSelected ? '#082B60' : '#89909D'}
                  >
                    {item.type}
                  </InterTightRegular>

                  {isSelected && (
                    <Image source={icons.ic_tick} style={styles.cross} />
                  )}
                </ButtonComponent>
                {item.type !== 'Cancelled' && <View style={styles.empty} />}
              </View>
            );
          })}
        </View>
      </View>
    </ModalComponent>
  );
};

export default StatusChanger;

const styles = StyleSheet.create({
  modal: {
    gap: 16,
  },
  status: {
    gap: 8,
    paddingHorizontal: 12,
  },
  empty: {
    borderWidth: 0.5,
    borderColor: '#E4E6F4',
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 6,
      resizeMode: 'contain',
    
  },
  statusBttn: {
    flexDirection: 'row',
    paddingVertical: 8,
      gap: 8,
      width: "100%",

      alignItems: "center"
  
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    gap: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E4E6F4',
  },
  statusView: {
    gap: 5,
  },
  cross: {
    height: 16,
    width: 16,
    marginLeft: "auto",

  },
});
