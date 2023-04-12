import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React from "react";
import FitnessCards from "../components/FitnessCards";
import { useNavigation } from "@react-navigation/native";

const WorkoutPlans = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={{}}>
      <View
        style={{
          backgroundColor: "#2E9AFE",
          width: "100%",
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 18,
            bottom: 20,
            left: 10,
          }}
        >
          HOME WORKOUT{" "}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            top: 60,
          }}
        >
          <Pressable>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 18,
                bottom: 20,
                left: 15,
                textAlign: "left",
              }}
            >
              INICIANTE{" "}
            </Text>
          </Pressable>

          <Pressable>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 18,
                bottom: 20,
                right: 5,
                textAlign: "center",
              }}
            >
              INTERMEDIÁRIO{" "}
            </Text>
          </Pressable>

          <Pressable>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 18,
                bottom: 20,
                right: 15,
                textAlign: "right",
              }}
            >
              DIFÍCIL{" "}
            </Text>
          </Pressable>
        </View>
        <FitnessCards></FitnessCards>
      </View>
    </ScrollView>
  );
};
export default WorkoutPlans;

const styles = StyleSheet.create({});
