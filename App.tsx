import {useState} from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Platform,
  ToastAndroid,
} from 'react-native';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';

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
  const [gold, setGold] = useState(0);
  const GOAL = 99999;

  const addGold = () =>
    setGold(g => {
      const next = g + 1;
      if (next >= GOAL) {
        if (Platform.OS === 'android') {
          ToastAndroid.show('App been hacked', ToastAndroid.SHORT);
        } else {
          Alert.alert('App been hacked');
        }
      }
      return next;
    });

  const percent = Math.min((gold / GOAL) * 100, 100);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: safeAreaInsets.top + 24,
          paddingBottom: safeAreaInsets.bottom + 24,
        },
      ]}>
      {/* Goal card */}
      <View style={styles.goalCard}>
        <Text style={styles.goalTitle}>🏆 Gold Rush</Text>
        <Text style={styles.goalSub}>
          Claim {GOAL.toLocaleString()} gold bars to win
        </Text>
        {/* progress bar */}
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, {width: `${percent}%` as any}]} />
        </View>
        <Text style={styles.progressLabel}>
          {gold.toLocaleString()} / {GOAL.toLocaleString()} ({percent.toFixed(1)}
          %)
        </Text>
      </View>

      {/* Gold bar display */}
      <View style={styles.goldDisplay}>
        <Text style={styles.goldEmoji}>🪙</Text>
        <Text style={styles.goldCount}>{gold.toLocaleString()}</Text>
        <Text style={styles.goldLabel}>gold bars</Text>
      </View>

      {/* Big tap button */}
      <View style={styles.tapArea}>
        <TouchableOpacity
          style={styles.claimBtn}
          onPress={addGold}
          activeOpacity={0.7}>
          <Text style={styles.claimBtnText}>👆 CLAIM GOLD BAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#1a1a2e',
  },
  goalCard: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#16213e',
    gap: 12,
    borderWidth: 2,
    borderColor: '#d97706',
  },
  goalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fbbf24',
    textAlign: 'center',
  },
  goalSub: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
  },
  progressBg: {
    height: 20,
    backgroundColor: '#0f172a',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#d97706',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#d97706',
  },
  progressLabel: {
    fontSize: 13,
    color: '#cbd5e1',
    textAlign: 'center',
  },
  goldDisplay: {
    alignItems: 'center',
    gap: 4,
    marginVertical: 24,
  },
  goldEmoji: {
    fontSize: 64,
  },
  goldCount: {
    fontSize: 48,
    fontWeight: '800',
    color: '#fbbf24',
  },
  goldLabel: {
    fontSize: 16,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  tapArea: {
    marginHorizontal: 16,
    padding: 16,
  },
  claimBtn: {
    backgroundColor: '#d97706',
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  claimBtnText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default App;
