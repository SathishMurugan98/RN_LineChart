import React, { useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    Touchable,
} from 'react-native';
import { Header, Right, Spinner, Icon, Card, Button } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackgroundTimer from 'react-native-background-timer';
import { sendAlertNotification} from './alert/Notification';


const Home = ({navigation}) => {
    // useEffect(() => {
    //     setInterval(() => {
    //         //timeBased()
    //         sendAlertNotification()
    //     }, 10000);
    // }, [])

    // const timeBased = () => {
    //     let date = new Date()
    //     console.log('=========>', date);
    // }


    return (
        <View style={{ backgroundColor: '#d9d9d9', flex: 1}}>
            <View>
                <ImageBackground
                    source={require('../all_assets/Header_Bar.png')}
                    style={{ width: "100%", height: 57 }}>
                    <Image
                        source={require('../all_assets/Vacus_White_Logo.png')}
                        style={styles.image}
                    />
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity transparent>
                            <Ionicons name="notifications" size={30} color="#FFF"
                                style={{ width: 25, height: 30, marginLeft: 260, marginTop: 10 }} />
                        </TouchableOpacity>
                        <TouchableOpacity transparent
                            onPress={() => navigation.navigate('Login')}>
                            <Image source={require('../all_assets/Logout_Icon.png')}
                                style={{ width: 29, height: 22, marginLeft: 30, marginTop: 15 }} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
            <View style={{flexDirection: 'row',width: '100%',
                alignItems: 'center',justifyContent: 'space-around',
                height: "10%", backgroundColor: '#FFF'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Alerts')}>
                    <Image
                        source={require('../all_assets/Alerts_Icon.png')}
                        style={{ width: 38, height: 35 }}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('PieChart')}>
                    <Image
                        source={require('../all_assets/System_Health_Icon.png')}
                        style={{ width: 40, height: 32 }}
                    />
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => navigation.navigate('Reports')}>
                    <Image
                        source={require('../all_assets/Reports_Icon.png')}
                        style={{ width: 30, height: 40 }}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={require('../all_assets/Realtime_Track_Icon.png')}
                        style={{ width: 42, height: 32 }}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ThermalMap')}>
                    <Image
                        source={require('../all_assets/Thermal_Map_Icon.png')}
                        style={{ width: 40, height: 50 }}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={require('../all_assets/Humidity_Map_Icon.png')}
                        style={{ width: 55, height: 50 }}
                    />
                </TouchableOpacity>
            </View>
            
            <View style={styles.body_header}>
                <Text style={styles.header_text}>HOME</Text>
                <Text style={styles.header_underline} />
            </View>
            {/* <TouchableOpacity style={{width: 150, height: 50 , backgroundColor: '#a59978'}}
                onPress={() => sendAlertNotification("Alert","Temperature")}
            >
                <Text>Alert</Text>
            </TouchableOpacity> */}

            <ScrollView>
                <View style={styles.cards_container}>
                    <TouchableOpacity onPress={() => navigation.navigate('Alerts')} disabled={true}>
                        <Image
                            source={require('../all_assets/Alerts_widget.png')}
                            style={{ width: 170, height: 170 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('ThermalMap')}>
                        <Image
                            source={require('../all_assets/Thermal_Map_Widget.png')}
                            style={{ width: 170, height: 170 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('PieChart')}>
                        <Image
                            source={require('../all_assets/System_Health_widget.png')}
                            style={{ width: 170, height: 170 }}
                        />
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => navigation.navigate('Reports')} disabled={true}>
                        <Image
                            source={require('../all_assets/reports_widget.png')}
                            style={{ width: 170, height: 170 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity disabled={true}>
                        <Image
                            source={require('../all_assets/Realtime_Tracking_Widget.png')}
                            style={{ width: 170, height: 170 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity disabled={true}>
                        <Image
                            source={require('../all_assets/Humidity_Map_Widget.png')}
                            style={{ width: 170, height: 170 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity disabled={true}>
                        <Image
                            source={require('../all_assets/Sensor_Config_widget.png')}
                            style={{ width: 170, height: 170 }}
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default Home;


const styles = StyleSheet.create({

    logo_container:{
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 5,
    },
    header: {
        color: '#0066cc',
        fontSize: 35,
        position: 'absolute',
        bottom: 3,
        left: 40,
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
        marginLeft: 10,
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
    cards_container :{ 
        margin: 10,
        flexDirection: 'row', 
        flexWrap: 'wrap',
    },
    cardLeft: {
        width: 150, 
        height: 200, 
        borderRadius: 10, 
        marginTop: 10, 
        marginRight: 10 
    },
    cardRight: { 
        width: 150, 
        height: 200, 
        borderRadius: 10, 
        marginTop: 10, 
        marginLeft: 10 
    },
    card_text :{ 
        alignSelf: 'center', 
        fontSize: 20, 
        fontWeight: 'bold', 
        paddingTop: 20 
    },
    card_icon :{ 
        alignSelf: 'center', 
        marginTop: 10, 
        fontSize: 100, 
        color: '#0066cc' 
    },
});
