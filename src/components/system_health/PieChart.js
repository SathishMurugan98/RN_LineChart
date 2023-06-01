import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import { Header, Right, Spinner, Icon, Card } from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Pie from 'react-native-pie';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PieChart = ({ navigation }) => {

    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const [count3, setCount3] = useState(0);
    const [count4, setCount4] = useState(0);
    const [count5, setCount5] = useState(0);

    const [assets, setAssets] = useState([]);
    const [master, setMaster] = useState([]);
    const [slave, setSlave] = useState([]);
    const [signal, setSignal] = useState([]);
    const [systemHealth, setSystemHealth] = useState([]);


    const [loading, setLoading] = useState(true);


    useEffect(() => {
        displayAssetHealth()
        // setInterval(() => {
        //     displayAssetHealth()
        // }, 15 * 1000);
    }, [])
    if (!loading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Spinner color="#0066cc" size={50} />
            </View>
        );
    }

    const displayAssetHealth = async () => {
        setLoading(false);
        let resp = await fetch("http://192.168.0.36:8080/api/health");
        let response = await resp.json();
        setAssets([]);
        setMaster([]);
        setSlave([]);
        setSignal([]);
        setSystemHealth([]);

        try {
            let date = new Date().toISOString();
            let time = new Date().toLocaleString('en-US', { timeZone: 'Indian/Kolkata' })
            let dateTime = date.substring(0, 10) + " " + time.substring(11, 19);
            let currTime = dateTime;

            let value1 = 0;
            let value2 = 0;
            let value3 = 0;
            let value4 = 0;
            let value5 = 0;

            console.log('Timeee====>', date.substring(0, 10) + " " + time.substring(11, 19));
            let lastseen, status;

            // Displaying asset health and signal repeater details in table format
            if (response.assets !== undefined) {
                let data = response.assets;
                if (data.length !== 0) {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].type === "employee") {
                            if (data[i].lastseen !== null) {
                                lastseen =
                                    data[i].lastseen.substring(0, 10) +
                                    " " +
                                    data[i].lastseen.substring(11, 19);
                                //if (currTime - timestamp <= 2 * 60 * 1000) status = "green";
                                let time_subtract = moment(currTime, "YYYY-MM-DD HH:mm:ss").diff(moment(lastseen, "YYYY-MM-DD HH:mm:ss"));
                                let time_differece = moment.duration(time_subtract);
                                let time = Math.floor(time_differece.asHours()) + moment.utc(time_subtract).format(":mm:ss");
                                let duration = moment(time, 'HH:mm:ss').hours() * 3600
                                    + moment(time, 'HH:mm:ss').minutes() * 60
                                    + moment(time, 'HH:mm:ss').seconds()
                                console.log("systemHealth duration ###### ==> ", duration);
                                if (duration <= 2 * 60) status = "green";
                                else {
                                    status = "red";
                                    setSystemHealth(datas => [...datas, data[i]]);
                                }
                            } else {
                                lastseen = "--:--:--";
                                status = "red";
                                setSystemHealth(datas => [...datas, data[i]]);
                            }
                            let battery = "-:-:-";
                            if (data[i].battery !== undefined) battery = data[i].battery;
                            ++value1;
                            setCount1(value1);
                            // console.log("systemHealth #########=>", value1, '====', data[i].macaddress,
                            //             '=====', battery, '====', lastseen, '====', status);
                        } else if (data[i].type === "signal-repeater") {
                            if (data[i].lastseen !== null) {
                                lastseen =
                                    data[i].lastseen.substring(0, 10) +
                                    " " +
                                    data[i].lastseen.substring(11, 19);
                                //if (currTime - timestamp <= 2 * 60 * 1000) status = "green";
                                let time_subtract = moment(currTime, "YYYY-MM-DD HH:mm:ss").diff(moment(lastseen, "YYYY-MM-DD HH:mm:ss"));
                                let time_differece = moment.duration(time_subtract);
                                let time = Math.floor(time_differece.asHours()) + moment.utc(time_subtract).format(":mm:ss");
                                let duration = moment(time, 'HH:mm:ss').hours() * 3600
                                    + moment(time, 'HH:mm:ss').minutes() * 60
                                    + moment(time, 'HH:mm:ss').seconds()
                                console.log("signalRepeaterHealth duration=======>", duration);
                                if (duration <= 2 * 60) status = "green";
                                else {
                                    status = "red";
                                    setSignal(datas => [...datas, data[i]]);
                                }
                            } else {
                                lastseen = "--:--:--";
                                status = "red";
                                setSignal(datas => [...datas, data[i]]);
                            }
                            ++value2;
                            setCount2(value2);
                            // console.log("signalRepeaterHealth ========>", value2, '====', data[i].macaddress,
                            //     '=====', lastseen, '====', status);
                        } else {
                            if (data[i].lastseen !== null) {
                                lastseen =
                                    data[i].lastseen.substring(0, 10) +
                                    " " +
                                    data[i].lastseen.substring(11, 19);

                                let time_subtract = moment(currTime, "YYYY-MM-DD HH:mm:ss").diff(moment(lastseen, "YYYY-MM-DD HH:mm:ss"));
                                let time_differece = moment.duration(time_subtract);
                                let time = Math.floor(time_differece.asHours()) + moment.utc(time_subtract).format(":mm:ss");
                                let duration = moment(time, 'HH:mm:ss').hours() * 3600
                                    + moment(time, 'HH:mm:ss').minutes() * 60
                                    + moment(time, 'HH:mm:ss').seconds()
                                console.log("SensorsHealth duration $$$$$$$$$ ===> ", duration);
                                if (duration <= 2 * 60) status = "green";
                                else {
                                    status = "red";
                                    setAssets(datas => [...datas, data[i]]);
                                }
                            } else {
                                lastseen = "--:--:--";
                                status = "red";
                                setAssets(datas => [...datas, data[i]]);
                            }
                            let battery = "-:-:-";
                            if (data[i].battery !== undefined) battery = data[i].battery;
                            ++value3;
                            setCount3(value3);
                            // console.log("SensorsHealth $$$$$$$$$ ===> ", value3, '====', data[i].macaddress, '=====',
                            //     data[i].type, '=====', battery, '====', lastseen, '====', status)
                        }
                    }
                    //console.log(count3,"$$$$$$$$$$$$", inact_count3);

                } else {
                    console.log("Asset(s) data is not found.");
                }

                // Displaying slave gateway health details in table format
                if (response.slave !== undefined) {
                    let slave = response.slave;
                    if (slave.length !== 0) {
                        for (let i = 0; i < slave.length; i++) {
                            if (slave[i].lastseen !== null) {
                                lastseen =
                                    slave[i].lastseen.substring(0, 10) +
                                    " " +
                                    slave[i].lastseen.substring(11, 19);
                                // if (currTime - timestamp <= 2 * 60 * 1000) status = "green";
                                let time_subtract = moment(currTime, "YYYY-MM-DD HH:mm:ss").diff(moment(lastseen, "YYYY-MM-DD HH:mm:ss"));
                                let time_differece = moment.duration(time_subtract);
                                let time = Math.floor(time_differece.asHours()) + moment.utc(time_subtract).format(":mm:ss");
                                let duration = moment(time, 'HH:mm:ss').hours() * 3600
                                    + moment(time, 'HH:mm:ss').minutes() * 60
                                    + moment(time, 'HH:mm:ss').seconds()
                                console.log("slaveHealth duration ********* ==>", duration);
                                if (duration <= 2 * 60) status = "green";
                                else {
                                    status = "red";
                                    setSlave(datas => [...datas, slave[i]]);
                                }
                            } else {
                                lastseen = "--:--:--";
                                status = "red";
                                setSlave(datas => [...datas, slave[i]]);
                            }
                            ++value4;
                            setCount4(value4);
                            //console.log("slaveHealth ********* ==>", value4 , '====' ,slave[i].macaddress, '====', lastseen, '=====', status);
                        }
                    } else {
                        console.log("Slave Gateway data is not found.");
                    }
                }

                // Displaying master gateway health details in table format
                if (response.master !== undefined) {
                    let master = response.master;
                    if (master.length !== 0) {
                        for (let i = 0; i < master.length; i++) {
                            if (master[i].lastseen !== null) {
                                lastseen =
                                    master[i].lastseen.substring(0, 10) +
                                    " " +
                                    master[i].lastseen.substring(11, 19);
                                //if (currTime - timestamp <= 2 * 60 * 1000) status = "green";
                                let time_subtract = moment(currTime, "YYYY-MM-DD HH:mm:ss").diff(moment(lastseen, "YYYY-MM-DD HH:mm:ss"));
                                let time_differece = moment.duration(time_subtract);
                                let time = Math.floor(time_differece.asHours()) + moment.utc(time_subtract).format(":mm:ss");
                                let duration = moment(time, 'HH:mm:ss').hours() * 3600
                                    + moment(time, 'HH:mm:ss').minutes() * 60
                                    + moment(time, 'HH:mm:ss').seconds()
                                console.log("gatewayHealth duration @@@@@@@@@ ===> ", duration);
                                if (duration <= 2 * 60) status = "green";
                                else {
                                    status = "red";
                                    setMaster(datas => [...datas, master[i]]);
                                }
                            } else {
                                lastseen = "--:--:--";
                                status = "red";
                                setMaster(datas => [...datas, master[i]]);
                            }
                            ++value5;
                            setCount5(value5);
                            //console.log("gatewayHealth  @@@@@@@@@ ===> ", value5, '====', master[i].macaddress, '====', lastseen, '=====', status);
                        }
                    } else {
                        console.log("Master Gateway data is not found.");
                    }
                }
            }
            else {
                console.log("Unable to fetch the asset health details.");
            }
        }
        catch {
            console.log("Request Failed with status code ");
        }

        console.log('>>>>>>>>>>>>==============>>>>>>>>>>>>>>>>');

        setLoading(true);
    }

    const systemHealthJson = (type) => {
        if(type === 'master' ){
            console.log('%%%%%%%%%%%%%%', master);
            navigation.navigate('SystemHealth', { jsondata: master, header: "Master Gateway" })
        }
        else if(type === 'slave'){
            console.log('%%%%%%%%%%%%%%', slave);
            navigation.navigate('SystemHealth', { jsondata: slave, header: "Slave Gateway" })
        }
        else if (type === 'assets'){
            console.log('%%%%%%%%%%%%%%', assets);
            navigation.navigate('SystemHealth', { jsondata: assets, header: "Assets" })
        }
        else if (type === 'signal') {
            console.log('%%%%%%%%%%%%%%', signal);
            navigation.navigate('SystemHealth', { jsondata: signal, header: "Signal Repeater" })
        }
        else if (type === 'sensors') {
            console.log('%%%%%%%%%%%%%%', );
            navigation.navigate('SystemHealth', { jsondata: systemHealth, header: "Sensors" })
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
                <Text style={styles.header_text}>System Health</Text>
                <Text style={styles.header_underline} />
            </View>

            <ScrollView>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ margin: 10 }}>
                            <Text style={styles.chartHeader}>Master Gateway</Text>
                            <TouchableOpacity onPress={() => systemHealthJson('master')} disabled={master.length > 0 ? false : true }>
                                <Pie
                                    radius={80}
                                    innerRadius={60}
                                    sections={[
                                        {
                                            percentage: count5 > 0 ? (master.length / count5) * 100 : 0,
                                            color: '#FF6666',
                                        },
                                        {
                                            percentage: count5 > 0 ? ((count5 - master.length) / count5) * 100 : 0,
                                            color: '#44CD40',
                                        },
                                    ]}
                                    dividerSize={0}
                                    strokeCap={'butt'}
                                />
                                <View style={styles.gauge}>
                                    <Text style={styles.gaugeText}>{count5 - master.length} / {count5}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ margin: 10 }}>
                            <Text style={styles.chartHeader}>Slave Gateway</Text>
                            <TouchableOpacity onPress={() => systemHealthJson('slave')} disabled={slave.length > 0 ? false : true}>
                                <Pie
                                    radius={80}
                                    innerRadius={60}
                                    sections={[
                                        {
                                            percentage: count4 > 0 ? (slave.length / count4) * 100 : 0,
                                            color: '#FF6666',
                                        },
                                        {
                                            percentage: count4 > 0 ? ((count4 - slave.length) / count4) * 100 : 0,
                                            color: '#44CD40',
                                        },
                                    ]}
                                    dividerSize={0}
                                    strokeCap={'butt'}
                                />
                                <View style={styles.gauge}>
                                    <Text style={styles.gaugeText}>{count4 - slave.length} / {count4}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ margin: 10 }}>
                            <Text style={styles.chartHeader}>Assets</Text>
                            <TouchableOpacity onPress={() => systemHealthJson('assets')} disabled={assets.length > 0 ? false : true}>
                                <Pie
                                    radius={80}
                                    innerRadius={60}
                                    sections={[
                                        {
                                            percentage: count3 > 0 ? (assets.length / count3) * 100 : 0,
                                            color: '#FF6666',
                                        },
                                        {
                                            percentage: count3 > 0 ? ((count3 - assets.length) / count3) * 100 : 0,
                                            color: '#44CD40',
                                        },
                                    ]}
                                    dividerSize={0}
                                    strokeCap={'butt'}
                                />
                                <View style={styles.gauge}>
                                    <Text style={styles.gaugeText}>{count3 - assets.length} / {count3}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ margin: 10 }}>
                                <Text style={styles.chartHeader}>Signal Repeater</Text>
                                <TouchableOpacity onPress={() => systemHealthJson('signal')} disabled={signal.length > 0 ? false : true}>
                                    <Pie
                                        radius={80}
                                        innerRadius={60}
                                        sections={[
                                            {
                                                percentage: count2 > 0 ? (signal.length / count2) * 100 : 0,
                                                color: '#FF6666',
                                            },
                                            {
                                                percentage: count2 > 0 ? ((count2 - signal.length) / count2) * 100 : 0,
                                                color: '#44CD40',
                                            },
                                        ]}
                                        dividerSize={0}
                                        strokeCap={'butt'}
                                    />
                                    <View style={styles.gauge}>
                                        <Text style={styles.gaugeText}>{count2 - signal.length} / {count2}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={{ margin: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', margin: 10, marginLeft: 40 }}>Sensors</Text>
                        <TouchableOpacity onPress={() => systemHealthJson('sensors')} disabled={systemHealth.length > 0 ? false : true}>
                            <Pie
                                radius={80}
                                innerRadius={60}
                                sections={[
                                    {
                                        percentage: count1 > 0 ? (systemHealth.length / count1) * 100 : 0,
                                        color: '#FF6666',
                                    },
                                    {
                                        percentage: count1 > 0 ? ((count1 - systemHealth.length) / count1) * 100 : 0,
                                        color: '#44CD40',
                                    },
                                ]}
                                dividerSize={0}
                                strokeCap={'butt'}
                            />
                            <View style={styles.gauge}>
                                <Text style={styles.gaugeText}>{count1 - systemHealth.length} / {count1}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </>
    )
};

export default PieChart;


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
    chartHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
    },
    gauge: {
        position: 'absolute',
        width: 100,
        height: 160,
        alignItems: 'center',
        justifyContent: 'center',
        left: 33,
    },
    gaugeText: {
        backgroundColor: 'transparent',
        color: '#03203C',
        fontSize: 16,
        fontWeight: 'bold',
    },
})

{/* <View
    style={{
        paddingVertical: 15,
        width: 350,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }}>
    <View style={{ width: 175, alignItems: 'center' }}>
        <Pie
            radius={80}
            innerRadius={75}
            sections={[
                {
                    percentage: 100,
                    color: '#f00',
                },
            ]}
            backgroundColor="green"
        />
        <View style={styles.gauge}>
            <Text style={styles.gaugeText}>60%</Text>
        </View>
    </View>
</View> */}


// <View>
//     <Text>Sathish</Text>
//     <Text> {inact_count1}    {inact_count2}   {inact_count3}   {inact_count4}   {inact_count5}</Text>
//     {/* <Icon name="radio-btn-active" type="Fontisto" style={{
//         alignSelf: 'center',
//         marginTop: 10,
//         fontSize: 30,
//         color: '#00AC61'
//     }} />
//     <Icon name="radio-btn-active" type="Fontisto" style={{
//         alignSelf: 'center',
//         marginTop: 10,
//         fontSize: 30,
//         color: '#FF6666'
//     }} /> */}

// </View>