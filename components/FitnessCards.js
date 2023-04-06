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
    <View style={{marginTop:60}}> 
        {FitnessData.map((item,key) => (
        <Pressable onPress={()=> navigation.navigate("Workout1",{image:item.image, exercises:item.exercises, id:item.id,})} style={{alignItems:"center", justifyContent:"center", margin:10}} key={key}>
            <Image style={{width:"95%", height:120, borderRadius:7}} source={{uri:item.image}}></Image>   
            <Text style = {{position:"absolute", color:"white", fontSize:16,fontWeight:"bold", left:20, top:25}}>{item.name}</Text> 
        </Pressable>
        ))}

        
    </View>
    

    )
}

export default FitnessCards

const styles = StyleSheet.create({}) 