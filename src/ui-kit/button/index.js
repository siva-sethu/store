import { flatten, mergeAll } from 'ramda';
import * as React from 'react';
import { ActivityIndicator, Pressable } from 'react-native';
import { color, spacing, typography } from '../../theme';
import { Text } from '../text';

const BASE_VIEW = {
  paddingHorizontal: spacing[2],
  borderRadius: 6,
  justifyContent: 'center',
  alignItems: 'center',
};

const BASE_TEXT = {
  fontSize: 20,
  paddingHorizontal: spacing[3],
  fontFamily: typography.secondary,
};

const viewVariants = {
  solid: { ...BASE_VIEW, backgroundColor: color.palette.btnColor },
  link: {
    ...BASE_VIEW,
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: 'flex-start',
  },
  outline: {
    ...BASE_VIEW,
    borderWidth: 2,
    borderColor: color.palette.btnColor,
    backgroundColor: 'white',
  },
};

const textVariants = {
  solid: {
    ...BASE_TEXT,
    color: color.palette.white,
    textAlign: 'center',
    letterSpacing: 0,

  },
  bold: {
    ...BASE_TEXT,
    color: color.palette.white,
    textAlign: 'center',
    letterSpacing: 0,
    fontFamily: typography.medium,
  },
  outline: {
    ...BASE_TEXT,
    color: color.palette.btnColor,
    fontFamily: typography.medium,
    textAlign: 'center',
    top: 2,
  },
};

export function Button(props) {
  const {
    variant = 'solid',
    title,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    disabled,
    loading,
    Color,
    ...rest
  } = props;

  const viewStyle = mergeAll(
    flatten([viewVariants[variant] || viewVariants.solid, styleOverride]),
  );
  const textStyle = mergeAll(
    flatten([textVariants[variant] || textVariants.solid, textStyleOverride]),
  );

  const content = children || <Text text={title} style={[textStyle, Color && { color: Color }]} />;

  const disableStyle =
    variant === 'link'
      ? { backgroundColor: color.palette.white }
      : { backgroundColor: color.palette.disableColor };

  return (
    <Pressable
      style={[viewStyle, disabled && disableStyle]}
      {...{ disabled }}
      {...rest}
      android_ripple={{ color: color.palette.white }}>
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'link' || variant === 'outline'
              ? color.primary
              : color.palette.white
          }
        />
      ) : (
        content
      )}
    </Pressable>
  );
}
