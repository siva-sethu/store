import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  StyleSheet,
  PermissionsAndroid,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  Dimensions,
  Pressable,
} from 'react-native';
import notifee, { AndroidImportance, AndroidVisibility, EventType } from '@notifee/react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { english } from '../../lamguages/english';
import { tamil } from '../../lamguages/tamil';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../redux/slice/language';

const screenWidth = Dimensions.get('screen').width;

// Define translations for English and Tamil


const Orders = () => {
  const dispatch = useDispatch();
  const {selectedLanguage, translations} = useSelector(state => state.language);
  const [image, setImage] = useState(null); // For profile image
  const [modalVisible, setModalVisible] = useState(false); // For modal visibility

  const [open, setOpen] = useState(false); // For dropdown
  const [languageItems, setLanguageItems] = useState([
    { label: 'English', value: 'en' },
    { label: 'Tamil', value: 'ta' },
  ]);

  // Load the selected language from AsyncStorage on app start
  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
        if (savedLanguage) {
          dispatch(setLanguage(savedLanguage))
        
        }
      } catch (error) {
        console.error('Failed to fetch language from AsyncStorage:', error);
      }
    };

    fetchLanguage();
  }, []);

  // Update language in AsyncStorage and state
  const handleLanguageChange = async (language) => {
    try {
      dispatch(setLanguage(language))
      
      await AsyncStorage.setItem('selectedLanguage', language); // Save language to AsyncStorage
    } catch (error) {
      console.error('Failed to save language to AsyncStorage:', error);
    }
  };
  

  // Camera Permission
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const handleOpenCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      try {
        const result = await ImageCropPicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
          cropperCircleOverlay: true,
        });
        setImage(result.path);
      } catch (error) {
        console.error('Error launching camera:', error);
      }
    }
  };

  const openGallery = async () => {
    setModalVisible(false);
    try {
      const result = await ImageCropPicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        cropperCircleOverlay: true,
      });
      setImage(result.path);
    } catch (error) {
      console.log('Image selection cancelled or failed.', error);
    }
  };

  const openFileManager = async () => {
    setModalVisible(false);
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      if (result && result[0]) {
        const croppedImage = await ImageCropPicker.openCropper({
          path: result[0].uri,
          width: 300,
          height: 400,
          cropping: true,
          cropperCircleOverlay: true,
        });
        setImage(croppedImage.path);
      }
    } catch (error) {
      console.log('File selection was cancelled or failed.', error);
    }
  };

  const triggerForegroundNotification = async () => {
    await notifee.displayNotification({
      title: translations[selectedLanguage].triggerNotification,
      body: 'This is a manually triggered notification!',
      android: {
        channelId: 'default',
        sound: 'default',
        visibility: AndroidVisibility.PUBLIC,
        importance: AndroidImportance.HIGH,
        smallIcon: 'ic_notification',
      },
      ios: {
        sound: 'default',
      },
    });
  };

  // Register background notification listeners
  useEffect(() => {
    const onBackgroundEvent = async ({ type, detail }) => {
      if (type === EventType.BACKGROUND_NOTIFICATION_PRESS) {
        console.log('Background notification pressed', detail);
      }
    };

    const unsubscribe = notifee.onBackgroundEvent(onBackgroundEvent);

    return () => {
      // unsubscribe(); // Clean up on component unmount
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F4F7FF" />

      <FlatList
        data={[{}]} // Dummy data for FlatList
        renderItem={() => (
          <View style={styles.container}>
            {/* Language Selector */}
            <View style={styles.languageSelector}>
              <DropDownPicker
                open={open}
                value={selectedLanguage}
                items={languageItems}
                setOpen={setOpen}
                setValue={(callback) => {
                  const newValue = callback(selectedLanguage); // Get the new selected language
                  handleLanguageChange(newValue); // Call your custom function to handle language change
                }}
                setItems={setLanguageItems}
                containerStyle={styles.dropdownContainer}
              />
            </View>

            {/* Profile photo clickable area */}
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              {image ? (
                <Image source={{ uri: image }} style={styles.profileImage} />
              ) : (
                <View style={styles.placeholder}>
                  <Text style={styles.placeholderText}>
                    {translations[selectedLanguage].profilePhoto}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Modal for image selection */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>
                    {translations[selectedLanguage].chooseOption}
                  </Text>
                  <Pressable style={styles.modalButton} onPress={handleOpenCamera}>
                    <Text style={styles.modalButtonText}>
                      {translations[selectedLanguage].openCamera}
                    </Text>
                  </Pressable>
                  <Pressable style={styles.modalButton} onPress={openGallery}>
                    <Text style={styles.modalButtonText}>
                      {translations[selectedLanguage].openGallery}
                    </Text>
                  </Pressable>
                  <Pressable style={styles.modalButton} onPress={openFileManager}>
                    <Text style={styles.modalButtonText}>
                      {translations[selectedLanguage].openFileManager}
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.modalButtonText}>
                      {translations[selectedLanguage].cancel}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Modal>

            <Pressable onPress={triggerForegroundNotification} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>
                {translations[selectedLanguage].triggerNotification}
              </Text>
            </Pressable>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#F4F7FF',
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  languageSelector: {
    marginBottom: 16,
  },
  dropdownContainer: {
    height: 40,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 10,
    alignSelf: 'center',
  },
  placeholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#B8C7D5',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },
  placeholderText: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#FF5252',
  },
  saveButton: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Orders;









