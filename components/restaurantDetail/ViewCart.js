import React, {useState} from 'react'
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';
import OrderItem from './OrderItem'
import firebase from '../../firebase'
import LottieView from 'lottie-react-native'

export default function ViewCart({navigation}) {

    const [modalVisible, setModalVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const {items, restaurantName} = useSelector((state) => state.cartReducer.selectedItems)
    const total = items.map((item => Number(item.price.replace('$', '')))).reduce((prev, current) => prev+current, 0)

    const totalUSD = total.toLocaleString('en',
    {style: 'currency',
    currency: 'USD'});

    const addOrderToFirebase = () => {
        setLoading(true)
        const db = firebase.firestore();
        db.collection("orders").add({
            items:items,
            restaurantName:restaurantName,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            setTimeout(() => {
                setLoading(false);
                navigation.navigate("OrderCompleted");
            }, 2000)
        })
    }

    const styles = StyleSheet.create({
        modalContainer:{
            flex:1,
            justifyContent:'flex-end',
            backgroundColor:'rgba(0,0,0,0.7)'
        },

        modalCheckoutContainer:{
            backgroundColor:'white',
            padding:16,
            height:500,
            borderWidth:1
        },

        restaurantName:{
            textAlign:'center',
            fontWeight:'600',
            fontSize:18,
            marginBottom:10
        },

        subtotalContainer:{
            flexDirection:'row',
            justifyContent:'space-between',
            marginTop:15
        },

        subtotalText:{
            textAlign:'left',
            fontWeight:'bold',
            fontSize:18,
            marginBottom:10
        }
    })

    const checkoutModalContent = () => {        
        return (
            <>
            <View style={styles.modalContainer}>
                <View style={styles.modalCheckoutContainer}>
                    <Text style={styles.restaurantName}>{restaurantName.restaurantName}</Text>
                    {items.map((item, index) => (
                        <OrderItem key={index} item={item} />
                    ))}
                    <View style={styles.subtotalContainer}>
                        <Text style={styles.subtotalText}>Subtotal</Text>
                        <Text style={{fontSize:18}}>{totalUSD}</Text>
                    </View>
                    <View style={{
                        flexDirection:"row",
                        justifyContent:'center',

                    }}>
                        <TouchableOpacity style={{
                            marginTop:20,
                            backgroundColor:'black',
                            alignItems:'flex-start',
                            padding:13,
                            paddingLeft:30,
                            borderRadius:30,
                            width:300,
                            position:'relative'
                        }}
                        onPress={() =>{
                            setModalVisible(false);
                            addOrderToFirebase();
                        } }>
                            <Text style={{color:'white', fontSize:20}}>Checkout</Text>
                            <Text style={{position:"absolute", 
                            right:30, 
                            color:'white', 
                            fontSize:15, 
                            top:17}}>
                                {total ? totalUSD : ""}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </>
        )
    }

    return (    
        <>
        <Modal animationType='slide' 
        visible={modalVisible} 
        transparent={true} 
        onRequest={()=>setModalVisible(false)}>
            {checkoutModalContent()}
        </Modal>
        {total ? (
        <View style={{
            flex:1,
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"center",
            position:"absolute",
            bottom:50,
            zIndex:999
        }}>
        <View style={{
            flexDirection:"row",
            justifyContent:"center",
            width:"100%"
        }}>
            <TouchableOpacity style={{
                marginTop:20,
                backgroundColor:"black",
                flexDirection:'row',
                justifyContent:'space-evenly',
                alignItems:"center",
                padding:15,
                opacity:0.8,
                borderRadius:30,
                width:300,
                position:"relative"
            }}
            onPress={() => setModalVisible(true)}
            >
                <Text style={{color:"white", fontSize:20}}>View Cart</Text>
                <Text style={{color:'white', fontSize:20}}>{totalUSD}</Text>
            </TouchableOpacity>
        </View>
        </View>)
        : (<></>)}
        {loading ? (
            <>
        <View style={{
        backgroundColor:"black", 
        position:'absolute', 
        opacity:0.6, 
        justifyContent:'center',
        alignItems:'center',
        height:"100%",
        width:"100%"
    }}
        >
            <LottieView 
                    style={{height:200}} 
                    source={require("../../assets/animations/scanner.json")}
                    autoPlay
                    speed={0.5}
                    loop={true}
                    />  
        </View>
        </>
        ) : (
        <></>
        )}
        </>
    )
}