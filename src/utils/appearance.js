import {useEffect, useState} from 'react';
import {Appearance} from 'react-native';

const getCurrentColorScheme = () => {
  return Appearance.getColorScheme();
};

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(getCurrentColorScheme() === 'dark');

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setIsDark(colorScheme === 'dark');
    });
    return () => subscription.remove();
  }, []);

  return isDark;
};

export {useDarkMode};
