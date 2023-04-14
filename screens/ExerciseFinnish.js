import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ExerciseFinish = () => {
  const navigation = useNavigation();
  const [countExercises, setCountExercises] = useState(0);
  const [countPlans, setCountPlans] = useState(1);

  useEffect(() => {
    const getExerciseCount = async () => {
      try {
        const value = await AsyncStorage.getItem("countExercises");
        setCountExercises(parseInt(value) || 0);
      } catch (error) {
        console.error(error);
      }
    };
    getExerciseCount();
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
  }, [countPlans]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../images/Trofeu.png")}
      />
      <Text style={styles.heading}>
        Parabéns, você concluiu o treino!
      </Text>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Planos</Text>
          <Text style={styles.statValue}>{countPlans}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Exercícios</Text>
          <Text style={styles.statValue}>{countExercises}</Text>
        </View>
      </View>
      <Pressable
        onPress={() => navigation.navigate("Tab")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>CONTINUAR</Text>
      </Pressable>
    </View>
  );
};

export default ExerciseFinish;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E90FF",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 50,
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 50,
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  statValue: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#1E90FF",
    fontWeight: "bold",
    fontSize: 18,
  },
});