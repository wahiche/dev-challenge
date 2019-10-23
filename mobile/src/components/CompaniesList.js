import React, { memo } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  companiesList: {
    flexDirection: 'row',
    padding: 20
  },
  imageWrapper: {
    marginRight: 20,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'rgba(0,0,0,0.2)',
    width: 80,
    height: 80,
    overflow: 'hidden'
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain'
  },
  text: {
    flexDirection: 'column'
  },
  textName: {
    fontSize: 18
  },
});

export default memo(({ companies }) => (
  <View style={styles.companiesList}>
    <View style={[styles.imageWrapper, { borderColor: companies.color }]}>
      <Image style={styles.image} source={{ uri: companies.image }} />
    </View>
    <View style={styles.text}>
      <Text style={styles.textName}>{companies.name}</Text>
    </View>
  </View>
));
