import { StyleSheet, Text,SafeAreaView,Image, Pressable} from "react-native";
import React, {useState, useEffect} from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const FitScreen= () => {
const route = useRoute();
//console.log(route.params);
const navigation = useNavigation();
const [index,setIndex] = useState(0);
const exercise = route.params.exercises;
const current = exercise[index];
//console.log(current, "first exercise");
const [countExercises, setCountExercises
] = useState(0);

  useEffect(() => {
  AsyncStorage.setItem('countExercises', countExercises.toString())
}, [countExercises]);

const handleDonePress = () => {
  setCountExercises
(countExercises + 1);
  if (index + 1 >= exercise.length) {
    navigation.navigate("Finnish");
  } else {
    setTimeout(() => {
      setIndex(index + 1);
    },2000);
    navigation.navigate("Rest");
  }
};

 return (
        <SafeAreaView>
      <Image style={{width: "100%", height:370}} source={{uri:current.image}}/>

      <Text style={{marginLeft:"auto", marginRight:"auto", marginTop: 30, fontSize: 30, fontWeight:"bold"}}>{current.name }</Text>

      <Text style={{marginLeft:"auto", marginRight:"auto", marginTop: 30, fontSize: 30, fontWeight:"bold"}}>x{current.sets }</Text>

       
       <Pressable
       onPress={handleDonePress}
       style={{
         backgroundColor: "blue",
         marginLeft: "auto",
         marginRight: "auto",
         marginTop: 20,
         borderRadius: 25,
         padding: 10,
         width: 150,
       }}
     >
       <Text
         style={{
           textAlign: "center",
           fontSize: 20,
           fontWeight: "bold",
           color: "white",
         }}
       >
         DONE
       </Text>
     </Pressable>
      <Pressable style={{flexDirection:"row", alignItems:"center",marginLeft:"auto",marginRight:"auto", marginTop:45,}}>
        <Pressable disabled = {index===0} onPress={() => { setIndex(index - 1);}} style={{backgroundColor:"green",borderRadius:20,padding:10,marginHorizontal:20, width:100}}>
          <Text style={{color:"white", fontWeight:"bold",textAlign:"center"}}> ANTERIOR </Text>
        </Pressable>


        {index + 1 >= exercise.length ?(
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

