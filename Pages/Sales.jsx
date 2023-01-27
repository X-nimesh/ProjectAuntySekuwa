import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { DataTable } from 'react-native-paper';
import TitleBar from '../components/TitleBar'
import { todayDate } from '../utils/todayDate';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
const Sales = () => {
    let today = todayDate();
    const [sales, setsales] = useState({})
    const [data, setdata] = useState([])
    const [totalSales, settotalSales] = useState(0);
    const [salesReport, setsalesReport] = useState({})
    const [orders, setorders] = useState([]);
    const getMenu = async () => {

    }
    const getSales = async () => {
        let itemsData = JSON.parse(await AsyncStorage.getItem(`menu`)) || [];
        // console.log(items)
        let price = 0;
        setdata(itemsData);
        let orders = JSON.parse(await AsyncStorage.getItem(`orders ${today}`)) || {};
        let paidOrders = orders?.orders?.filter((order) => order.status === "Paid")
        orders.orders = paidOrders;
        let SalesNameP = []
        paidOrders?.map((order) => {
            let orderDetail = {};
            orderDetail["Name"] = order.name;
            orderDetail["total_price"] = order.total_price;
            orderDetail["phone"] = order.phone;
            SalesNameP.push(orderDetail);
        })
        setsalesReport(SalesNameP);
        setorders(orders);
        let SalesDetails = {}
        orders?.orders?.map((order) => {
            order.items.map((item) => {
                let foodItem = itemsData?.find((food) => food.id === item.id)
                SalesDetails[foodItem?.Name] = SalesDetails[foodItem?.Name] ? SalesDetails[foodItem?.Name] + item.quantity : item.quantity;
                price += foodItem?.Price * item.quantity;
                // console.log(SalesDetails)
            })
            order?.newItems?.map((item) => {
                let foodItem = itemsData?.find((food) => food.id === item.id)
                SalesDetails[foodItem?.Name] = SalesDetails[foodItem?.Name] ? SalesDetails[foodItem?.Name] + item.quantity : item.quantity;
                price += foodItem?.Price * item.quantity;
            })
        })
        // console.log(SalesDetails);
        settotalSales(price);
        setsales(SalesDetails);
    }
    const getSalesData = () => {
        let SalesDetails = {}
        orders?.orders?.map((order) => {
            order.items.map((item) => {
                let foodItem = data?.find((food) => food.id === item.id)
                SalesDetails[foodItem?.Name] = SalesDetails[foodItem?.Name] ? SalesDetails[foodItem?.Name] + item.quantity : item.quantity;
                // console.log(SalesDetails)
            })
            order?.newItems?.map((item) => {
                let foodItem = data?.find((food) => food.id === item.id)
                SalesDetails[foodItem?.Name] = SalesDetails[foodItem?.Name] ? SalesDetails[foodItem?.Name] + item.quantity : item.quantity;
            })
        })
        setsales(SalesDetails);
    }

    useFocusEffect(
        React.useCallback(() => {
            getMenu();
            getSales();
            // getSalesData();
        }, [])
    );
    const { StorageAccessFramework } = FileSystem;

    const exportSales = async () => {
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(salesReport)
        XLSX.utils.book_append_sheet(wb, ws, "Users")
        const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" })


        const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (permissions.granted) {
            // Get the directory uri that was approved
            let directoryUri = permissions.directoryUri;
            await StorageAccessFramework.createFileAsync(directoryUri, `${today}_Sales.xlsx`, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet").then(async (fileUri) => {
                // Save data to newly created file
                await FileSystem.writeAsStringAsync(fileUri, wbout, { encoding: FileSystem.EncodingType.Base64 });
            })
                .catch((e) => {
                    console.log(e);
                });
        } else {
            alert("You must allow permission to save.")
        }
        // const fileUri = FileSystem.documentDirectory + `${today}_Sales.xlsx`;
        // console.log(fileUri);
        // await FileSystem.writeAsStringAsync(fileUri, wbout, { encoding: FileSystem.EncodingType.Base64 })
        //     .then(() => {
        //         console.log('FILE WRITTEN!');
        //     }
        //     )
        //     .catch((error) => {
        //         console.log(error);
        //     }
        //     );
        // await Sharing.shareAsync(fileUri, {
        //     mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        //     dialogTitle: 'MyWater data',
        //     UTI: 'com.microsoft.excel.xlsx'
        // });
    }


    const saveFile = async () => {
        const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
        // Check if permission granted
        if (permissions.granted) {
            // Get the directory uri that was approved
            let directoryUri = permissions.directoryUri;
            let data = "Hello World";
            // Create file and pass it's SAF URI
            await StorageAccessFramework.createFileAsync(directoryUri, "filename", "application/json").then(async (fileUri) => {
                // Save data to newly created file
                await FileSystem.writeAsStringAsync(fileUri, data, { encoding: FileSystem.EncodingType.UTF8 });
            })
                .catch((e) => {
                    console.log(e);
                });
        } else {
            alert("You must allow permission to save.")
        }
    }
    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={styles.container}>
                <TitleBar title="Sales" />
                <View style={{ flexDirection: 'row', width: "100%", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 20, }}>{today}</Text>
                    <Pressable onPress={() => exportSales()}
                        style={{ backgroundColor: "green", paddingHorizontal: 30, paddingVertical: 10, borderRadius: 20 }}>
                        <Text style={{ color: "white", fontWeight: "800", fontSize: 20 }}>Export</Text>
                    </Pressable>
                </View>
                <View style={styles.billContainer}>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title><Text style={[styles.heading, { color: '#DAA700' }]}>Food</Text></DataTable.Title>
                            <DataTable.Title numeric><Text style={styles.heading}>Qty</Text></DataTable.Title>
                            <DataTable.Title numeric><Text style={styles.heading}>Rate</Text></DataTable.Title>
                            <DataTable.Title numeric><Text style={styles.heading}>Amount</Text></DataTable.Title>
                        </DataTable.Header>
                        {Object.keys(sales)?.map((item, index) => {
                            let rate = data?.find((food) => food?.Name == item).Price;
                            let amount = sales[item] * data?.find((food) => food?.Name == item)?.Price;
                            return (
                                <DataTable.Row key={index}>
                                    <View style={{ alignSelf: "center", width: '25%', marginVertical: 5 }}><Text style={styles.foodname}>{item}</Text></View>
                                    <DataTable.Cell numeric><Text style={styles.foodPrice}>{sales[item]}</Text></DataTable.Cell>
                                    <DataTable.Cell numeric><Text style={styles.foodPrice}>{rate}</Text></DataTable.Cell>
                                    <DataTable.Cell numeric><Text style={styles.foodPrice}>{amount}</Text></DataTable.Cell>

                                </DataTable.Row>
                            )
                        })}
                        <DataTable.Row style={{ marginBottom: 30 }}>
                            <DataTable.Cell><Text style={styles.Total}>Total</Text></DataTable.Cell>
                            <DataTable.Cell numeric><Text style={styles.TotalPrice}>Rs.{totalSales}/-</Text></DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>

                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        minHeight: '100%',
        padding: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    billContainer: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        marginTop: 20,
        width: '100%',
        // minHeight: 200,
    },
    foodname: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    foodPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    Total: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'green',
    },
    TotalPrice: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'green',
    }

})
export default Sales
