import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { DataTable } from 'react-native-paper';
import FetchMenu from '../../utils/FetchMenu';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Sekuwa = ({ data }) => {
    // console.log(data);
    // let data = [];


    let Food = data?.filter((item) => item.category === 'Sekuwa');
    return (
        <View style={styles.container}>
            <View style={styles.food}>
                <Text style={styles.heading}>Sekuwa</Text>
            </View>
            <DataTable>
                {Food.map((item, key) => {
                    return (
                        <DataTable.Row style={{ borderBottomWidth: 0 }} key={key}>
                            <DataTable.Cell ><Text style={styles.title}>{item.Name}</Text></DataTable.Cell>
                            <DataTable.Cell numeric><Text style={styles.price}>Rs.{item.Price}/-</Text></DataTable.Cell>
                            {/* <DataTable.Cell numeric ><Text style={styles.price}>Rs.{item.Price * 2}/-</Text></DataTable.Cell> */}
                        </DataTable.Row>
                    )
                })}
            </DataTable>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        elevation: 5,
        padding: 20,
        borderRadius: 20,
        marginTop: 20,

    },
    food: {
        marginLeft: 10,
        marginBottom: 10,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#CC9C00',
        // textDecorationLine: 'underline',

    },
    price: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#279600',
    }
})
export default Sekuwa
