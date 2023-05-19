import { Text, View, Pressable, Image, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import FitnessData from "../data/FitnessData";
import { AntDesign } from "@expo/vector-icons";

const FitnessCardsHome = () => {
  const navigation = useNavigation();

  const selectedPlans = [
    FitnessData[1],
    FitnessData[8],
    FitnessData[3],
    FitnessData[17],
  ];

  return (
    <View
      style={{
        marginTop: 80,
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
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
            />
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
            <View style={styles.starContainer}>
              {[1, 2, 3].map((star) => (
                <AntDesign
                  key={star}
                  name="star"
                  size={18}
                  color={star <= item.difficulty ? "#FFC107" : "#E1E1E1"}
                />
              ))}
            </View>
          </Pressable>
        ))}
      </View>

      <View>
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
            />
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
            <View style={styles.starContainer}>
              {[1, 2, 3].map((star) => (
                <AntDesign
                  key={star}
                  name="star"
                  size={18}
                  color={star <= item.difficulty ? "#FFC107" : "#E1E1E1"}
                />
              ))}
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default FitnessCardsHome;
const styles = StyleSheet.create({
  starContainer: {
    position: "absolute",
    bottom: 15,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
