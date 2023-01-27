import React, { useState } from 'react'
import { Button, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import TitleBar from '../components/TitleBar'
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
const EditPayment = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const [name, setname] = useState();
    const [details, setdetails] = useState();
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
        });
        console.log(result);
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    const addPayment = async () => {
        let payments = JSON.parse(await AsyncStorage.getItem(`payments`)) || [];
        payments.push({ name, details, image });
        await AsyncStorage.setItem(`payments`, JSON.stringify(payments));
        navigation.navigate('Setting');
    }
    return (
        <ScrollView style={{ backgroundColor: "white" }}>
            <TitleBar title="Add Payment" />
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: "600" }}>
                        Name:
                    </Text>

                    <TextInput
                        style={[styles.input, { width: '40%' }]}
                        onChangeText={(text) => setname(text)}
                        value={name}
                        placeholder="Payment Name"
                    />

                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: "600" }}>
                        Details:
                    </Text>
                    <TextInput
                        style={[styles.input, { width: '40%' }]}
                        onChangeText={(text) => setdetails(text)}
                        value={details}
                        placeholder="Details"
                    />

                </View>
                <View style={{ width: "50%", marginBottom: 20, marginVertical: 10 }}>
                    <Pressable onPress={pickImage} style={styles.imagePicker}>
                        <Text style={{ fontSize: 20, fontWeight: "600" }}>Pick an image from camera roll</Text>
                    </Pressable>
                </View>
                <View style={{ width: "50%" }}>
                    <Pressable onPress={addPayment} style={styles.addButton}>
                        <Text style={{ fontSize: 20, fontWeight: "600", color: "white" }}>Add Payment</Text>
                    </Pressable>
                </View>
            </View>

        </ScrollView>
    )
}
const styles = StyleSheet.create({

    container:
    {
        width: '80%',
        alignSelf: 'center',
        padding: 20,
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 5,
        marginVertical: 20,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#CC9C00',
        width: '60%'
    },
    imagePicker: {
        height: 40,
        borderColor: '#CC9C00',
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    addButton: {
        height: 40,
        backgroundColor: '#CC9C00',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',

    }
})

export default EditPayment
