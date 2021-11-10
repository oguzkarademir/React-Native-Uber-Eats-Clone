import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import About from '../components/restaurantDetail/About'
import { Divider } from 'react-native-elements'
import MenuItems from '../components/restaurantDetail/MenuItems'
import ViewCart from '../components/restaurantDetail/ViewCart'

const foods = [
    {
        title:"Chicken Rice Bowl",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
        price:"$13.50",
        image:
        "https://user-images.githubusercontent.com/53440164/141097434-b449e418-0c38-4a95-b440-ef4abe0695d7.jpg"
    },
    {
        title:"Combo Bowl",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
        price:"$15",
        image:
        "https://user-images.githubusercontent.com/53440164/141097867-5a7cc22e-9edf-4d6c-b513-525fe8471416.jpg"
    },
    {
        title:"Beef Fries Bowl",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
        price:"$14",
        image:
        "https://user-images.githubusercontent.com/53440164/141098044-2a9e19a1-6fb8-4f1d-ba75-94fd3dd4c61c.jpg"
    },
    {
        title:"Turkish Kebab",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
        price:"$18",
        image:
        "https://media.istockphoto.com/photos/chicken-kebab-with-bell-pepper-picture-id912629972?k=20&m=912629972&s=612x612&w=0&h=y2KWs38AjnDCeKw_Q_x_mnTZtFbbpPndxuPyu-wiLNo="
    },
    {
        title:"Macaroni and Cheese",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
        price:"$14.50",
        image:
        "https://user-images.githubusercontent.com/53440164/141098469-537210b5-4673-43ae-8ce3-6914f89641d9.jpg"
    },
    {
        title:"Turkish Baklava",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
        price:"$8",
        image:
        "https://user-images.githubusercontent.com/53440164/141098673-29bde99b-9c77-4858-b780-d432d1e0ebd8.jpg"
    }
]

export default function RestaurantDetail({route, navigation}) {
    return (
        <View style={{flex:1}}>
            <About route={route}/>
            <Divider width={1.8} style={{marginVertical:20}}/>
            <MenuItems restaurantName={route.params.name} foods={foods} />
            <ViewCart navigation={navigation} />
        </View>
    )
}
