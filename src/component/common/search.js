import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {color, typography} from '../../theme';

export const SearchComponent = ({text, setText, placeholder, borderStyle}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        if (inputRef.current) {
          inputRef.current.blur(); // Remove focus from the input when the keyboard is minimized
        }
      },
    );

    // Cleanup the event listener when the component unmounts
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <View style={[styles.searchContainer, borderStyle]}>
      <View style={styles.innerRow}>
        <Image
          source={require('../../assets/image/search.png')}
          style={styles.insideIcon}
        />
        {!isFocused && !text?.length ? (
          <Text
            style={{
              top: 9,
              position: 'absolute',
              left: 40,
              fontSize: 16,
              fontFamily: typography.medium,
              color: color.palette.placeholder,
            }}>
            {placeholder}
          </Text>
        ) : null}
        <TextInput
          ref={inputRef}
          value={text}
          autoFocus={false}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={val => {
            setText(val);
          }}
          returnKeyType="go"
          returnKeyLabel="Search"
          textAlignVertical="top"
        />
      </View>
      {text?.length > 0 ? (
        <TouchableOpacity
          hitSlop={{top: 8, left: 8, bottom: 8, right: 8}}
          style={styles.crossIcon}
          onPress={() => {
            setText('');
          }}>
          <Image
            source={require('../../assets/image/searchCancel.png')}
            style={styles.cancel}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 11,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: color.palette.white,
  },
  innerRow: {
    flexDirection: 'row',
  },
  searchContainer: {
    paddingHorizontal: 20,
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 0,
    borderColor: color.palette.borderColor,
    marginBottom: 10,
  },

  input: {
    fontFamily: typography.medium,
    fontSize: 16,
    width: '80%',
    height: 60,
    // lineHeight: 22.11,
    color: color.palette.black,
    justifyContent: 'center',
    alignItems: 'center'
  },
  insideIcon: {height: 18, width: 18, alignSelf: 'center', marginRight: 17},
  crossIcon: {
    justifyContent: 'center',
  },
  searchCancel: {
    width: '20%',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  cancel: {
    height: 18,
    width: 18,
    alignSelf: 'center',
  },
  rowView: {
    flexDirection: 'row',
  },
  icon: {
    height: 24,
    width: 24,
    marginRight: 15,
    alignSelf: 'center',
  },
  images: {
    height: 33,
    width: 50,
    marginRight: 10,
  },
  listText: {
    fontSize: 16,
    lineHeight: 20.11,
    fontFamily: typography.medium,
    alignSelf: 'center',
  },
  circle: {
    height: 20,
    width: 20,
    borderWidth: 0.5,
    borderRadius: 10,
    marginRight: 15,
    alignSelf: 'center',
  },
});
