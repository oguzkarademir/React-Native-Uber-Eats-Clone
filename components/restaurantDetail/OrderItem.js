import React from 'react'
import { View, Text } from 'react-native'

export default function OrderItem({item:{title, price}}) {

    return (
        <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            padding:20,
            borderBottomWidth:1,
            borderBottomColor:"#999"
        }}>
            <Text style={{fontWeight:'bold', fontSize:14}}>{title}</Text>
            <Text style={{opacity:0.7, fontSize:14}}>{price}</Text>
        </View>
    )
}
