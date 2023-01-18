import React from 'react'
import { StyleSheet, Text } from 'react-native'

const TitleBar = ({ title }) => {
    return (
        <Text style={styles.title}>{title}</Text>
    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#CC9C00',
        marginTop: 100,
    },
})
export default TitleBar
