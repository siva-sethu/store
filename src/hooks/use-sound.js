import React, {useEffect, useRef} from 'react';
import Sound from 'react-native-sound';
import {useSelector} from 'react-redux';
import {English} from '../utils/en';

const useSound = () => {
  const tapRingtone = useRef(null);
  const swooshRingtone = useRef(null);
  const successRingtone = useRef(null);
  const errorRingtone = useRef(null);
  const lastPlayed = useRef(0);
  const soundsetting = useSelector(state => state.auth.soundSetting);

  useEffect(() => {
    tapRingtone.current = new Sound(
      require('../assets/sounds/tap.wav'),
      error => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
      },
    );

    swooshRingtone.current = new Sound(
      require('../assets/sounds/swoosh.wav'),
      error => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
      },
    );
    successRingtone.current = new Sound(
      require('../assets/sounds/success.mp3'),
      error => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
      },
    );
    errorRingtone.current = new Sound(
      require('../assets/sounds/error.mp3'),
      error => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
      },
    );
    // tapRingtone.current.setSpeed(2.0);
    return () => {
      tapRingtone.current.release();
      swooshRingtone.current.release();
      successRingtone.current.release();
      errorRingtone.current.release();
    };
  }, []);

  const tapSound = () => {
    if (soundsetting === English.uiTable.uiItem3[0]) {
      tapRingtone.current.play(success => {});
    }
  };

  const swooshSound = () => {
    if (soundsetting === English.uiTable.uiItem3[0]) {
      swooshRingtone.current.play(success => {});
    }
  };

  const successSound = () => {
    if (soundsetting === English.uiTable.uiItem3[0]) {
      successRingtone.current.play(success => {});
    }
  };

  const errorSound = () => {
    if (soundsetting === English.uiTable.uiItem3[0]) {
      errorRingtone.current.play(success => {});
    }
  };

  return {tapSound, swooshSound, successSound, errorSound};
};

export default useSound;
