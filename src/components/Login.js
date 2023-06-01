/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Snackbar from 'react-native-snackbar';
import axios from 'axios';

const Login = ({navigation}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  let jsondata = {username: name, password: password};

  const loginCheck = async () => {
    console.log('Api Calllll');
    try {
      if (!name || !password) {
        Snackbar.show({
          text: 'Required All Fields',
          textColor: '#FFF',
          backgroundColor: '#FF6666',
        });
      } else {
        axios({
          method: 'POST',
          url: 'http://192.168.0.36:8080/api/login',
          data: jsondata,
          config: {headers: {'Content-Type': 'multipart/form-data'}},
        })
          .then(res => {
            console.log('Response=========>>>>>>');
            if (res.status === 200 || res.status === 201) {
              console.log('LoggedIn Successfully===>');
              navigation.navigate('Home');
            }
          })
          .catch(error => {
            console.log('LoggedIn Failed===>', error);
            Snackbar.show({
              text: 'Please Check Username & Password',
              textColor: '#FFF',
              backgroundColor: '#FF6666',
            });
          });

        // axios
        //   .post('http://192.168.0.51:8080/api/login', jsondata, {
        //     headers: {'Content-type': 'application/x-www-form-urlencoded'},
        //   })
        //   .then(res => {
        //     console.log('gooosh');
        //   })
        //   .catch(error => {
        //     console.log(' error ====>', error);
        //   });
        // console.log('Loingin=========>>>>>>', jsondata);
      }
    } catch (error) {
      console.log(' error ====>', error);
    }
    // if (name === 'admin' && password === 'admin') {
    //   console.log('==loginCheck===');
    //   navigation.navigate('ThermalMap');
    // } else if (name !== 'admin' && password !== 'admin') {
    //   Snackbar.show({
    //     text: 'Please Check Username & Password',
    //     textColor: '#FFF',
    //     backgroundColor: '#FF6666',
    //   });
    // } else {
    //   console.log('==Login Failed===');
    //   Snackbar.show({
    //     text: 'Required All Fields',
    //     textColor: '#FFF',
    //     backgroundColor: '#FF6666',
    //   });
    // }
  };
  return (
    <View style={styles.container}>
      <View style={{width: 250, flexDirection: 'row'}}>
        <ImageBackground
          source={require('../icons/LoginLogo.png')}
          style={styles.image}
        />
        <Text style={styles.header}> vacus </Text>
      </View>
      <Text style={{color: '#595959', fontSize: 16}}>
        Login to your account
      </Text>
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Ionicons
          name="person-circle"
          color="#0066cc"
          size={40}
          style={styles.icons}
        />
        <TextInput
          value={name}
          onChangeText={text => setName(text)}
          style={styles.textInput}
          placeholder="Username"
          placeholderTextColor="#c2c2a3"
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
      </View>
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <MaterialIcon
          name="key-variant"
          color="#0066cc"
          size={40}
          style={styles.icons}
        />
        <TextInput
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor="#c2c2a3"
          underlineColorAndroid="transparent"
          secureTextEntry={secureText}
          autoCapitalize="none"
        />
        {secureText ? (
          <TouchableOpacity
            style={styles.buttonEye}
            onPress={() => setSecureText(!secureText)}>
            <Ionicons name="eye-off-outline" size={20} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.buttonEye}
            onPress={() => setSecureText(!secureText)}>
            <Ionicons name="eye-outline" size={20} />
          </TouchableOpacity>
        )}
      </View>
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <TouchableOpacity style={styles.button} onPress={() => loginCheck()}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  image: {
    width: 60,
    height: 60,
  },
  header: {
    color: '#0066cc',
    fontSize: 60,
    position: 'absolute',
    left: 40,
    bottom: -7,
  },
  textInput: {
    width: 300,
    height: 60,
    borderRadius: 30,
    textAlign: 'center',
    fontSize: 15,
    borderColor: '#595959',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    width: 290,
    height: 55,
    borderRadius: 30,
    backgroundColor: '#0066cc',
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonEye: {
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
  },
  icons: {
    marginTop: 13,
    position: 'absolute',
    left: 15,
  },
});
