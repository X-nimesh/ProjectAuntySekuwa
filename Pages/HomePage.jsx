import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import Order from '../components/pendingOrder/Order';
import TitleBar from '../components/TitleBar';
import { useFocusEffect } from '@react-navigation/native';
import { todayDate } from '../utils/todayDate';
const HomePage = ({ navigation }) => {
    // let date = new Date();
    // let today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    let today = todayDate();
    const [data, setdata] = useState([])
    const getMenu = async () => {
        let items = JSON.parse(await AsyncStorage.getItem(`menu`)) || [];
        setdata(items);
    }
    useFocusEffect(
        React.useCallback(() => {
            getMenu();
        }, [])
    );
    let prevOrders = {};
    const [orders, setorders] = useState([])
    const [allOrders, setallOrders] = useState()
    const getPrevorders = async () => {
        // await AsyncStorage.removeItem(`orders ${today}`);
        let rawOrders = JSON.parse(await AsyncStorage.getItem(`orders ${today}`)) || {};
        console.log(rawOrders);
        let filtered = rawOrders?.orders?.filter((item) => item.status === 'Pending');
        setorders(filtered);
    }
    useFocusEffect(
        React.useCallback(() => {
            getPrevorders();
        }, [allOrders])
    );
    const addItems = (id) => {
        navigation.navigate('AddItem', { id: id });
    }
    const completeOrder = async (token) => {
        let allOrder = JSON.parse(await AsyncStorage.getItem(`orders ${today}`)) || {};
        let index = allOrder.orders?.findIndex((order) => order.token === token);
        allOrder.orders[index].status = 'Completed';
        setallOrders(allOrder);
        await AsyncStorage.setItem(`orders ${today}`, JSON.stringify(allOrder));
        // AsyncStorage.setItem(`orders ${today}`, JSON.stringify({ date: today, orders: orders }));
    }
    return (
        <View style={styles.container}>
            <TitleBar title="Pending Orders" />
            <View style={{ width: '100%', alignItems: "flex-end" }}>
                <Pressable
                    style={{ width: '20%', backgroundColor: "#CC9C00", borderRadius: 30 }}
                    onPress={() => navigation.navigate('CreateOrder')} >
                    <Text style={{ textAlign: 'center', paddingVertical: 10, color: 'white', fontWeight: 'bold' }}>Add Order</Text>
                </Pressable>
            </View>
            <View style={styles.ItemsContainer}>
                {orders?.map((order, key) => {
                    return (
                        <Order data={data} order={order} key={key} addItem={addItems} complete={completeOrder} />
                    )
                })
                }
            </View>
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: '5%',
        width: '100%',
        minHeight: '100%',

    },
    ItemsContainer: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },


});
export default HomePage
