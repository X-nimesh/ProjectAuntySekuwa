import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import Order from '../components/pendingOrder/Order';
import TitleBar from '../components/TitleBar';
import { useFocusEffect } from '@react-navigation/native';
import { todayDate } from '../utils/todayDate';
const HomePage = ({ navigation }) => {
    // let date = new Date();
    // let today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    let today = todayDate();

    let prevOrders = {};
    const [orders, setorders] = useState([])
    const [allOrders, setallOrders] = useState()
    const getPrevorders = async () => {
        // await AsyncStorage.removeItem(`orders ${today}`);
        let rawOrders = JSON.parse(await AsyncStorage.getItem(`orders ${today}`)) || {};
        console.log(rawOrders)
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
        console.log(allOrder);
        setallOrders(allOrder);
        await AsyncStorage.setItem(`orders ${today}`, JSON.stringify(allOrder));
        // AsyncStorage.setItem(`orders ${today}`, JSON.stringify({ date: today, orders: orders }));
    }
    console.log(orders);
    return (
        <View style={styles.container}>
            <TitleBar title="Pending Orders" />
            <View style={styles.ItemsContainer}>
                {orders?.map((order, key) => {
                    return (
                        <Order order={order} key={key} addItem={addItems} complete={completeOrder} />
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
