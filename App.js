


import React, {useEffect, useState} from 'react';
import {StatusBar, View, Text, LogBox} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {ToastProvider} from 'react-native-toast-notifications';
import VerifyDeviceRoot from 'react-native-verify-device-root';

// import {store} from './src/Redux/store';
import {hp} from './src/utils/resDimensions';
import RootNavigation from './src/routes/routes';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/Redux/store';
// import createReduxStore from './src/Redux/store';

const App = () => {
  const [isRooted, setIsRooted] = useState('');
  const root = async () => {
    const check = await VerifyDeviceRoot.isRooted();
    // alert(check)
    if (!check) {
      setIsRooted('Is Rooted');
      // setIsRooted('Is not Rooted')
    } else {
      setIsRooted('Is not Rooted');
    }
  };

  useEffect(() => {
    LogBox.ignoreAllLogs();
    root();
  }, []);

  if (isRooted == 'Is not Rooted') {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ToastProvider
            placement={'bottom'}
            duration={2000}
            animationType="zoom-in"
            offsetBottom={hp(10)}>
            <PaperProvider>
            <NativeBaseProvider>    
            <StatusBar backgroundColor="#6bbee8" barStyle="light-content"/>
            <NavigationContainer>
            <RootNavigation />
            </NavigationContainer>
            </NativeBaseProvider>
            </PaperProvider>
          </ToastProvider>
        </PersistGate>
      </Provider>
    );
  } else {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{textAlign: 'center', margin: 20}}>
          Your device is rooted. We are not supported to rooted device please
          install this application on non-rooted device.{' '}
        </Text> 
      </View>
    );
  }
};
export default App;




// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });




