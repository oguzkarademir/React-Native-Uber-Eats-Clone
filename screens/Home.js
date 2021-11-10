import React, {useState, useEffect} from 'react'
import { View, SafeAreaView, ScrollView } from 'react-native'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import BottomTabs from '../components/home/BottomTabs'
import Categories from '../components/home/Categories'
import HeaderTabs from '../components/home/HeaderTabs'
import RestaurantItem from '../components/home/RestaurantItem'
import SearchBar from '../components/home/SearchBar'

const YELP_API_KEY = "pfdkIAy8EpVDyrQovVnEK5iAWcse838Ke1zyVB_cnZVrx-qtl0hSE4qhH3zd5n3rfwU_yiVfrg2A9TuVT-cRpkFng3DI78aF-kxbqy5M3sOQ_RStnukfnZpAnZdLYXYx";

export default function Home({navigation}) {

    const [restaurantData, setRestaurantData] = useState([]);
    const [city, setCity] = useState("San Francisco")
    const [activeTab, setActiveTab] = useState("Delivery")

    const getRestaurantsFromYelp = () => {

        const yelpurl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

        const apiOptions = {
            headers:{
                Authorization: `Bearer ${YELP_API_KEY}`,
            },
        }

        return fetch(yelpurl, apiOptions)
            .then((res) => res.json())
            .then(json => setRestaurantData(
                json.businesses.filter((business) => 
                    business.transactions.includes(activeTab.toLowerCase())
                )
                
            ));
    }

    useEffect(() => {
      getRestaurantsFromYelp();
    }, [city, activeTab])

    return (
        <SafeAreaView style={{backgroundColor: "#eee", flex:1}}>
            <View style={{marginTop:50, backgroundColor:"white", padding:15}}>
                <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
                <SearchBar cityHandler={setCity}/>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Categories />
            <RestaurantItem restaurantData={restaurantData} navigation={navigation}/>
            </ScrollView>
            <Divider width={1}/>
            <BottomTabs />
        </SafeAreaView>
    )
}
 