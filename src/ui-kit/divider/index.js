import React from 'react';
import {StyleSheet, View} from 'react-native';
import {color} from '../../theme';
import {Text} from '../text';
import {palette} from '../../theme/palette';

const SOLID = {
  width: '100%',
  borderBottomWidth: 0.5,
  borderColor: '#C4C4C4',
};

const CONTAINER = {
  flexDirection: 'row',
 
};

const DASHED = {
  borderColor: color.palette.dottedLine,
  borderWidth: 0.8,
  width: 6,
};

export function Divider(props) {
  const {variant = 'solid', style: styleOverride} = props;

  return variant === 'solid' ? (
    <View style={[SOLID, styleOverride]} />
  ) : (
    <View style={[CONTAINER, {justifyContent: 'space-between'}]}>
      {[...Array(60)].map((_, ind) => {
        return (
          <View
            style={[DASHED, styleOverride, ind > 0 ? {marginLeft: 12} : null]}
          />
        );
      })}
    </View>
  );
}

export const Divider_dot = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: palette.gray_border,
    marginHorizontal: 10,
  },
});
