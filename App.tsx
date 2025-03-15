import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MiningApp: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [mining, setMining] = useState<boolean>(false);

  useEffect(() => {
    loadBalance();
  }, []);

  const loadBalance = async () => {
    try {
      const storedBalance = await AsyncStorage.getItem('balance');
      if (storedBalance) setBalance(parseInt(storedBalance));
    } catch (error) {
      console.error('Error loading balance:', error);
    }
  };

  const startMining = async () => {
    if (mining) {
      Alert.alert('Mining in progress', 'You are already mining tokens.');
      return;
    }
    setMining(true);
    Alert.alert('Mining Started', 'You are earning tokens!');
    setTimeout(async () => {
      const newBalance = balance + 10; // Earn 10 tokens per session
      setBalance(newBalance);
      await AsyncStorage.setItem('balance', newBalance.toString());
      setMining(false);
      Alert.alert('Mining Completed', 'You earned 10 tokens!');
    }, 5000); // Simulating 5 seconds of mining
  };

  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>Balance: {balance} Tokens</Text>
      <TouchableOpacity style={styles.miningButton} onPress={startMining}>
        <Text style={styles.buttonText}>Start Mining</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  balanceText: { fontSize: 24, marginBottom: 20 },
  miningButton: { backgroundColor: '#6200EE', padding: 15, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 18 },
});

export default MiningApp;