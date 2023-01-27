import AsyncStorage from "@react-native-async-storage/async-storage"
import data from '../DataFiles/FoodItems.json';

const FetchMenu = async () => {
    // await AsyncStorage.removeItem('menu');
    let menu = JSON.parse(await AsyncStorage.getItem('menu')) || [];
    if (menu.length < 0) {
        menu = data;
        await AsyncStorage.setItem('menu', JSON.stringify(data));
    }
    return menu;
}
export default FetchMenu
