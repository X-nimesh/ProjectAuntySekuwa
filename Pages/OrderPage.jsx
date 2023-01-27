import React, { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import TitleBar from '../components/TitleBar'
import { todayDate } from '../utils/todayDate'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderPage = ({ navigation }) => {
    const [completedOrders, setcompletedOrders] = useState()
    let today = todayDate();

    const getOrders = async () => {
        let rawOrders = JSON.parse(await AsyncStorage.getItem(`orders ${today}`)) || {};
        let orders = rawOrders?.orders || [];
        let completeOrders = rawOrders?.orders?.filter((item) => item.status === 'Completed');
        // console.log(completeOrders);
        setcompletedOrders(completeOrders);
    }

    useFocusEffect(
        React.useCallback(() => {

            getOrders();
        }, [])
    );
    const orderDetail = (order) => {
        navigation.navigate('OrderDetail', { order })
    }
    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={styles.container}>
                <TitleBar title="Orders" />
                <ScrollView >
                    <View style={styles.ordersContainer}>
                        {completedOrders?.map((order, key) => {
                            console.log(order)
                            return (
                                <Pressable key={key} style={styles.order} onPress={() => orderDetail(order)}>
                                    <Text style={{ fontSize: 35, fontWeight: '600' }}>{order.token}</Text>
                                    <Text style={{ fontSize: 20 }}>Name: {order.name?.toUpperCase()}</Text>
                                    <Text style={{ fontSize: 20, fontWeight: '600' }}>Rs. {order.total_price}/-</Text>
                                    {/* <Text>Status:{order.status}</Text> */}
                                </Pressable>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
        </ScrollView>
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
        backgroundColor: '#ccffff',
        alignItems: 'center',
        width: '45%',
        padding: 20,
        marginVertical: 5,
        elevation: 5,
        borderRadius: 25,
        marginHorizontal: 20,
    },
})
export default OrderPage
