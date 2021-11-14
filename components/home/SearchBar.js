import React from 'react'
import { View, Text } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {REACT_APP_GOOGLE_KEY} from '@env' 

console.log(REACT_APP_GOOGLE_KEY)

export default function SearchBar({cityHandler}) {
    return (
        <View style={{margin:15, flexDirection:"row"}}>
            <GooglePlacesAutocomplete 
            query={{key:REACT_APP_GOOGLE_KEY}}
            onPress={(data, details = null) => {
                const city = data.description.split(',')[0];
                cityHandler(city);
            }}
            placeholder="Search"
            styles={{
                textInput:{
                    backgroundColor:"#eee",
                    borderRadius:20,
                    fontWeight:"700",
                    marginTop:7
                },
                textInputContainer:{
                    backgroundColor:"#eee",
                    borderRadius:50,
                    flexDirection:"row",
                    alignItems:"center",
                    marginRight:10
                }
            }}
            renderLeftButton={() => (
                <View style={{margin:10}}>
                    <Ionicons name="location-sharp" size={24} />
                </View>
            )}
            renderRightButton={() => (
                <View style={{flexDirection:"row", margin:8, backgroundColor:"white", padding: 9, borderRadius:30, alignItems:"center"}}>
                    <AntDesign name="clockcircle" size={11} style={{marginRight:6}} />
                    <Text>Search</Text>
                </View>
            )}/>
        </View>
    )
}
