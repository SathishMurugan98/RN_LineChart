import React from 'react';
import { Table, Row } from 'react-native-table-component';
import moment from 'moment';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import { Header, Right, Spinner, Icon, Card } from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SystemHealth = ({navigation, route}) => {

    const { jsondata, header} = route.params;
    console.log('--------------------->', header);
    let tableData = []
    let widthArr = [];
    let tableHead = [];
    if (header === 'Assets'){
        widthArr = [100, 200, 100, 200, 300];
        tableHead = [
            'S.no',
            'Mac Address',
            'Battery',
            'Lastseen',
            'Type'
        ];
        for (let i = 0; i < jsondata.length;i++) {
            let lastseen = moment(jsondata[i].lastseen).format("YYYY-MM-DD HH:mm:ss")
            let arr = [i + 1, jsondata[i].macaddress, jsondata[i].battery, lastseen , jsondata[i].type]
            tableData[i] = arr
        }
    }

    if (header === 'Master Gateway') {
        widthArr = [100, 200, 200, 200];
        tableHead = [
            'S.no',
            'Mac Address',
            'Lastseen',
            'Floor Name'
        ];
        for (let i = 0; i < jsondata.length; i++) {
            let lastseen = moment(jsondata[i].lastseen).format("YYYY-MM-DD HH:mm:ss")
            let arr = [i + 1, jsondata[i].macaddress, lastseen, jsondata[i].floor]
            tableData[i] = arr
        }
    }

    if (header === 'Slave Gateway') {
        widthArr = [100, 200, 200, 200];
        tableHead = [
            'S.no',
            'Mac Address',
            'Lastseen',
            'Floor Name'
        ];
        for (let i = 0; i < jsondata.length; i++) {
            let lastseen = moment(jsondata[i].lastseen).format("YYYY-MM-DD HH:mm:ss")
            let arr = [i + 1, jsondata[i].macaddress, lastseen, jsondata[i].floor]
            tableData[i] = arr
        }
    }

    if (header === 'Signal Repeater') {
        widthArr = [100, 200, 200,];
        tableHead = [
            'S.no',
            'Mac Address',
            'Lastseen'
        ];
        for (let i = 0; i < jsondata.length; i++) {
            let lastseen = moment(jsondata[i].lastseen).format("YYYY-MM-DD HH:mm:ss")
            let arr = [i + 1, jsondata[i].macaddress, lastseen]
            tableData[i] = arr
        }
    }

    if (header === 'Sensors') {
        widthArr = [100, 200, 100, 300, 300];
        tableHead = [
            'S.no',
            'Mac Address',
            'Battery',
            'Lastseen',
            'Type'
        ];
        for (let i = 0; i < jsondata.length; i++) {
            let lastseen = moment(jsondata[i].lastseen).format("YYYY-MM-DD HH:mm:ss")
            let arr = [i + 1, jsondata[i].macaddress, jsondata[i].battery, lastseen, jsondata[i].type]
            tableData[i] = arr
        }
    }
    
    return (
        <>
            <View>
                <ImageBackground
                    source={require('../../all_assets/Header_Bar.png')}
                    style={{ width: "100%", height: 57 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Image
                            source={require('../../all_assets/Vacus_White_Logo.png')}
                            style={{ width: "40%", height: 25, marginTop: 15 }}
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

            <View style={styles.body_header}>
                <Text style={styles.header_text}>{header}</Text>
                <Text style={styles.header_underline} />
            </View>
            
            <View style={styles.container}>
                <ScrollView horizontal={true}>
                    <View>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                            <Row
                                data={tableHead}
                                widthArr={widthArr}
                                style={styles.row_header}
                                textStyle={styles.text}
                            />
                        </Table>
                        <ScrollView style={styles.dataWrapper}>
                            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                                {tableData.map((rowData, index) => (
                                    <Row
                                        key={index}
                                        data={rowData}
                                        widthArr={widthArr}
                                        style={[
                                            styles.row,
                                            index % 2 && { backgroundColor: '#F7F6E7' },
                                        ]}
                                        textStyle={styles.text}
                                    />
                                ))}
                            </Table>
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>

        </>
    )
}

export default SystemHealth;


const styles = StyleSheet.create({
    header: {
        color: '#0066cc',
        fontSize: 35,
        position: 'absolute',
        bottom: 3,
        left: 130,
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
        left: 12,
    },
    container: { 
        marginTop: 15,
        backgroundColor: '#fff' 
    },
    row_header: {
        height: 50, 
        backgroundColor: '#537791' 
    },
    text: { 
        textAlign: 'center', 
        fontWeight: '100' 
    },
    dataWrapper: { 
        marginTop: -1, 
    },
    row: { 
        height: 40, 
        backgroundColor: '#E7E6E1' 
    },
});