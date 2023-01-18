import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import ColdDrinks from '../components/MenuItems/ColdDrinks'
import OtherItems from '../components/MenuItems/OtherItems'
import Sekuwa from '../components/MenuItems/Sekuwa'
import TitleBar from '../components/TitleBar'

const Menu = ({ navigation }) => {
    return (
        <ScrollView >
            <View style={styles.container}>

                <TitleBar title={'Menu'} />
                <Sekuwa />
                <OtherItems />
                <ColdDrinks />
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
