import { Text, View, Pressable, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import FitnessData from "../data/FitnessData";

const FitnessCardsHome = () => {
  const navigation = useNavigation();

  // Select the desired plans
  const selectedPlans = [
    FitnessData[11], // Plan 1
    FitnessData[2], // Plan 3
    FitnessData[4], // Plan 5
    FitnessData[6], // Plan 7
  ];

  return (
    <View
      style={{
        marginTop: 80,
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      {/* Map through the selected plans */}
      <View>
        {selectedPlans.slice(0, 2).map((item, key) => (
          <Pressable
            onPress={() =>
              navigation.navigate("WorkoutScreen", {
                image: item.image,
                exercises: item.exercises,
                id: item.id,
              })
            }
            style={{
              alignItems: "center",
              justifyContent: "center",
              margin: 20,
            }}
            key={key}
          >
            <Image
              style={{
                width: "100%",
                height: 120,
                width: 160,
                borderRadius: 10,
              }}
              source={{ uri: item.image }}
            ></Image>
            <Text
              style={{
                position: "absolute",
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                left: 10,
                top: 25,
              }}
            >
              {item.name}
            </Text>
          </Pressable>
        ))}
      </View>

      <View>
        {/* Map through the selected plans */}
        {selectedPlans.slice(2, 4).map((item, key) => (
          <Pressable
            onPress={() =>
              navigation.navigate("WorkoutScreen", {
                image: item.image,
                exercises: item.exercises,
                id: item.id,
              })
            }
            style={{
              alignItems: "center",
              justifyContent: "center",
              margin: 20,
            }}
            key={key}
          >
            <Image
              style={{
                width: "100%",
                height: 120,
                width: 160,
                borderRadius: 7,
              }}
              source={{ uri: item.image }}
            ></Image>
            <Text
              style={{
                position: "absolute",
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                left: 10,
                top: 25,
              }}
            >
              {item.name}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default FitnessCardsHome;
