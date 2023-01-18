import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import data from '../../FoodItems.json';
import { DataTable } from 'react-native-paper';


const OtherItems = () => {
    let Food = data.filter((item) => item.category === 'Others');

    return (
        <View style={styles.container}>
            <View style={styles.food}>
                <Text style={styles.heading}>Others</Text>
            </View>

            <DataTable>

                {Food.map((item, key) => {
                    console.log(item);
                    return (
                        <DataTable.Row style={{ borderBottomWidth: 0 }} key={key}>
                            <DataTable.Cell ><Text style={styles.title}>{item.Name}{item.id === 6 ? ' per plate' : ' per pcs'}</Text></DataTable.Cell>
                            <DataTable.Cell numeric ><Text style={styles.price}>Rs.{item.Price}/-</Text></DataTable.Cell>
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
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#CC9C00',
        // textDecorationLine: 'underline',
        lineHeight: 40,

    },
    price: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
    },
    price: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#279600',
    }
})
export default OtherItems
