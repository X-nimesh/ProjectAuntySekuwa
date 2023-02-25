import React, { useEffect, useState } from 'react'
import { Button, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import data from '../DataFiles/FoodItems.json';
import OrderItem from "../components/CreateOrder/OrderItem";
import TitleBar from '../components/TitleBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FetchMenu from '../utils/FetchMenu';
const CreateOrder = ({ navigation }) => {

    const [orderitems, setorderitems] = useState([{ id: 1, quantity: 0 }])
    const [totalPrice, settotalPrice] = useState(0);
    const [token, settoken] = useState(0)
    const [name, setname] = useState();
    const [phone, setphone] = useState();
    useEffect(() => {
        let price = orderitems.reduce((total, item) => {
            let menuItem = data.find((ite) => ite.id === item.id)
            // return total + item.quantity * data[item.id - 1].Price
            return total + item.quantity * menuItem.Price
        }, 0)
        settotalPrice(price)
        console.log(totalPrice)
    }, [orderitems])


    const CreateOrder = async () => {
        token ? console.log('token') : alert('Enter Token Number')

        if (!token) {
            return alert('Enter Token Number')
        }
        let date = new Date();
        let today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        let prevOrders = JSON.parse(await AsyncStorage.getItem(`orders ${today}`)) || {};
        let duplicate = prevOrders?.orders?.find((order) => order.token === token && order.status === 'Pending')
        if (duplicate) {
            return alert('Order Already Placed for this token number: ' + token)
        }
        if (Object.keys(prevOrders).length === 0) {
            console.log('empty')
            prevOrders = {
                date: today,
                orders: []
            }
        }
        let FilteredItems = orderitems.filter((item) => item.quantity > 0)
        if (FilteredItems.length === 0) {
            return alert('No Items Selected')
        }


        let neworder = {

            token: token,
            name: name,
            phone: phone,
            date: today,
            total_price: totalPrice,
            status: 'Pending',
            time: date.getTime(),
            items: FilteredItems
        }
        prevOrders.orders.push(neworder);
        await AsyncStorage.setItem(`orders ${today}`, JSON.stringify(prevOrders));
        alert('Order Placed');
        setorderitems([{ id: 1, quantity: 0 }]);
        setname('');
        setphone('');
        settoken(0);
        navigation.navigate('Home')

    }
    return (
        <ScrollView style={styles.container}>
            <TitleBar title={'New Order'} />
            <View style={styles.ItemsContainer}>
                {data.map((item, key) => {

                    return (
                        <View key={key} style={styles.item}>
                            <OrderItem orderItems={orderitems} setorderitems={setorderitems} menuItem={item} />
                        </View>
                    )
                })
                }
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, fontWeight: "600" }}>
                        Name:
                    </Text>
                    <TextInput
                        style={[styles.input, { width: '40%' }]}
                        onChangeText={(text) => setname(text)}
                        value={name}
                        placeholder="Customer Name"
                    />

                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20, width: '40%' }}>
                    <Text style={{ fontSize: 15, fontWeight: "600" }}>
                        Phone:
                    </Text>
                    <TextInput
                        style={[styles.input, { width: '100%' }]}
                        onChangeText={(text) => setphone(text)}
                        value={phone}
                        placeholder="Customer Phone"
                        keyboardType="numeric"
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20, width: '32%' }}>
                    <Text style={{ fontSize: 15, fontWeight: "600" }}>
                        Token Number:
                    </Text>
                    <TextInput
                        style={[styles.input, { width: '100%' }]}
                        onChangeText={(text) => settoken(parseInt(text))}

                        value={token}
                        placeholder="Token Number"
                        keyboardType="numeric"
                    />
                </View>
            </View>
            <View style={styles.orderButtonContainer}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Total Price :
                    <Text style={{ color: 'green' }}>
                        {` Rs. ${totalPrice} /-`}
                    </Text>
                </Text>
                <Pressable
                    onPress={CreateOrder}
                    style={({ pressed }) => [{ backgroundColor: pressed ? 'lime' : 'green', }, styles.button]}>
                    <Text style={{ color: 'white', fontWeight: '800', fontSize: 15 }}>
                        Place Order
                    </Text>
                </Pressable>

            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: '3%',
        backgroundColor: 'white',

    },
    ItemsContainer: {
        paddingHorizontal: '2%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
        // marginHorizontal: '1%'
    },
    orderButtonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginVertical: '1%',
        marginHorizontal: '1%',
    },
    button: {
        // backgroundColor: 'green',
        color: 'white',
        paddingHorizontal: 30,
        borderRadius: 30,
        paddingVertical: 5,
        // width: '40%',
        alignItems: 'center',

    },
    tokenContainer: {
        flexDirection: 'row', alignItems: 'center', marginRight: 20, width: '40%'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 2,
        padding: 10,
        width: '60%',
        borderRadius: 10,
    },
    item: {
        padding: 20,
        width: '45%',
        borderRadius: 20,
        backgroundColor: 'white',
        elevation: 10,
        marginBottom: 20

    }

});
export default CreateOrder
