import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import TitleBar from '../components/TitleBar';

const HomePage = ({ navigation }) => {


    return (
        <View style={styles.container}>
            <TitleBar title="Pending Orders" />
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: '5%',
        width: '100%',
        minHeight: '100%',

    },
});
export default HomePage
