import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

const ActionBar: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movies</Text>
    </View>
  );
};

interface Styles {
  container: ViewStyle;
  title: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    height: 50,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ActionBar;