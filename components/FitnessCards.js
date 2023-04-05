import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import FitnessData from '../data/FitnessData';
const FitnessCards = () => {
    const navigation = useNavigation();
    return (

        //Codigo para mostrar exercícios na aba WorkoutPlans
        //AntDesign é as estrelas consoante a dificuldade
    <View> 
        {FitnessData.map((item,key) => (
        <Pressable onPress={()=> navigation.navigate("Workout1",{image:item.image, excersises:item.excersises, id:item.id,})} style={{alignItems:"center", justifyContent:"center", margin:10}} key={key}>
            <Image style={{width:"95%", height:120, borderRadius:7}} source={{uri:item.image}}></Image>   
            <Text style = {{position:"absolute", color:"white", fontSize:16,fontWeight:"bold", left:20, top:25}}>{item.name}</Text> 
            <AntDesign style = {{position:"absolute", color:"white", bottom:15, left:20}} name="star" size={18} />
            <AntDesign style = {{position:"absolute", color:"white", bottom:15, left:40}} name="staro" size={18} />
            <AntDesign style = {{position:"absolute", color:"white", bottom:15, left:60}} name="staro" size={18} />
        </Pressable>
        ))}

        
    </View>
    

    )
}

export default FitnessCards

const styles = StyleSheet.create({}) 