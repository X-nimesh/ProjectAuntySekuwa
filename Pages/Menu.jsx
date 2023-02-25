import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import ColdDrinks from '../components/MenuItems/ColdDrinks'
import OtherItems from '../components/MenuItems/OtherItems'
import Sekuwa from '../components/MenuItems/Sekuwa'
import TitleBar from '../components/TitleBar'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'

const Menu = ({ navigation }) => {
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
    return (
        <ScrollView >
            <View style={styles.container}>
                <View style={{ width: "100%", flexDirection: "row", alignItems: "flex-end" }}>
                    <TitleBar title={'Menu'} />
                    <Pressable onPress={() => navigation.navigate('AddMenuItems')}
                        style={{
                            backgroundColor: 'green',
                            padding: 10,
                            borderRadius: 10,
                            marginLeft: 'auto',
                            paddingHorizontal: 20,
                        }}
                    >
                        <Text style={{ color: "white", fontWeight: "500" }}>Add Items</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('EditItems')}
                        style={{
                            backgroundColor: 'green',
                            padding: 10,
                            paddingHorizontal: 20,
                            borderRadius: 10,
                            marginLeft: 20,
                        }}
                    >
                        <Text style={{ color: "white", fontWeight: "500" }}>Edit Item</Text>
                    </Pressable>
                </View>
                <Sekuwa data={data} />
                <OtherItems data={data} />
                <ColdDrinks data={data} />
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        minHeight: '100%',
        backgroundColor: 'white',
        paddingHorizontal: '5%',

    }
})
export default Menu
