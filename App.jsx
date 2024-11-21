import React, {useRef} from 'react';
import 'react-native-gesture-handler';
import * as storage from './src/utils/storage';
import {
  RootNavigator,
  setRootNavigation,
  useNavigationPersistence,
} from './src/navigation';
import {NAVIGATION_PERSISTENCE_KEY} from './src/constants/keys';
import {useState} from 'react';
import {Provider} from 'react-redux';
import {OfflineLoad} from './src/component/common/offline-load';
import {store} from './src/redux/store';

const App = () => {
  const [loading, setLoading] = useState(true);
  const navigationRef = useRef();
  setRootNavigation(navigationRef);
  const {initialNavigationState, onNavigationStateChange} =
    useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);
  return (
    
    <Provider store={store}>
      {loading ? (
        <OfflineLoad loading={loading} setLoading={setLoading} />
      ) : (
        <RootNavigator
          ref={navigationRef}
          initialState={initialNavigationState}
          onStateChange={onNavigationStateChange}
        />
      )}
    </Provider>
  );
};

export default App;
