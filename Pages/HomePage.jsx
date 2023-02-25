import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { Button, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import Order from '../components/pendingOrder/Order';
import TitleBar from '../components/TitleBar';
import { useFocusEffect } from '@react-navigation/native';
import { todayDate } from '../utils/todayDate';
const HomePage = ({ navigation }) => {
    const [refresh, setrefresh] = useState(false);
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
        }, [allOrders, refresh])
    );
    useEffect(() => {
        getPrevorders();
    }, [refresh])

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
    const excelsheet = [
        {
            sheet: "Sheet1",
            columns: [
                { label: "name", value: "name" },
                { label: "age", value: "age" },
            ],
            content: [
                { name: "John", age: 20 },
                { name: "Sara", age: 25 }
            ]
        }
    ]
    let settings = {
        filename: "test.xlsx",
        extraLength: 3, // A bigger number means that columns will be wider
        writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
        writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options

    }
    let exportToExcel = () => {
        // xlsx(excelsheet, settings);
    }
    return (
        <ScrollView style={{ backgroundColor: "white" }}>
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
                            <Order data={data} order={order} key={key} addItem={addItems} complete={completeOrder} setrefresh={setrefresh} />
                        )
                    })
                    }
                </View>
            </View >
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: '5%',
        width: '100%',
        minHeight: '100%',
        paddingBottom: 20,
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
