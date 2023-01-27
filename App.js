import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './Pages/HomePage';
import SideBar from "./components/SideBar";
import * as ScreenOrientation from 'expo-screen-orientation';
import OrderPage from './Pages/OrderPage';
import Menu from './Pages/Menu';
import Sales from './Pages/Sales';
import CreateOrder from './Pages/CreateOrder';
import AddItems from './Pages/AddItems';
import OrderDetails from './Pages/orderPage/OrderDetails';
// import FetchMenu from './utils/FetchMenu';
import Settings from './Pages/Settings';
import EditPayment from './Pages/EditPayment';
import data from './DataFiles/FoodItems.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
    const menuSave = async () => {
        let menu = JSON.parse(await AsyncStorage.getItem('menu')) || [];
        console.log("*********");
        console.log(menu.length)
        if (menu.length == 0) {
            menu = data;
            // console.log(data);
            await AsyncStorage.setItem('menu', JSON.stringify(data));

        }
        console.log(menu)
    }
    menuSave();
    async function changeScreenOrientation() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    }
    changeScreenOrientation();
    const Stack = createStackNavigator();
    return (
        <NavigationContainer >
            <View style={styles.main}>
                <SideBar />
                <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Home" component={HomePage} />
                    <Stack.Screen name="Menu" component={Menu} />
                    <Stack.Screen name="Orders" component={OrderPage} />
                    <Stack.Screen name="OrderDetail" component={OrderDetails} />
                    <Stack.Screen name="CreateOrder" component={CreateOrder} />
                    <Stack.Screen name="AddItem" component={AddItems} />
                    <Stack.Screen name="Sales" component={Sales} />
                    <Stack.Screen name="Setting" component={Settings} />
                    <Stack.Screen name="EditPayment" component={EditPayment} />
                </Stack.Navigator>
            </View>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
    }
});
