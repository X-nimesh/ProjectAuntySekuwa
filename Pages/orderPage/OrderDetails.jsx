import React, { useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, Touchable, View } from 'react-native'
import TitleBar from '../../components/TitleBar';
import { DataTable, RadioButton } from 'react-native-paper';
import FetchMenu from '../../utils/FetchMenu';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import data from '../../FoodItems.json';
import { useFocusEffect } from '@react-navigation/native';
import { todayDate } from '../../utils/todayDate';

const OrderDetails = ({ navigation, route }) => {
    let today = todayDate();
    const [data, setdata] = useState([])
    const [payment, setpayment] = useState([])
    const getMenu = async () => {
        let items = JSON.parse(await AsyncStorage.getItem(`menu`)) || [];
        setdata(items);
    }

    const getPayments = async () => {
        let payments = JSON.parse(await AsyncStorage.getItem(`payments`)) || [];
        setpayment(payments);
    }
    useFocusEffect(
        React.useCallback(() => {
            getPayments();
            getMenu();
        }, [])
    );
    const { order } = route.params;
    console.log(order)

    const statusChange = async () => {
        let orders = JSON.parse(await AsyncStorage.getItem(`orders ${today}`)) || [];
        let sales = JSON.parse(await AsyncStorage.getItem(`sales ${today}`)) || [];
        let index = orders.orders.findIndex((item) => item.token === order.token);
        sales.push(orders.orders[index]);
        orders.orders.splice(index, 1);

        await AsyncStorage.setItem(`sales ${today}`, JSON.stringify(sales));
        await AsyncStorage.setItem(`orders ${today}`, JSON.stringify(orders));
        navigation.navigate('Orders');
    }
    return (
        <ScrollView style={{ backgroundColor: 'white', minHeight: '100%' }}>
            <View style={styles.container}>
                <TitleBar title="Order Details" />
                <View style={styles.billContainer}>
                    <Text style={{ fontSize: 35, fontWeight: '600' }}>Token: {order.token}</Text>
                    <Text style={{ fontSize: 20 }}>Name: {order.name?.toUpperCase()}</Text>
                    <View style={{ justifyContent: 'space-between' }}>

                    </View>
                    <View>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title><Text style={styles.heading}>Item</Text></DataTable.Title>
                                <DataTable.Title numeric><Text style={styles.heading}>Qty</Text></DataTable.Title>
                                <DataTable.Title numeric><Text style={styles.heading}>Rate</Text></DataTable.Title>
                                <DataTable.Title numeric><Text style={styles.heading}>Amount</Text></DataTable.Title>
                            </DataTable.Header>
                            {order.items.map((item, key) => {
                                let foodItem = { ...item }
                                // let totalP = 0;
                                data.filter((food) => {
                                    if (food.id === foodItem.id) {
                                        foodItem.name = food.Name;
                                        foodItem.price = food.Price;
                                        foodItem.amount = foodItem.quantity * foodItem.price;
                                    }
                                })
                                // settotal(total + totalP);
                                return (
                                    <DataTable.Row key={key} style={{ borderBottomWidth: 0 }}>
                                        <View style={{ alignSelf: 'center', width: '25%' }}><Text style={styles.items}>{foodItem.name}</Text></View>
                                        <DataTable.Cell numeric textStyle={styles.items}>{foodItem.quantity}</DataTable.Cell>
                                        <DataTable.Cell numeric textStyle={styles.items}>{foodItem.price}</DataTable.Cell>
                                        <DataTable.Cell numeric textStyle={styles.items}>{foodItem.amount}</DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })}
                            {order.newItems && (
                                <View
                                    style={{
                                        borderBottomColor: 'black',
                                        borderWidth: 1,
                                        width: "100%",
                                        height: 2,
                                    }}
                                />)}
                            {order.newItems && order.newItems.map((item, key) => {
                                console.log("new");
                                // let TotalP = 0
                                let foodItem = { ...item }
                                data.filter((food) => {
                                    if (food.id === foodItem.id) {
                                        foodItem.name = food.Name;
                                        foodItem.price = food.Price;
                                        foodItem.amount = foodItem.quantity * foodItem.price;
                                    }
                                })
                                // settotal(total + TotalP)
                                return (
                                    <DataTable.Row key={key} style={{ borderBottomWidth: 0 }}>
                                        <View style={{ alignSelf: 'center', width: '25%' }}><Text style={styles.items}>{foodItem.name}</Text></View>
                                        <DataTable.Cell numeric textStyle={styles.items}>{foodItem.quantity}</DataTable.Cell>
                                        <DataTable.Cell numeric textStyle={styles.items}>{foodItem.price}</DataTable.Cell>
                                        <DataTable.Cell numeric textStyle={styles.items}>{foodItem.amount}</DataTable.Cell>
                                    </DataTable.Row>
                                )
                            }
                            )}
                            <DataTable.Row>
                                <DataTable.Cell textStyle={{ fontSize: 25, color: 'green', fontWeight: '700' }}>Total</DataTable.Cell>
                                <DataTable.Cell numeric textStyle={{ fontSize: 25, color: 'green', fontWeight: '700' }}>{order.total_price}</DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>

                    </View>
                </View>
                <View style={styles.paymentConatiner}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Payment Details</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, flexWrap: "wrap", width: "100%" }}>
                        {payment?.map((item, key) => {
                            console.log(item);
                            return (
                                <View key={key} style={{ flexDirection: 'column', alignItems: 'center', width: "50%" }}>
                                    <Text>{item.name}</Text>
                                    {/* <Image source={{ uri: item.image }} style={{ width: 300, height: 400, marginLeft: 10 }} /> */}
                                    <Image source={{ uri: item.image }} style={{ width: 300, height: 400 }} />
                                </View>
                            )
                        })
                        }
                    </View>
                </View>
                <Pressable
                    onPress={() => statusChange()}
                    style={{ width: "40%", alignItems: "center", alignSelf: "center", backgroundColor: "green", paddingHorizontal: 30, paddingVertical: 10, borderRadius: 20 }}>

                    <Text style={{ color: "white", fontWeight: "700", fontSize: 25 }}> Paid</Text>

                </Pressable>
            </View >
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: '5%',
        width: '100%',
        minHeight: '100%',
        marginBottom: 20,
    },
    billContainer: {
        marginTop: 20,
        width: '100%',
        padding: 30,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
    },
    paymentConatiner: {
        marginTop: 20,
        width: '100%',
        padding: 30,
        justifyContent: 'space-between',

    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#CC9C00',
    },
    items: {
        fontSize: 18,
    }

});
export default OrderDetails
