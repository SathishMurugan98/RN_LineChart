import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Touchable,
  PixelRatio,
} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        style={{width: 150, height: 60, backgroundColor: 'blue'}}
        onPress={() => navigation.navigate('Charts')}>
        <Text style={{color: '#FFF', fontSize: 18, textAlign: 'center'}}>
          navigation
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
