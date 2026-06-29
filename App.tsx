import {useEffect, useState} from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Platform,
  ToastAndroid,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import DeviceInfo from './src/deviceInfo';

type DeviceValues = {
  androidId: string;
  device: string;
  deviceId: string;
  error?: string;
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const [deviceValues, setDeviceValues] = useState<DeviceValues>({
    androidId: 'Loading...',
    device: 'Loading...',
    deviceId: 'Loading...',
  });
  const [count, setCount] = useState(1);

  const increment = () =>
    setCount(c => {
      const next = c + 1;
      if (next >= 9999) {
        if (Platform.OS === 'android') {
          ToastAndroid.show('App been hacked', ToastAndroid.SHORT);
        } else {
          Alert.alert('App been hacked');
        }
      }
      return next;
    });

  const decrement = () => setCount(c => Math.max(1, c - 1));

  useEffect(() => {
    let mounted = true;

    const loadDeviceInfo = async () => {
      try {
        const androidId =
          Platform.OS === 'android' ? await DeviceInfo.getAndroidId() : 'N/A';
        const device = await DeviceInfo.getDevice();
        const deviceId = DeviceInfo.getDeviceId();

        if (!mounted) {
          return;
        }

        console.log('Device info values', {
          androidId,
          device,
          deviceId,
        });

        setDeviceValues({
          androidId,
          device,
          deviceId,
        });
      } catch (error) {
        if (!mounted) {
          return;
        }

        setDeviceValues({
          androidId: 'Unavailable',
          device: 'Unavailable',
          deviceId: 'Unavailable',
          error: error instanceof Error ? error.message : String(error),
        });
      }
    };

    loadDeviceInfo();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: safeAreaInsets.top + 24,
          paddingBottom: safeAreaInsets.bottom + 24,
        },
      ]}>
      <View style={styles.infoCard}>
        <Text style={styles.heading}>react-native-device-info</Text>
        <Text style={styles.subheading}>Android values shown on screen</Text>
        <Text style={styles.item}>getAndroidId(): {deviceValues.androidId}</Text>
        <Text style={styles.item}>getDevice(): {deviceValues.device}</Text>
        <Text style={styles.item}>getDeviceId(): {deviceValues.deviceId}</Text>
        {deviceValues.error ? (
          <Text style={styles.error}>Error: {deviceValues.error}</Text>
        ) : null}
      </View>
      <View style={styles.counterRow}>
        <Button title="-" onPress={decrement} />
        <Text style={styles.counterText}>{count}</Text>
        <Button title="+" onPress={increment} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
  },
  infoCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    gap: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  subheading: {
    fontSize: 14,
    color: '#4b5563',
  },
  item: {
    fontSize: 14,
    color: '#1f2937',
  },
  error: {
    fontSize: 14,
    color: '#b91c1c',
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 16,
  },
  counterText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    minWidth: 80,
    textAlign: 'center',
  },
});

export default App;
