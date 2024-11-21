import * as React from 'react';
import {Text as ReactNativeText} from 'react-native';
import {mergeAll, flatten} from 'ramda';
import {typography, color} from '../../theme';

const BASE = {
  fontFamily: typography.primary,
  color: color.palette.black,
  fontSize: 14,
};
const variants = {
  default: BASE,

  bold: {...BASE, fontFamily: typography.secondary},

  header: {...BASE, fontSize: 16, fontFamily: typography.secondary},

  secondary: {...BASE, fontSize: 14, fontFamily: typography.secondary},

  fieldLabel: {...BASE, fontSize: 16},

  fieldError: {
    ...BASE,
    fontSize: 14,
    fontFamily: typography.tertiary,
    color: color.palette.red,
  },

  italic: {
    ...BASE,
    fontSize: 14,
    fontFamily: typography.tertiary,
  },

  success: {
    ...BASE,
    fontSize: 15,
    fontFamily: typography.primary,
    color: color.palette.green,
  },
};

export function Text(props) {
  const {
    variant = 'default',
    text,
    children,
    style: styleOverride,
    ...rest
  } = props;

  const content = text || children;

  const style = mergeAll(
    flatten([variants[variant] || variants.default, styleOverride]),
  );

  return (
    <ReactNativeText {...rest} style={style} allowFontScaling={false}>
      {content}
    </ReactNativeText>
  );
}
