import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  Image,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import {palette} from '../../theme/palette';
import Toast from 'react-native-simple-toast';
import {color, typography} from '../../theme';
import {Button} from '../../ui-kit';
import {useDispatch, useSelector} from 'react-redux';
import {addOrdertype} from '../../redux/slice/status';
import {English} from '../../utils/en';
import useSound from '../../hooks/use-sound';

const CustomerDetailsModal = ({
  isVisible,
  onClose,
  onSubmit,
  tapSound,
  selectedInd,
  setSelectedInd,
}) => {
  const {errorSound, successSound} = useSound();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  //   const [selectedInd, setSelectedInd] = useState(0);
  const ThemeName = useSelector(state => state.auth.selected_Theme_name);
  const handleSubmit = () => {
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const nameRegex = /^[A-Za-z\s]+$/;

    if (trimmedName === '') {
      errorSound();
      Toast.show(English.modals.customer_details.name_empty_tost, Toast.SHORT);

      return;
    }
    if (!nameRegex.test(trimmedName)) {
      errorSound();
      Toast.show(English.modals.customer_details.name_valid_tost, Toast.SHORT);
      return;
    }
    dispatch(
      addOrdertype(
        selectedInd === 0
          ? English.modals.customer_details.heading
          : English.modals.customer_details.heading2,
      ),
    );
    onSubmit({name: trimmedName, phone: trimmedPhone});
    setName('');
    setPhone('');
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <TouchableWithoutFeedback>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.modalContainer,
                {backgroundColor: color.palette[ThemeName].layout},
              ]}>
              <View
                style={[
                  styles.modalHeader,
                  {
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    paddingTop: 5,
                    backgroundColor: color.palette[ThemeName].menu_background,
                  },
                ]}>
                <Pressable
                  onPress={() => {
                    tapSound();
                    setSelectedInd(1);
                  }}
                  style={[
                    // styles.modelHeader_inside,
                    {
                      width: '49%',
                      height: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 25,
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                      //   shadowColor: '#000000',
                      //   shadowOffset: {
                      //     width: 4,
                      //     height: 18,
                      //   },
                      //   shadowOpacity: 3,
                      //   shadowRadius: 30,
                      elevation: 10,
                      backgroundColor:
                        selectedInd === 1
                          ? color.palette[ThemeName].menu_button
                          : //   : color.palette[ThemeName].menu_background,
                            color.palette[ThemeName].background,
                    },
                  ]}>
                  {/* <Image
                    source={require('../assets/image/takeaway.png')}
                    style={{
                      height: 50,
                      width: 50,
                    }}
                  /> */}
                  <Text
                    style={[
                      styles.modelHeader_insideText,
                      {
                        color:
                          selectedInd === 1
                            ? color.palette[ThemeName].menu_background
                            : color.palette[ThemeName].menu_button,
                      },
                    ]}>
                    {English.modals.customer_details.heading2}
                  </Text>
                  {selectedInd === 1 && (
                    <Image
                      source={require('../../assets/image/tick.png')}
                      style={{height: 35, width: 35}}
                    />
                  )}
                </Pressable>
                <Pressable
                  onPress={() => {
                    tapSound();
                    setSelectedInd(0);
                  }}
                  style={[
                    // styles.modelHeader_inside,
                    {
                      width: '49%',
                      height: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 25,
                      borderTopRightRadius: 20,
                      borderTopLeftRadius: 20,
                      //   shadowColor: '#000000',
                      //   shadowOffset: {
                      //     width: 4,
                      //     height: 18,
                      //   },
                      //   shadowOpacity: 3,
                      //   shadowRadius: 30,
                      //   elevation: 10,
                      backgroundColor:
                        selectedInd === 0
                          ? color.palette[ThemeName].menu_button
                          : //   : color.palette[ThemeName].menu_background,
                            color.palette[ThemeName].background,
                    },
                  ]}>
                  {/* <Image
                    source={require('../assets/image/dinein.png')}
                    style={{ height: 50, width: 50 }}
                  /> */}
                  <Text
                    s
                    style={[
                      styles.modelHeader_insideText,
                      {
                        color:
                          selectedInd === 0
                            ? color.palette[ThemeName].menu_background
                            : color.palette[ThemeName].menu_button,
                      },
                    ]}>
                    {English.modals.customer_details.heading}
                  </Text>
                  {selectedInd === 0 && (
                    <Image
                      source={require('../../assets/image/tick.png')}
                      style={{height: 35, width: 35}}
                    />
                  )}
                </Pressable>
              </View>
              {/* <View
                style={{
                  backgroundColor: '#d3d3d3',
                  width: '100%',
                  height: 2,
                }}></View> */}
              <View style={{gap: 10, paddingTop: 20}}>
                <Text style={styles.textName}>
                  {English.modals.customer_details.label}
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                  />
                  <Image
                    source={require('../../assets/image/profile.png')}
                    style={{height: 20, width: 16, marginRight: 16}}
                  />
                </View>
                <Text style={styles.textName}>
                  {English.modals.customer_details.label2}
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="numeric"
                    maxLength={10}
                  />
                  <Image
                    source={require('../../assets/image/call.png')}
                    style={{height: 16, width: 16, marginRight: 16}}
                  />
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                  marginTop: 40,
                  paddingBottom: 20,
                }}>
                <Button
                  title={English.modals.customer_details.buttons.button_text}
                  style={[
                    styles.btn1,
                    {
                      marginRight: 29,
                      backgroundColor: color.palette[ThemeName].cancel_button,
                    },
                  ]}
                  onPress={onClose}
                />
                <Button
                  title={English.modals.customer_details.buttons.button_text2}
                  style={[
                    styles.btn,
                    {backgroundColor: color.palette[ThemeName].continue_button},
                  ]}
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomerDetailsModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '45%',
    minHeight: '55%',
    backgroundColor: palette.white,
    alignItems: 'center',
    borderRadius: 10,
    alignItems: 'center',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    minHeight: '11%',
    gap: 4,
    marginBottom: 3,
  },
  modelHeader_inside: {
    width: '50%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 25,
  },
  modelHeader_insideText: {
    fontSize: 24,
    fontFamily: typography.semibold,
  },
  body: {
    paddingTop: 10,
    width: '100%',
    marginLeft: 10,
  },
  textName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: palette.black,
    width: '100%',
    left: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    padding: 5,
    width: '90%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: palette.gray_border,
  },
  input: {
    width: '80%',
    height: 40,
    fontSize: 24,
    paddingVertical: 0,
    fontFamily: typography.regular,
  },
  closeButton: {
    position: 'absolute',
    right: 0,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: palette.black,
    textAlign: 'center',
    flex: 1,
  },

  icon: {
    marginRight: 10,
  },

  btn: {
    width: '40%',
    height: 52,
    backgroundColor: color.palette.yellow,
  },

  btn1: {
    width: '30%',
    height: 52,
    backgroundColor: color.palette.yellow,
  },
});
