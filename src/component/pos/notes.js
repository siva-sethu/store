import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { palette } from '../../theme/palette';
import { color } from '../../theme';
import { Button } from '../../ui-kit';
import { useSelector } from 'react-redux';

const Notes = ({ isVisible, onClose, onSave, title }) => {
  const [note, setNote] = useState('');

  const handleSave = () => {
    onSave(note);
    onClose();
  };
  const ThemeName = useSelector(state => state.auth.selected_Theme_name);
  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <TouchableWithoutFeedback>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.modalContainer,
                { backgroundColor: color.palette[ThemeName].layout },
              ]}>
              <View style={styles.notesIconContainer}>
                <Image
                  source={require('../../assets/image/pencil2.png')}
                  style={styles.notesImage}
                />
              </View>
              <Text
                style={[
                  styles.modalTitle,
                  { color: color.palette[ThemeName].body_text },
                ]}>
                {'Add a note to ' + title}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { color: color.palette[ThemeName].body_text },
                ]}
                value={note}
                onChangeText={setNote}
                placeholder="Tap here to add your notes"
                placeholderTextColor={color.palette[ThemeName].body_text}
                multiline={true}
              />
              <View style={styles.buttonContainer}>
                <View style={styles.buttonArea}>
                  <Button
                    title={'Cancel'}
                    style={[
                      styles.btn,
                      {
                        marginRight: 29,
                        backgroundColor:"#E7C651"
                        // backgroundColor: color.palette[ThemeName].cancel_button,
                      },
                    ]}
                    onPress={onClose}
                  />
                  <Button
                    title={'Save'}
                    style={[
                      styles.btn,
                      // {
                      //   backgroundColor:
                      //     color.palette[ThemeName].continue_button,
                      // },
                    ]}
                    onPress={handleSave}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default Notes;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '95%',
    backgroundColor: palette.white,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    zIndex: 3,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    width: '100%',
    height: 80,
    borderColor: palette.gray_border,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  cancelButton: {
    backgroundColor: palette.btn_yellow,
    padding: 15,
    borderRadius: 5,
    width: '35%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: palette.btnColor,
    padding: 15,
    borderRadius: 5,
    width: '35%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  btn: {
    width: 130,
    height: 52,
    backgroundColor:'#44B9B1',
  },
  notesIconContainer: {
    backgroundColor: color.palette.yellow,
    height: 70,
    width: 70,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 5,
    borderColor: color.palette.white,
    top: -35,
    position: 'absolute',
  },
  notesImage: {
    height: 60,
    width: 60,
    // tintColor: color.palette.white,
  },
  buttonArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
});
