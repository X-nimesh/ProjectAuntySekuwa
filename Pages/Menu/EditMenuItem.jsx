import React from 'react'
import { ScrollView, View } from 'react-native'
import TitleBar from '../../components/TitleBar'

const EditMenuItem = () => {
    return (
        <ScrollView>
            <View>
                <TitleBar title={'Edit Menu Item'} />
            </View>
        </ScrollView>
    )
}

export default EditMenuItem
