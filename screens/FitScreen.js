import { StyleSheet, Text,SafeAreaView,Image, Pressable,Dimensions} from "react-native";
import React, {useState} from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';

const FitScreen= () => {
const route = useRoute();
//console.log(route.params);
const navigation = useNavigation();
const [index,setIndex] = useState(0);
const excersise = route.params.excersises;
const current = excersise[index];
console.log(current, "first excersise");

 return (
        <SafeAreaView>
      <Image style={{width: "100%", height:370}} source={{uri:current.image}}/>

      <Text style={{marginLeft:"auto", marginRight:"auto", marginTop: 30, fontSize: 30, fontWeight:"bold"}}>{current.name }</Text>

      <Text style={{marginLeft:"auto", marginRight:"auto", marginTop: 30, fontSize: 30, fontWeight:"bold"}}>x{current.sets }</Text>


       {index + 1 >= excersise.length ?(
        <Pressable 
        onPress={() => {
          navigation.navigate("Finnish") //Após acabar o exercicio volta para o inicio
        }} 
          style={{backgroundColor:"blue",marginLeft:"auto",marginRight:"auto",marginTop:20, borderRadius:25,padding:10, width:150}}>
  
  
        <Text style={{textAlign:"center", fontSize: 20, fontWeight:"bold", color:"white"}}>DONE</Text>
        </Pressable>
       ):(
        <Pressable onPress={() =>{navigation.navigate("Rest");
        setTimeout(() => {
          setIndex(index + 1);
        },2000);}}
        style={{backgroundColor:"blue",marginLeft:"auto",marginRight:"auto",marginTop:20, borderRadius:25,padding:10, width:150}}>
          <Text style={{textAlign:"center", fontSize: 20, fontWeight:"bold", color:"white"}}>DONE</Text>

      </Pressable>
       )}

      
      
      <Pressable style={{flexDirection:"row", alignItems:"center",marginLeft:"auto",marginRight:"auto", marginTop:45,}}>
        <Pressable disabled = {index===0} onPress={() => { setIndex(index - 1);}} style={{backgroundColor:"green",borderRadius:20,padding:10,marginHorizontal:20, width:100}}>
          <Text style={{color:"white", fontWeight:"bold",textAlign:"center"}}> ANTERIOR </Text>
        </Pressable>


        {index + 1 >= excersise.length ?(
           <Pressable onPress={() => {
            navigation.navigate("Finnish") 
          }}  style={{backgroundColor:"green",borderRadius:20,padding:10,marginHorizontal:20, width:100}}>
            <Text style={{color:"white", fontWeight:"bold",textAlign:"center"}}> SEGUINTE </Text>
          </Pressable>

        ):(
           
          <Pressable onPress={() => {
           setIndex(index + 1);

          }}  
          style={{backgroundColor:"green", borderRadius:20,padding:10,marginHorizontal:20, width:100}}>
            <Text style={{color:"white", fontWeight:"bold",textAlign:"center"}}> SEGUINTE </Text>
          </Pressable>

        )}

        
      </Pressable>
          </SafeAreaView> 
  );
};
export default FitScreen 

const styles = StyleSheet.create({});
