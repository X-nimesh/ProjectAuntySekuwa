import React, { useEffect, useState } from 'react'
import { Button, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import OrderItem from '../components/CreateOrder/OrderItem';
import TitleBar from '../components/TitleBar';
// import data from '../FoodItems.json';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FetchMenu from '../utils/FetchMenu';

const AddItems = ({ navigation, route }) => {

    // useFocusEffect(
    //     React.useCallback(() => {
    //         getMenu();
    //     }, [])
    // );

    const { id } = route.params;
    let date = new Date();
    let today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const [orderitems, setorderitems] = useState([{ id: 1, quantity: 0 }])
    const [prevNewItems, setprevNewItems] = useState([])
    const [totalPrice, settotalPrice] = useState(0);
    const [prevTotalP, setprevTotalP] = useState(0);
    const [prvOrders, setprvOrders] = useState();
    const [prevAll, setprevAll] = useState();
    const [indexOrder, setindexOrder] = useState();
    const [data, setdata] = useState([])

    const getMenu = async () => {
        let items = JSON.parse(await AsyncStorage.getItem(`menu`)) || [];
        setdata(items);
        let price = orderitems.reduce((total, item) => {
            let menuItem = items.find((ite) => ite.id === item.id)
            // return total + item.quantity * data[item.id - 1].Price
            return total + item.quantity * menuItem?.Price
        }, 0)
        settotalPrice(price)
    }
    useEffect(() => {
        let price = orderitems.reduce((total, item) => {
            let menuItem = data.find((ite) => ite.id === item.id)
            // return total + item.quantity * data[item.id - 1].Price
            return total + item.quantity * menuItem?.Price
        }, 0)
        console.log(price)
        settotalPrice(price)
        console.log(totalPrice)
    }, [orderitems])

    const getorder = async () => {
        let Orders = await AsyncStorage.getItem(`orders ${today}`);
        Orders = JSON.parse(Orders)
        setprevAll(Orders);
        let filtered = Orders.orders?.find((order) => order.token === id);
        let indexofOrder = Orders.orders?.findIndex((order) => order.token === id);
        setindexOrder(indexofOrder);

        console.log(filtered)
        // setprevNewItems(Orders.orders[indexofOrder].newItems);
        setprvOrders(filtered);
    }

    useFocusEffect(
        React.useCallback(() => {
            getorder();
            getMenu();
        }, [])
    );
    const addProduct = async () => {
        let FilteredItems = orderitems.filter((item) => item.quantity > 0)
        if (FilteredItems.length === 0) {
            return alert('No Items Selected')
        }
        console.log("id: " + id)
        // let Orders = JSON.parse(await AsyncStorage.getItem(`orders ${today}`)) || {};
        let order = { ...prvOrders };
        order.newItems?.filter((item) => {
            let index = FilteredItems.findIndex((ite) => ite.id === item.id);
            if (index !== -1) {
                item.quantity = item.quantity + FilteredItems[index].quantity;
                FilteredItems.splice(index, 1);
            }
        })
        if (order.newItems) {

            order.newItems = [...order.newItems, ...FilteredItems];
        }
        else {
            console.log(order.newItems)
            order.newItems = [...FilteredItems];
        }
        order.total_price = order.total_price + totalPrice;
        order.status = "Pending"
        console.log(order);
        let prevAllOrder = { ...prevAll };
        // console.log(order);
        // console.log(indexOrder)
        prevAllOrder.orders[indexOrder] = order;

        // let newOrder=[...prevAll.orders,order]
        // let newAll = { ...prevAll, orders: [...prevAll.orders, order] }
        // console.log(prevAllOrder.orders)
        await AsyncStorage.setItem(`orders ${today}`, JSON.stringify(prevAllOrder));
        navigation.navigate('Home');
    }
    console.log(prevNewItems);
    return (
        <ScrollView style={styles.container}>
            <TitleBar title={`Add Item in order: ${id} `} />
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
            <View style={{ width: '100%', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 25 }}>Name: {prvOrders?.name?.toUpperCase()}</Text>
                <Text style={{ fontSize: 30, fontWeight: '700' }}>Additional price: {` Rs. ${totalPrice} /-`}</Text>
            </View>
            <View style={styles.orderButtonContainer}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Total Price :
                    <Text style={{ color: 'green' }}>
                        {` Rs. ${totalPrice + prvOrders?.total_price} /-`}
                    </Text>
                </Text>
                <Pressable
                    onPress={() => addProduct()}
                    style={({ pressed }) => [{ backgroundColor: pressed ? 'lime' : 'green', }, styles.button]}>
                    <Text style={{ color: 'white', fontWeight: '800', fontSize: 20 }}>
                        Add Item
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
        marginTop: 20,
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
        paddingVertical: 20,
        width: '40%',
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
export default AddItems
