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
export default function App() {
    async function changeScreenOrientation() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    }
    changeScreenOrientation();
    const Stack = createStackNavigator();
    return (
        <NavigationContainer >
            <View style={styles.main}>
                <SideBar />
                <Stack.Navigator initialRouteName="Orders" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Home" component={HomePage} />
                    <Stack.Screen name="Menu" component={Menu} />
                    <Stack.Screen name="Orders" component={OrderPage} />
                    <Stack.Screen name="CreateOrder" component={CreateOrder} />
                    <Stack.Screen name="AddItem" component={AddItems} />
                    <Stack.Screen name="Sales" component={Sales} />
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
