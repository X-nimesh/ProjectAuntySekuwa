import React, { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import TitleBar from '../components/TitleBar'
import { todayDate } from '../utils/todayDate'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderPage = () => {
    const [completedOrders, setcompletedOrders] = useState()
    let today = todayDate();
    console.log(today)
    const getOrders = async () => {
        let rawOrders = JSON.parse(await AsyncStorage.getItem(`orders ${today}`)) || {};
        let completeOrders = rawOrders?.orders?.filter((item) => item.status === 'Completed');
        console.log(completeOrders);
        setcompletedOrders(completeOrders);
    }
    useFocusEffect(
        React.useCallback(() => {
            getOrders();
        }, [])
    );
    return (
        <View style={styles.container}>
            <TitleBar title="Orders" />
            <ScrollView >
                <View style={styles.ordersContainer}>
                    {completedOrders?.map((order, key) => {
                        console.log(order)
                        return (
                            <Pressable key={key} style={styles.order}>
                                <Text>{order.token}</Text>
                                <Text>{order.status}</Text>
                            </Pressable>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: '5%',
        width: '100%',
        minHeight: '100%',
    },
    ordersContainer: {
        width: '100%',

        padding: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    order: {
        backgroundColor: 'white',
        width: '50%',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        elevation: 5,

    },
})
export default OrderPage
