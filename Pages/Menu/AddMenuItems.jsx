import React from 'react'
import { ScrollView, View } from 'react-native'
import TitleBar from '../../components/TitleBar'

const AddMenuItems = () => {
    return (
        <ScrollView>
            <View>
                <TitleBar title={'Add Menu Item'} />
            </View>
        </ScrollView>
    )
}

export default AddMenuItems
