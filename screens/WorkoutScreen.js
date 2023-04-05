import { StyleSheet, Text, View, SafeAreaView, Image, Pressable, ScrollView,} from "react-native";
import React, {useState} from "react";
import { useNavigation, useRoute} from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

const WorkoutScreen = () => {
const route = useRoute();
console.log(route.params)
  const navigation = useNavigation();
  return (
    <>
      <ScrollView showsHorizontalScrollIndicator={false} style={{ backgroundColor: "white" }}>
        <Image style={{ width: '100%', height: 180, marginTop: 32 }} source={{ uri: route.params.image }} />
        <Ionicons onPress={() =>{navigation.navigate("AjustarRest",)}} style={{ position: "absolute", top: 50, right: 20 }} name="timer-outline" size={24} color="white" />
        <Ionicons onPress={() => navigation.goBack()} style={{ position: "absolute", top: 50, left: 20 }} name="arrow-back-outline" size={24} color="white" />
        {route.params.excersises.map((item, index) => (
          <Pressable style={{ margin: 10, flexDirection: "row", alignItems: "center" }} key={index}>
            <Image style={{ width: 90, height: 90 }} source={{ uri: item.image }}/>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 17, fontWeight: "bold",width:170}}>{item.name}</Text>
              <Text style={{ fontSize: 17, marginTop: 4, color: "gray" }}>x{item.sets}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
     
      <Pressable 
      onPress={() => 
        {navigation.navigate("Fit",{
          excersises:route.params.excersises,
        })}
       } style={{ backgroundColor: "blue", padding: 10, marginLeft: "auto", marginRight: "auto", marginVertical: 15, borderRadius: 6, width: 140 }}>
        <Text style={{ textAlign: "center", color: "white", fontSize: 15, fontWeight: "600" }}>START</Text>
      </Pressable>
    </>
  );
};
export default WorkoutScreen

const styles = StyleSheet.create({});
