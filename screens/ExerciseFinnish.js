import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation} from "@react-navigation/native";
import React, {useState, useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExerciseFinnish = () => {
  const navigation = useNavigation();
  const [doneCount, setdoneCount] = useState(0); 

  useEffect(() => {
    const getdoneCount = async () => {
      try {
        const value = await AsyncStorage.getItem('doneCount');
       
          setdoneCount(parseInt(value) || 0);
       

      } catch (error) {
        console.error(error);
      }
    };    
    getdoneCount();
  }, []);

  return (

    
    <View style={{backgroundColor:"#2E9AFE"}}>
      
       <Image style={{width:180, height:180, top:60,marginLeft:108, marginRight:"auto"}} source={require("../images/Trofeu.png")} />
       <Text style={{color:"#FFFFFF",marginLeft:"auto", marginRight:"auto", fontSize:20, top:50 , fontWeight:"bold"}}>Parabens você conclui-o o treino!</Text>
       <Text style={{color:"#FFFFFF",marginLeft:255, marginRight:"auto", fontSize:18,marginTop:70}}>Calorias</Text>
       <Text style={{color:"#FFFFFF",marginLeft:283, marginRight:"auto", fontSize:18,top:20}}>0</Text>
       <Text style={{color:"#FFFFFF",marginLeft:"auto", marginRight:245, fontSize:18,marginTop:-49}}>Exercicios</Text>
       <Text style={{color:"#FFFFFF",marginLeft:"auto", marginRight:280, fontSize:18,top:20}}>{doneCount}</Text>

       <Pressable onPress={() => navigation.navigate("Tab") } style={{ backgroundColor: "blue", padding: 10, marginLeft: "auto", marginRight: "auto", marginVertical: 300, borderRadius: 6, width: 140 }}>
      <Text style={{ texltAign: "center", color: "white", fontSize: 15, fontWeight: "600", marginLeft:"auto", marginRight:"auto" }}>CONTINUAR</Text> 
      </Pressable>
    </View>
  );
}

export default ExerciseFinnish;

const style = StyleSheet.create({})
