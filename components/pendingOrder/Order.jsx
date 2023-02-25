import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment/moment';
import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import FetchMenu from '../../utils/FetchMenu';
// import data from '../../FoodItems.json';
import { useFocusEffect } from '@react-navigation/native';
import { todayDate } from '../../utils/todayDate';


const Order = ({ order, addItem, complete, data, setrefresh }) => {
    const today = todayDate();
    const [newItems, setnewItems] = useState(false);
    let orderTime = moment(order.time).format('hh:mm A');
    const deleteOrder = async (token) => {
        let allOrder = JSON.parse(await AsyncStorage.getItem(`orders ${today}`)) || {};
        let index = allOrder.orders?.findIndex((order) => order.token === token);
        allOrder.orders.splice(index, 1);
        await AsyncStorage.setItem(`orders ${today}`, JSON.stringify(allOrder));
        setrefresh(true);
    }
    const DeleteOrderAlert = async (token) => {
        Alert.alert('Delete Order', `Do you want to delete this order iwtjh token ${token} `, [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'yes', onPress: () => {
                    deleteOrder(token);
                }
            },
        ]);

    }
    return (
        <Pressable style={[styles.Item, (order.newItems) && styles.newItem]}>
            <View style={{
                flexDirection: 'row', alignItems: "flex-start", justifyContent: 'space-between',
                height: 140
            }}>
                <View style={{ flex: 2, alignItems: "center", justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 40, fontWeight: '700' }}>{order.token}</Text>
                    <Text style={styles.time}>{`${orderTime} `}</Text>
                    <Text style={{ fontSize: 20, fontWeight: '900', color: "green" }}>{`Rs ${order.total_price} `}</Text>
                </View>
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderWidth: 1,
                        width: 2,
                        height: "90%",
                    }}
                />
                <ScrollView style={{ marginLeft: 10, maxHeight: "93%" }}>
                    <View>

                        {
                            order.items.map((item, key) => {
                                let dataItem = data.find((dataItem) => dataItem.id === item.id);
                                return (
                                    <View key={key} style={styles.foodItem}>
                                        <Text style={{ fontSize: 15, fontWeight: '500' }}>{dataItem?.Name}</Text>
                                        <Text style={{ fontSize: 15, fontWeight: '500' }}>{item?.quantity} </Text>


                                    </View>
                                )
                            })
                        }
                        {
                            (order.newItems) && (
                                <View
                                    style={{
                                        borderBottomColor: 'black',
                                        borderWidth: 1,
                                        width: "100%",
                                        height: 2,
                                    }}
                                />
                            )
                        }
                        {
                            (order.newItems) ?
                                (order.newItems?.map((item, key) => {
                                    let dataItem = data.find((dataItem) => dataItem.id === item.id);
                                    return (
                                        <View key={key} style={styles.foodItem}>
                                            <Text style={{ fontSize: 15, fontWeight: '500' }}>{dataItem?.Name}</Text>
                                            <Text style={{ fontSize: 15, fontWeight: '500' }}>{item.quantity} </Text>
                                        </View>
                                    )
                                })) : null
                        }
                    </View>
                </ScrollView>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={() => addItem(order.token)}>
                    <Text style={{ color: 'white', fontWeight: '500' }}>Add Items</Text>
                </Pressable>
                <Pressable style={[styles.button, { backgroundColor: 'black' }]} onPress={() => complete(order.token)}>
                    <Text style={{ color: 'white', fontWeight: '500' }}>Complete</Text>
                </Pressable>
                <Pressable style={[styles.button, { backgroundColor: 'red' }]} onPress={() => {
                    DeleteOrderAlert(order.token)
                }}>
                    <Text style={{ color: 'white', fontWeight: '500' }}>Cancel</Text>
                </Pressable>
            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    token: {
        fontWeight: "500",
        fontSize: 20,
    },
    time: {
        fontWeight: "500",
        fontSize: 15,
        marginVertical: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'green',
        color: 'white',
        paddingHorizontal: 10,
        borderRadius: 30,
        paddingVertical: 5,
        alignItems: 'center',

    },
    Item: {
        minWidth: 550,
        height: 200,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        padding: 10,
        paddingTop: 15,
        marginBottom: 20,
        justifyContent: 'space-between',
        elevation: 20,
    },
    newItem: {
        backgroundColor: '#d6f6ff',
    },
    foodItem: {
        flexDirection: 'row',
        alignItems: "center", justifyContent: 'space-between'
    },
}
)
export default Order
