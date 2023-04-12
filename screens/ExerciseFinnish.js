import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ExerciseFinnish = () => {
  const navigation = useNavigation();
  const [countExercises, setCountExercises] = useState(0);
  const [countPlans, setCountPlans] = useState(1);

  useEffect(() => {
    const getexerciseCount = async () => {
      try {
        const value = await AsyncStorage.getItem("countExercises");
        setCountExercises(parseInt(value) || 0);
      } catch (error) {
        console.error(error);
      }
    };
    getexerciseCount();
  }, []);

  useEffect(() => {
    const getCountPlans = async () => {
      try {
        await AsyncStorage.setItem("countPlans", countPlans.toString());
      } catch (error) {
        console.error(error);
      }
    };
    setCountPlans(countPlans);
    getCountPlans();
  }, []);

  return (
    <View style={{ backgroundColor: "#2E9AFE" }}>
      <Image
        style={{
          width: 180,
          height: 180,
          top: 60,
          marginLeft: 108,
          marginRight: "auto",
        }}
        source={require("../images/Trofeu.png")}
      />
      <Text
        style={{
          color: "#FFFFFF",
          marginLeft: "auto",
          marginRight: "auto",
          fontSize: 20,
          top: 50,
          fontWeight: "bold",
        }}
      >
        Parabens você conclui-o o treino!
      </Text>
      <Text
        style={{
          color: "#FFFFFF",
          marginLeft: 255,
          marginRight: "auto",
          fontSize: 18,
          marginTop: 70,
        }}
      >
        Planos
      </Text>
      <Text
        style={{
          color: "#FFFFFF",
          marginLeft: 283,
          marginRight: "auto",
          fontSize: 18,
          top: 20,
        }}
      >
        {countPlans}
      </Text>
      <Text
        style={{
          color: "#FFFFFF",
          marginLeft: "auto",
          marginRight: 245,
          fontSize: 18,
          marginTop: -49,
        }}
      >
        Exercicios
      </Text>
      <Text
        style={{
          color: "#FFFFFF",
          marginLeft: "auto",
          marginRight: 280,
          fontSize: 18,
          top: 20,
        }}
      >
        {countExercises}
      </Text>

      <Pressable
        onPress={() => navigation.navigate("Tab")}
        style={{
          backgroundColor: "blue",
          padding: 10,
          marginLeft: "auto",
          marginRight: "auto",
          marginVertical: 300,
          borderRadius: 6,
          width: 140,
        }}
      >
        <Text
          style={{
            texltAign: "center",
            color: "white",
            fontSize: 15,
            fontWeight: "600",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          CONTINUAR
        </Text>
      </Pressable>
    </View>
  );
};

export default ExerciseFinnish;

const style = StyleSheet.create({});
