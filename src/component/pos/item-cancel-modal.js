import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { color } from '../../theme';
import { palette } from '../../theme/palette';
import { useSelector } from 'react-redux';

const ItemCancelModal = ({ isVisible, onClose, onConfirm, itemName }) => {
  const ThemeName = useSelector(state => state.auth.selected_Theme_name);
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.modalContent,
                { backgroundColor: color.palette[ThemeName].layout },
              ]}>
              <View
                style={{
                  backgroundColor: color.palette.red,
                  height: 70,
                  width: 70,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 5,
                  borderColor: color.palette.white,
                  top: -35,
                  position: 'absolute',
                }}>
                <Image
                  source={require('../../assets/image/bin.png')}
                  style={{
                    height: 36,
                    width: 29,
                    tintColor: color.palette.white,
                  }}
                />
              </View>
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  fontSize: 17,
                  color: color.palette[ThemeName].body_text,
                  marginTop: 20,
                }}>
                Do you want to delete {itemName}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  alignSelf: 'center',
                  gap: 20,
                  padding: 25,
                  top: 10,
                }}>
                <TouchableOpacity
                  onPress={onClose}
                  style={[
                    styles.btnNo,
                    { backgroundColor: color.palette[ThemeName].other_button },
                  ]}>
                  <Text style={styles.text}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onConfirm}
                  style={[
                    styles.btnYes,
                    { backgroundColor: color.palette[ThemeName].continue_button },
                  ]}>
                  <Text style={styles.text}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ItemCancelModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    padding: 25,
    backgroundColor: palette.white,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnYes: {
    backgroundColor: palette.btnColor,
    width: 110,
    height: 35,
    padding: 3,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  btnNo: {
    backgroundColor: palette.btn_yellow,
    width: 80,
    height: 35,
    padding: 3,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: palette.white,
  },
});
