import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';
import firebase from "../firebase";
import MenuItems from '../components/restaurantDetail/MenuItems';
import { ScrollView } from 'react-native';

export default function OrderCompleted() {
    const [lastOrder, setLastOrder] = useState({
        items:[
            {
                title:"Chicken Rice Bowl",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
        price:"$13.50",
        image:
        "https://user-images.githubusercontent.com/53440164/141097434-b449e418-0c38-4a95-b440-ef4abe0695d7.jpg"
            }
        ]
    })

    const {items, restaurantName} = useSelector((state) => state.cartReducer.selectedItems)
    const total = items.map((item => Number(item.price.replace('$', '')))).reduce((prev, current) => prev+current, 0)

    const totalUSD = total.toLocaleString('en',
    {style: 'currency',
    currency: 'USD'});

    useEffect(() => {
        const db = firebase.firestore();
        const unSubscribe = db.collection("orders")
        .orderBy('createdAt', 'desc')
        .limit(1)
        .onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
                setLastOrder(doc.data())
            })
        });

        return () => unSubscribe();
    }, [])

    return (
        <View style={{flex:1, backgroundColor:'white', marginTop:20}}>
            <View style={{margin:15, alignItems:'center', height:"100%"}}>
                <LottieView 
                style={{height:100, alignSelf:'center', marginBottom:30}} 
                source={require("../assets/animations/check-mark.json")}
                autoPlay
                speed={0.5}
                loop={false}
                />
                <Text style={{fontSize:20, fontWeight:"bold"}}>Your order at {restaurantName} has beeen placed for {totalUSD}</Text>
                <ScrollView>
                    <MenuItems foods={lastOrder.items} hideCheckbox={true} />
                    <LottieView 
                    style={{height:200, alignSelf:'center', marginBottom:30}} 
                    source={require("../assets/animations/cooking.json")}
                    autoPlay
                    speed={0.5}
                    loop={true}
                    />    
                </ScrollView>  
            </View>  
        </View>
    )
}
