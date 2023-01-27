import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import TitleBar from '../components/TitleBar'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTable } from 'react-native-paper';

const Settings = ({ navigation }) => {
    const [payments, setpayments] = useState([])
    const getPayments = async () => {
        let pay = JSON.parse(await AsyncStorage.getItem(`payments`)) || [];
        console.log(pay)
        setpayments(pay);
    }
    useFocusEffect(
        React.useCallback(() => {
            getPayments();
        }, [])
    );
    return (
        <ScrollView style={{ backgroundColor: "white" }}>
            <View style={styles.container}>
                <TitleBar title="Settings" />
                <View style={styles.settings}>
                    <View style={styles.paymentTitle}>
                        <Text style={{ fontSize: 20 }}>Payment Settings</Text>
                        <Pressable
                            onPress={() => navigation.navigate('EditPayment')}
                            style={{ backgroundColor: '#CC9C00', padding: 10, borderRadius: 20, paddingHorizontal: 30 }}>
                            <Text style={{ fontSize: 20, color: "white", fontWeight: "600" }}>Add payments</Text>
                        </Pressable>
                    </View>
                    <View style={{ flexDirection: 'column', width: "100%", marginTop: 30 }}>
                        <DataTable>
                            <DataTable.Header style={{ borderBottomWidth: 0 }}>
                                <DataTable.Title textStyle={{ fontSize: 23, color: "black", fontWeight: "700" }}>Payment Name</DataTable.Title>
                                <DataTable.Title textStyle={{ fontSize: 23, color: "black", fontWeight: "700" }}>Payment Details</DataTable.Title>
                                {/* <DataTable.Title numeric ><Text style={styles.title}> price</Text></DataTable.Title> */}
                                {/* <DataTable.Title numeric><Text style={styles.title}> per plate</Text></DataTable.Title> */}
                            </DataTable.Header>
                            {payments.map((payment, key) => {
                                return (
                                    <DataTable.Row style={{ borderBottomWidth: 0 }} key={key}>
                                        <DataTable.Cell ><Text style={styles.title}>{payment.name}</Text></DataTable.Cell>
                                        <DataTable.Cell ><Text style={styles.title}>{payment.details}</Text></DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })
                            }
                        </DataTable>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 20,
        paddingHorizontal: '3%',
    },
    settings: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: '5%',
        paddingVertical: '3%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    paymentTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    }
})

export default Settings
