import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {color, typography} from '../../theme';
import {Vertical} from '../../ui-kit';
import {useSelector} from 'react-redux';

const Acceptance = () => {
  const ThemeName = useSelector(state => state.auth.selected_Theme_name);
  return (
    <View style={{paddingVertical: 15, flex: 1}}>
      <Text style={[styles.title, {color: color.palette[ThemeName].body_text}]}>
        Acceptance of Use
      </Text>
      <Text
        style={[
          styles.description,
          {color: color.palette[ThemeName].body_text},
        ]}>
        By using Positiwity, you accept and agree to comply with our Terms &
        Conditions and Privacy Policy.
      </Text>
      <Vertical size={30} />
      <Text style={[styles.title, {color: color.palette[ThemeName].body_text}]}>
        Terms & Conditions
      </Text>
      <Text
        style={[
          styles.description,
          {color: color.palette[ThemeName].body_text},
        ]}>
        By using Positiwity, you agree to comply with all terms and conditions
        outlined here. You acknowledge that the software is provided as-is, and
        Positiwity is not liable for any damages or losses resulting from its
        use. You agree to use the software in accordance with all applicable
        laws and not to engage in any activity that could harm the service or
        other users.
      </Text>
      <Vertical size={30} />
      <Text style={[styles.title, {color: color.palette[ThemeName].body_text}]}>
        Privacy Policy
      </Text>
      <Text
        style={[
          styles.description,
          {color: color.palette[ThemeName].body_text},
        ]}>
        By using Positiwity, you consent to the collection and use of your data
        as described in our privacy policy. We only collect the necessary
        information to provide and improve our services. Your data will be
        handled securely, and we will not share your information with third
        parties without your consent, except as required by law. Your continued
        use of the product signifies your acceptance of these terms.
      </Text>
    </View>
  );
};
export default Acceptance;

const styles = StyleSheet.create({
  title: {
    fontFamily: typography.bold,
    fontSize: 16,
    color: color.palette.black,
  },
  description: {
    fontFamily: typography.regular,
    fontSize: 16,
    color: color.palette.black,
    textAlign: 'justify',
  },
});
