import { StyleSheet, Text, View, ScrollView, Pressable, Image } from "react-native";
import React from "react";
import FitnessCards from "../components/FitnessCards";
import { useNavigation } from "@react-navigation/native";

const WorkoutPlans = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={{}}>
      <View style={styles.container}>
        <Text style={styles.heading}>Planos</Text>
        <FitnessCards />
      </View>
    </ScrollView>
  );
};

export default WorkoutPlans;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
    backgroundColor: "#f0f0f0",
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
  },
});
