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
        <View style={styles.container}>
            <TouchableHighlight onPress={() => navigation.navigate('Home')} style={{ width: '100%', height: "20%" }}>
                <Image source={require('../assets/logo.png')} style={{ width: "50%", height: "100%", alignSelf: 'center' }} />
            </TouchableHighlight>
            <View style={styles.menu}>

                <TouchableHighlight onPress={() => navigation.navigate('Home')} style={styles.menuTop}>
                    <View style={styles.menuItem}>
                        <Text >
                            <HomeIcon name="home" size={20} color="white" />
                        </Text>
                        <Text adjustsFontSizeToFit style={styles.menuText}>HomePage</Text>
                    </View>
                </TouchableHighlight >
                {/* <TouchableHighlight onPress={() => navigation.navigate('CreateOrder')} style={styles.menuTop}>
                    <View style={styles.menuItem}>
                        <Text >
                            <HomeIcon name="home" size={20} color="white" />
                        </Text>
                        <Text style={styles.menuText}>Create Order</Text>
                    </View>
                </TouchableHighlight > */}
                <TouchableHighlight onPress={() => navigation.navigate('Menu')} style={styles.menuTop}>
                    <View style={styles.menuItem}>
                        <Text >
                            <Icon name='restaurant-menu' size={20} color="white" />
                        </Text>
                        <Text style={styles.menuText}>Menu</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => navigation.navigate('Orders')} style={styles.menuTop}>
                    <View style={styles.menuItem}>
                        <Text >
                            <Orders name="order-bool-ascending" size={20} color="white" />
                        </Text>
                        <Text style={styles.menuText}>Orders</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => navigation.navigate('Sales')} style={styles.menuTop}>
                    <View style={styles.menuItem}>
                        <Text >
                            <Icon name="monetization-on" size={20} color="white" />
                        </Text>
                        <Text style={styles.menuText}>Sales</Text>
                    </View>
                </TouchableHighlight>
            </View>
            <View style={{ marginTop: 'auto', width: "100%" }}>
                <TouchableHighlight onPress={() => navigation.navigate('Setting')}>
                    <View style={{ flexDirection: 'row', alignItems: "center", padding: 15, justifyContent: 'center', width: "100%" }}>
                        <Text>
                            <Icon name="settings" size={20} color="white" />
                        </Text>
                        <Text style={styles.menuText}>
                            Settings
                        </Text>
                    </View>
                </TouchableHighlight>
            </View >
        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        borderTopRightRadius: 100,
        backgroundColor: 'black',
        alignItems: 'flex-start',
        paddingTop: "3%",
        width: '20%',
        elevation: 10,
        height: '100%'
    },
    menu: {
        height: "100%",
        marginTop: '1%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingHorizontal: '20%',
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    menuText: {
        fontSize: 15,
        marginLeft: 10,
        color: 'white'
    },
    menuTop: {
        marginTop: '20%'
    }
})
export default SideBar
