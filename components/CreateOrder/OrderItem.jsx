import React from 'react'
import { View, Image, Text, StyleSheet, TouchableHighlight, Pressable } from 'react-native'
import Icons from "react-native-vector-icons/FontAwesome";
const OrderItem = ({ menuItem, orderItems, setorderitems }) => {
    const itemIndex = orderItems.findIndex((item) => item.id === menuItem.id);
    const addQuantity = () => {
        const newOrderItems = [...orderItems];
        const index = newOrderItems.findIndex((item) => item.id === menuItem.id);
        if (index === -1) {
            newOrderItems.push({ id: menuItem.id, quantity: 1 });
        } else {
            newOrderItems[index].quantity += 1;
        }
        console.log(newOrderItems);
        setorderitems(newOrderItems);
    }
    const removeQuantity = () => {
        const newOrderItems = [...orderItems];
        const index = newOrderItems.findIndex((item) => item.id === menuItem.id);
        if (index === -1) {
            newOrderItems.push({ id: menuItem.id, quantity: 0 });
        } else {
            newOrderItems[index].quantity < 1 ? newOrderItems[index].quantity = 0 :
                newOrderItems[index].quantity -= 1;
        }
        console.log(newOrderItems);
        setorderitems(newOrderItems);
    }
    return (
        <View style={styles.container}>
            {/* <Image source={require('../assets/logo.png')} style={{ width: 150, height: 150, alignSelf: 'center' }} /> */}
            <Text style={styles.itemName}>{menuItem.Name}</Text>
            <Text style={styles.itemPrice}>{`Price : Rs. ${menuItem.Price}`}</Text>
            {/* <View> */}
            <View style={styles.quantity}>
                <Pressable onPress={addQuantity}>
                    <Icons name="plus-square" size={25} color="black" />
                </Pressable>
                <Text style={{
                    fontSize: 30,
                    // marginHorizontal: 10
                }}>
                    {/* {orderItems[menuItem.id]} */}
                    {itemIndex === -1 ? 0 : orderItems[itemIndex].quantity}
                </Text>
                <Pressable onPress={removeQuantity}>
                    <Icons name="minus-square" size={25} color="black" />
                </Pressable>
            </View>
            {/* </View> */}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    quantity: {
        width: '40%',
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    itemName: {
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 10
    },
    itemPrice: {
        fontSize: 16,
        color: 'green',
        fontWeight: 'bold',
        marginBottom: 10

    },
    item: {
        padding: 20,
        width: '100%',
        borderRadius: 20,
        backgroundColor: 'white',
        elevation: 10,
        marginBottom: 20

    },
})

export default OrderItem
