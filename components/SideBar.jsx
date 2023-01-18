import React from 'react'
import { Button, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomeIcon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Orders from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card } from 'react-native-shadow-cards';
const SideBar = () => {
    const navigation = useNavigation();
    // DBA800
    // const Drawer = createDrawerNavigator();
    return (
        <View style={[styles.container, styles.shadowProp]}>
            <TouchableHighlight onPress={() => navigation.navigate('Home')} style={{ width: '100%' }}>
                <Image source={require('../assets/logo.png')} style={{ width: 150, height: 150, alignSelf: 'center' }} />
            </TouchableHighlight>
            <View style={styles.menu}>

                <TouchableHighlight onPress={() => navigation.navigate('Home')} style={styles.menuTop}>
                    <View style={styles.menuItem}>
                        <Text >
                            <HomeIcon name="home" size={25} color="white" />
                        </Text>
                        <Text style={styles.menuText}>HomePage</Text>
                    </View>
                </TouchableHighlight >
                <TouchableHighlight onPress={() => navigation.navigate('Menu')} style={styles.menuTop}>
                    <View style={styles.menuItem}>
                        <Text >
                            <Icon name='restaurant-menu' size={25} color="white" />
                        </Text>
                        <Text style={styles.menuText}>Menu</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => navigation.navigate('Orders')} style={styles.menuTop}>
                    <View style={styles.menuItem}>
                        <Text >
                            <Orders name="order-bool-ascending" size={25} color="white" />
                        </Text>
                        <Text style={styles.menuText}>Orders</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => navigation.navigate('Sales')} style={styles.menuTop}>
                    <View style={styles.menuItem}>
                        <Text >
                            <Icon name="monetization-on" size={25} color="white" />
                        </Text>
                        <Text style={styles.menuText}>Sales</Text>
                    </View>
                </TouchableHighlight>
            </View>

        </View >



    )
}

const styles = StyleSheet.create({
    container: {
        borderTopRightRadius: 100,
        backgroundColor: 'black',
        alignItems: 'flex-start',
        marginTop: '2%',
        paddingTop: 50,
        width: '20%',
        elevation: 10,
    },
    menu: {
        marginTop: '10%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingHorizontal: '25%',
    },
    menuItem: {
        flexDirection: 'row',
        gap: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    menuText: {
        fontSize: 22,
        marginLeft: 10,
        color: 'white'
    },
    menuTop: {
        marginTop: '20%'
    }
})
export default SideBar
