/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  Platform,
  InputAccessoryView,
  Keyboard,
  Button,
} from 'react-native';
import {color, spacing, typography} from '../../theme';
import {Text} from '../text';
import {mergeAll, flatten} from 'ramda';
import {Loader} from '..';
import {useSelector} from 'react-redux';

const CONTAINER = {height: 56};

const INPUT = {
  fontFamily: typography.regular,
  color: color.palette.black,
  minHeight: 56,
  fontSize: 16,
  backgroundColor: color.palette.white,

  paddingLeft: 11,
  paddingRight: 40,
  flexDirection: 'row',
  flex: 1,
  paddingVertical: 0,
};

const VARIATIONS = {
  bordered: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.palette.hairLineColor,
    borderRadius: 4,
  },
  underline: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: color.palette.hairLineColor,
  },
  danger: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'red',
    borderRadius: 4,
  },
  disabled: {
    borderColor: color.palette.hairLineColor,
    borderRadius: 10,
    backgroundColor: color.palette.switchBackgroundColor,
  },
};

const LABEL = {
  marginBottom: 12,
  fontSize: 16,
  color: color.palette.dark_grey2,
  lineHeight: 20.11,
};

const ERROR = {
  borderColor: 'red',
};

const RIGHT_CONTAINER = {
  height: '100%',
  aspectRatio: 0.5,
  justifyContent: 'center',
  position: 'absolute',
  right: 5,
  alignItems: 'center',
  top: Platform?.OS === 'android' ? 0 : 5,
};

const ICON = {
  width: 15,
  height: 15,
  marginLeft: 7,
};

const ERROR_CONTAINER = {
  marginTop: 0.5,
  fontSize: 12,
  color: color.palette.btnColor,
  textAlign: 'center',
};

const RIGHT_PADDING = {
  paddingRight: spacing[4],
};

const borderError = {
  bottom: Platform?.OS === 'ios' ? -24 : -80,
  left: -130,
};

const enhance = (style, styleOverride) => {
  return mergeAll(flatten([style, styleOverride]));
};

export function TextField(props) {
  const {
    placeholder,
    variant = 'bordered',
    style: styleOverride,
    inputStyle: inputStyleOverride,
    iconStyle: iconStyleOverride,
    errorStyle: errorStyleOver,
    containerStyle: containerStyleOverride,
    forwardedRef,
    errorMessage,
    onIconPress = () => {},
    icon,
    label,
    disabled,
    labelStyle: labelStyleOverride,
    required,
    loading,
    lftSymbol,
    lftSymbol_Style,
    autoCompleteOff = true,
    greenTick,
    checkVerify,
    v_title,
    v_press,
    v_load,
    adjust,

    ...rest
  } = props;

  let errorStyleOverride = errorMessage ? ERROR : {};

  let containerStyle = enhance(CONTAINER, containerStyleOverride);

  let inputStyle = enhance(
    {...INPUT, ...VARIATIONS[variant]},
    inputStyleOverride,
  );

  inputStyle = enhance(inputStyle, errorStyleOverride);

  let iconStyle = enhance(ICON, iconStyleOverride);


  let errorStyle =
    variant === 'bordered'
      ? enhance(ERROR_CONTAINER, borderError, errorStyleOver)
      : enhance(ERROR_CONTAINER, errorStyleOver);

  let isRightPaddingRequired = icon || loading;

  const inputAccessoryViewID = 'uniqueID';
  return (
    
    <View style={[containerStyle]}>
      

      <View style={{flexDirection: 'row', flex: 1}}>
        {lftSymbol && (
          <Text style={[styles.ruba_Style, lftSymbol_Style]}>₹</Text>
        )}
        <View style={{flex: 1}}>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={color.palette.lightGrey}
            underlineColorAndroid={color.transparent}
            {...rest}
            editable={!disabled}
            style={[inputStyle, !isRightPaddingRequired && RIGHT_PADDING]}
            ref={forwardedRef}
            autoCorrect={false}
            allowFontScaling={false}
            {...(autoCompleteOff && {autoCompleteType: 'off'})}
            inputAccessoryViewID={inputAccessoryViewID}
          />
          {Platform.OS === 'ios' && (
            <>
              <InputAccessoryView
                nativeID={inputAccessoryViewID}
                backgroundColor={color.palette.borderColor}>
                <View
                  style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Button
                    onPress={() => Keyboard.dismiss()}
                    title="Done"
                    style={{
                      justifyContent: 'flex-end',
                      alignContent: 'flex-end',
                      alignItems: 'center',
                      alignSelf: 'flex-end',
                    }}
                  />
                </View>
              </InputAccessoryView>
            </>
          )}
        </View>
      </View>
      {!loading ? (
        icon && (
          <TouchableOpacity
            style={RIGHT_CONTAINER}
            activeOpacity={0.8}
            hitSlop={{top: 15, left: 15, bottom: 15, right: 15}}
            onPress={onIconPress}>
            <Image source={icon} style={iconStyle} resizeMode={'contain'} />
          </TouchableOpacity>
        )
      ) : (
        <View style={RIGHT_CONTAINER}>
          <ActivityIndicator color={color.primary} size={'small'} />
        </View>
      )}

      {!!errorMessage && (
        <Text variant="fieldError" style={errorStyle}>
          {errorMessage.includes('server') || errorMessage.includes('undefined')
            ? null
            : errorMessage}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  check: {
    height: 12,
    width: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  verify: {
    marginLeft: 5,
    backgroundColor: color.palette.brown,
    height: 23,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 10,
  },
  v_text: {
    fontFamily: typography.secondary,
    fontSize: 12,
    lineHeight: 15.08,
    color: color.palette.white,
  },
  ruba_Style: {
    marginTop: Platform.OS === 'ios' ? 5 : 6,
    fontSize: 18,
    top: -4,
    fontFamily: typography.secondary,
  },
});
