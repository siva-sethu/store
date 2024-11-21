import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  FlatList,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { color, typography } from '../../theme';
import { Button } from '../../ui-kit';
import Notes from './notes';
import { useSelector } from 'react-redux';
import { verticalScale } from '../../utils/responsive';

const Mods = ({
  visible,
  onClose,
  data,
  handleDone = () => { },
  setSelectedMods,
  tapSound,
}) => {
  const [notesVisible, setNotesVisible] = useState(false);
  const ThemeName = useSelector(state => state.auth.selected_Theme_name);
  const toggleExtraItem = (item, index) => {
    const updatedSubItem = [...data.subItem];
    if (updatedSubItem[index]) {
      const updatedItem = {
        ...updatedSubItem[index],
        extra: !updatedSubItem[index]?.extra,
        no: false,
      };
      updatedSubItem[index] = updatedItem;
    }
    const updatedData = { ...data, subItem: updatedSubItem };
    setSelectedMods(updatedData);
  };

  const toggleNoItem = (item, index) => {
    const updatedSubItem = [...data.subItem];
    if (updatedSubItem[index]) {
      const updatedItem = {
        ...updatedSubItem[index],
        no: !updatedSubItem[index]?.no,
        extra: false,
      };
      updatedSubItem[index] = updatedItem;
    }
    const updatedData = { ...data, subItem: updatedSubItem };
    setSelectedMods(updatedData);
  };

  const handleNotes = () => {
    tapSound();
    setNotesVisible(true);
  };

  const handleSave = notes => {
    tapSound();
    const updatedData = {
      ...data,
      notes: notes,
    };
    setSelectedMods(updatedData);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <Notes
        isVisible={notesVisible}
        onClose={() => {
          tapSound();
          setNotesVisible(false);
        }}
        onSave={handleSave}
        title={data?.name}
      />
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
                  backgroundColor: color.palette.neonGreen,
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
                }}>
                <Image
                  source={require('../../assets/image/mods.png')}
                  style={{
                    height: 36,
                    width: 36,
                    tintColor: color.palette.white,
                  }}
                />
              </View>
              <View style={styles.header}>
                <Image style={styles.image} source={{ uri: data?.image }} />
                <View style={styles.textContainer}>
                  <Text
                    style={[
                      styles.title,
                      { color: color.palette[ThemeName].body_text },
                    ]}>
                    {data?.name}
                  </Text>
                  <Text
                    style={[
                      styles.description,
                      { color: color.palette[ThemeName].body_text },
                    ]}>
                    {data?.description}
                  </Text>
                </View>
              </View>

              {data?.subItem?.length ? (
                <>
                  <View style={styles.divider} />
                  <FlatList
                    data={[1]}
                    renderItem={({ item, index }) => {
                      return (
                        <View
                          style={[styles.subItemsheaderRow]}>
                          <Text
                            style={[
                              styles.subItemHeader,
                              { color: color.palette[ThemeName].body_text },
                            ]}>
                            Sub-Items
                          </Text>
                          <View style={{ flexDirection: 'row' }}>
                            <Text
                              style={[
                                styles.subItemHeader,
                                {
                                  marginRight: 37,
                                  color: color.palette[ThemeName].body_text,
                                },
                              ]}>
                              Extra
                            </Text>
                            <Text
                              style={[
                                styles.subItemHeader,
                                { color: color.palette[ThemeName].body_text },
                              ]}>
                              No
                            </Text>
                          </View>
                        </View>
                      );
                    }}
                    numColumns={2}
                    key="!"
                    keyExtractor={(item, index) => {
                      return '!' + index?.toString();
                    }}
                  />
                  <FlatList
                    data={data?.subItem}
                    renderItem={({ item, index }) => {
                      return (
                        <View
                          style={[
                            styles.subItemsheaderRow,
                            {
                              marginRight:
                                data?.subItem?.length - 1 === index &&
                                  data?.subItem?.length % 2 !== 0
                                  ? 140
                                  : 70,
                            },
                          ]}>
                          <Text
                            style={[
                              styles.subItemHeader,
                              {
                                fontFamily: typography.regular,
                                width: '50%',
                                color: color.palette[ThemeName].body_text,
                              },
                              item?.no
                                ? { textDecorationLine: 'line-through' }
                                : { textDecorationLine: 'none' },
                            ]}>
                            {item?.name}
                          </Text>

                          <View style={{ flexDirection: 'row' }}>
                            <CheckBox
                              style={{ marginRight: 37 }}
                              value={item?.extra}
                              onValueChange={() => {
                                tapSound();
                                toggleExtraItem(item, index);
                              }}
                              tintColors={{
                                true: color.palette[ThemeName].continue_button,
                              }}
                            />
                            <CheckBox
                              value={item?.no}
                              onValueChange={() => {
                                tapSound();
                                toggleNoItem(item, index);
                              }}
                              tintColors={{
                                true: color.palette[ThemeName].continue_button,
                              }}
                            />
                          </View>
                        </View>
                      );
                    }}

                    numColumns={1}
                    key="@"
                    keyExtractor={(item, index) => {
                      return '@' + index?.toString();
                    }}
                  />
                </>
              ) : null}
              <View style={styles.divider} />

              <View style={styles.buttonsContainer}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                  <View>
                    <Text
                      style={[
                        styles.price,
                        { color: color.palette[ThemeName].body_text },
                      ]}>
                      Price:{' '}
                    </Text>
                    <Text
                      style={[
                        styles.price,
                        {
                          fontFamily: typography.semibold,
                          fontSize: 24,
                          color: color.palette[ThemeName].body_text,
                        },
                      ]}>
                      ${data?.price}
                    </Text>
                  </View>
                  <Button
                    Color={color.palette[ThemeName].button_text}
                    title={'Notes'}
                    variant="outline"
                    style={[
                      styles.btn,
                      {
                        alignSelf: 'center',
                        marginLeft: 40,
                        backgroundColor: color.palette[ThemeName].other_button,
                        borderWidth: 0,
                      },
                    ]}
                    onPress={() => {
                      handleNotes();
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%'
                  }}>
                  <Button
                    title={'Cancel'}
                    style={[
                      styles.btn,
                      {
                        marginRight: 29,
                        backgroundColor: color.palette[ThemeName].cancel_button,
                      },
                    ]}
                    onPress={onClose}
                  />
                  <Button
                    title={'Done'}
                    style={[
                      styles.btn,
                      {
                        backgroundColor:
                          color.palette[ThemeName].continue_button,
                      },
                    ]}
                    onPress={handleDone}
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

export default Mods;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    height:700
  },
  header: {
    flexDirection: 'row',
    marginTop: 15,
  },
  image: {
    width: verticalScale(100),
    height: verticalScale(100),
    borderRadius: 10,
  },
  textContainer: {
    marginLeft: 15,
    width: '65%'
  },
  title: {
    fontSize: 20,
    fontFamily: typography.semibold,
    color: color.palette.black,
  },
  description: {
    fontSize: 16,
    fontFamily: typography.regular,
    color: color.palette.black,
  },
  divider: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 20,
  },
  subItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    alignItems: 'center',
  },
  subItemHeader: {
    fontFamily: typography.bold,
    fontSize: 16,
    marginBottom: 10,
    color: color.palette.black,
  },
  subItem: {
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontFamily: typography.regular,
    color: color.palette.black1,
  },
  buttonsContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: 20,
    gap: 20
  },
  notesButton: {
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 5,
  },
  doneButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  subItemsheaderRow: {
    flexDirection: 'row',
    flex: 0.79,
    justifyContent: 'space-between',
  },
  btn: {
    width: 130,
    height: 52,
    backgroundColor: color.palette.yellow,
  },
});
