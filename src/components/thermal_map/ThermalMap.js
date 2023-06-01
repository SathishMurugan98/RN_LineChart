/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  PanResponder,
  ImageBackground,
  Alert,
} from 'react-native';
import {
  PanGestureHandler,
  PinchGestureHandler,
} from 'react-native-gesture-handler';
import {
  Header,
  Container,
  Left,
  Button,
  Right,
  Body,
  Title,
  Spinner,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Snackbar from 'react-native-snackbar';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import ImageZoom from 'react-native-image-pan-zoom';

const {width} = Dimensions.get('window');

const ThermalMap = ({navigation}) => {
  const [dropdown, setDropdown] = useState('cambridge_ground_floor1');
  const [image, setImage] = useState(require('../../images/ThermalMap1.png'));

  const changeDropdownImage = (value, id) => {
    setDropdown(value);
    if (id == '1') {
      setImage(require('../../images/ThermalMap1.png'));
    } else {
      setImage(require('../../images/ThermalMap2.png'));
    }
  };

  // const pan = useRef(new Animated.ValueXY()).current;
  // const panResponder = useRef(
  //   PanResponder.create({
  //     onMoveShouldSetPanResponder: () => true,
  //     onPanResponderGrant: () => {
  //       pan.setOffset({
  //         x: pan.x._value,
  //         y: pan.y._value,
  //       });
  //     },
  //     onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
  //       useNativeDriver: false,
  //     }),
  //     onPanResponderRelease: () => {
  //       pan.flattenOffset();
  //     },
  //   }),
  // ).current;

  // const handlePress = evt => {
  //   console.log('Coordinates', `x coord = ${evt.nativeEvent.locationX}`);
  //   console.log('Coordinates', `y coord = ${evt.nativeEvent.locationY}`);
  // };

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const tags = [];
  const [item, setItem] = useState('');

  const authenticate = (res, macId) => {
    //console.log('Enter into authenticate ====>', res.data);
    Alert.alert('Mac.Id : ' + macId, ' Click Proceed to Continue', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: 'Proceed',
        onPress: () => navigation.navigate('Charts', {jsonvalue: res.data}),
      },
    ]);
  };

  const chartsDatas = async (macaddress, floorname) => {
    let jsondata = {macaddress: macaddress};
    console.log('Enter into ChartsDatas ====>');
    Alert.alert('Mac.Id : ' + macaddress, ' Click Proceed to Continue', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: 'Proceed',
        onPress: () => navigation.navigate('LineChart', { "macaddress": macaddress }),
      },
    ]);
    
    // try {
    //   axios({
    //     method: 'POST',
    //     url: 'http://192.168.0.36:8080/api/singletemp?floorname=Floor-1',
    //     data: jsondata,
    //     config: {headers: {'Content-Type': 'multipart/form-data'}},
    //   })
    //     .then(res => {
    //       if (res.status === 200 || res.status === 201) {
    //         console.log('Sensors Data Getting Success===>');
    //         authenticate(res, macaddress);
    //       }
    //     })
    //     .catch(error => {
    //       console.log('Sensors Data Getting Failed===>');
    //     });
    // } catch (error) {
    //   console.error('chartsDatas Error=====>');
    // }
  };

  const userDetailsData = async () => {
    setLoading(false);
    console.log('Api Calllll');
    try {
      let response = await fetch(
        'http://192.168.0.36:8080/api/temperaturehumidity?floorname=Floor-1',
      );
      let json = await response.json();
      //console.log('====>', json);
      setItem(json);
      //roomSize(json);
    } catch (error) {
      console.log(' error ====>', error);
    }
    setLoading(true);
  };
  
  for (let i = 0; i < item.length; i++) {
    if (parseInt(item[i].temperature) < 25) {
      console.log('=====---FIRST----=====>', item[0].asset.macAddress, item[0].floor);
      tags.push(
        <TouchableOpacity
          key={i}
          style={{
            borderColor: 'black',
            borderWidth: 1,
            backgroundColor: 'rgba(0,60,255,0.5)',
            position: 'absolute',
            left: 54*i,
            top: 195,
            width: 57,
            height: 45,
          }}
          // onPress={() => {
          //   //alert(i);
          //   navigation.navigate('Charts');
          // }}
          onPress={() => navigation.navigate('ChartsLine')}>
          <Text>{'      '}</Text>
        </TouchableOpacity>,
      );
    } else if (
      parseInt(item[i].temperature) >= 25 &&
      parseInt(item[i].temperature) < 40
    ) {
        console.log('=====---SECOND----=====>');
        tags.push(
          <TouchableOpacity
            key={i}
            style={{
              borderColor: 'black',
              borderWidth: 1,
              backgroundColor: 'rgba(0,255,0,0.5)',
              position: 'absolute',
              left: 54*i,
              top: 237,
              width: 57,
              height: 62,
              // left: item[i].asset.x,
              // top: item[i].asset.y,
              // width: item[i].asset.x1,
              // height: item[i].asset.y1,
            }}
            // onPress={() => {
            //   //alert(i);
            //   navigation.navigate('Charts');
            // }}>
            onPress={() => chartsDatas(item[i].asset.macAddress, item[i].floor)}>
            <Text>{'      '}</Text>
          </TouchableOpacity>,
        );
      } else if (parseInt(item[i].temperature) >= 40) {
          console.log('=====---THIRD----=====>');
          tags.push(
            <TouchableOpacity
              key={i}
              style={{
                borderColor: 'black',
                borderWidth: 1,
                backgroundColor: 'rgba(255, 165, 0, 0.5)',
                position: 'absolute',
                left: 54*i,
                top: 195,
                width: 57,
                height: 45,
              }}
              // onPress={() => {
              //   //alert(i);
              //   navigation.navigate('Charts');
              // }}>
              onPress={() => chartsDatas(item[i].asset.macAddress, item[i].floor)}>
              <Text>{'      '}</Text>
            </TouchableOpacity>,
          );
        }
    }

  // function roomSize(item) {
  //   console.log('Enter into roomSize ==========>');

  //   console.log('=====---payments----=====>', payments);
  // }

  useEffect(() => {
    userDetailsData();
  }, []);

  if (!loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Spinner color="#0066cc" size={50} />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <View>
        <ImageBackground
          source={require('../../all_assets/Header_Bar.png')}
          style={{ width: "100%", height: 57 }}>
          <TouchableOpacity onPress={() => navigation.navigate('Home') }>
            <Image
              source={require('../../all_assets/Vacus_White_Logo.png')}
              style={{width: "40%",height: 25,marginTop: 15}}
            />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity transparent>
              <Ionicons name="notifications" size={30} color="#FFF"
                style={{ width: 25, height: 30, marginLeft: 260, marginTop: -25 }} />
            </TouchableOpacity>
            <TouchableOpacity transparent
              onPress={() => navigation.navigate('Login')}>
              <Image source={require('../../all_assets/Logout_Icon.png')}
                style={{ width: 29, height: 22, marginLeft: 30, marginTop: -20 }} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
      <View style={{
          flexDirection: 'row', width: '100%',
          alignItems: 'center', justifyContent: 'space-around',
          height: "10%", backgroundColor: '#FFF'
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Alerts')}>
          <Image
            source={require('../../all_assets/Alerts_Icon.png')}
            style={{ width: 38, height: 35 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('PieChart')}>
          <Image
            source={require('../../all_assets/System_Health_Icon.png')}
            style={{ width: 40, height: 32 }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Reports')}>
          <Image
            source={require('../../all_assets/Reports_Icon.png')}
            style={{ width: 30, height: 40 }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../all_assets/Realtime_Track_Icon.png')}
            style={{ width: 42, height: 32 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ThermalMap')}>
          <Image
            source={require('../../all_assets/Thermal_Map_Icon.png')}
            style={{ width: 40, height: 50 }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../all_assets/Humidity_Map_Icon.png')}
            style={{ width: 55, height: 50 }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View>
          <View style={styles.body_header}>
            <Text style={styles.header_text}>THERMAL MAP</Text>
            <Text style={styles.header_underline} />
          </View>
          <View style={{margin: 10, flexDirection: 'row'}}>
            <Text
              style={{
                color: '#000',
                fontSize: 16,
                marginTop: 5,
                marginLeft: 5,
              }}>
              Floor Name{' '}
            </Text>
            <DropDownPicker
              items={[
                {
                  id: '1',
                  label: 'Cambridge Ground Floor1',
                  value: 'cambridge_ground_floor1',
                },
                {
                  id: '2',
                  label: 'Cambridge Ground Floor2',
                  value: 'cambridge_ground_floor2',
                },
              ]}
              defaultValue={dropdown}
              containerStyle={{height: 40}}
              style={styles.dropdown_style}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={styles.dropdown_style}
              onChangeItem={item => changeDropdownImage(item.value, item.id)}
            />
          </View>
        </View>
        <ScrollView>
          <View
            style={{
              height: 550,
              marginBottom: -200,
              // backgroundColor: 'rgba(0,160,255,0.5)',
            }}>
            <ImageZoom
              cropWidth={Dimensions.get('window').width}
              cropHeight={Dimensions.get('window').height}
              imageWidth={750}
              imageHeight={650}>
              {/* <TouchableOpacity onPress={evt => handlePress(evt)}> */}
              {/* <Animated.View
                  style={{
                    transform: [{translateX: pan.x}, {translateY: pan.y}],
                  }}
                  {...panResponder.panHandlers}> */}
              {/* <ScrollView horizontal={true}> */}
              <Image style={styles.thermal_image} source={image} />

              {tags}
              {/* </ScrollView> */}
              {/* </Animated.View> */}
              {/* </TouchableOpacity> */}
            </ImageZoom>
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default ThermalMap;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: 'blue',
    borderColor: 'red',
    borderRadius: 20,
    borderWidth: 1,
  },
  text: {
    color: '#FFF',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    color: '#0066cc',
    fontSize: 35,
    position: 'absolute',
    bottom: 3,
    left: 110,
  },
  image: {
    width: "40%",
    height: 25,
    position: 'absolute',
    left: 10,
    top: 10
  },
  body_header: {
    margin: 10,
  },
  header_text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  header_underline: {
    borderBottomWidth: 8,
    borderBottomColor: '#0066cc',
    width: 70,
    position: 'absolute',
    top: 23,
    left: 9,
  },
  dropdown_style: {
    width: 240,
    marginLeft: 0,
    borderRadius: 30,
    textAlign: 'center',
    fontSize: 15,
    borderColor: '#595959',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 3.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
  thermal_image: {
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: '#000',
    maxWidth: 750,
    maxHeight: 280,
    resizeMode: 'cover',
  },
});
