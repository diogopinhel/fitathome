import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import FitnessData from "../data/FitnessData";

const FitnessCards = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {FitnessData.map((item, key) => (
        <Pressable
          onPress={() =>
            navigation.navigate("WorkoutScreen", {
              image: item.image,
              exercises: item.exercises,
              id: item.id,
            })
          }
          style={styles.cardContainer}
          key={key}
        >
          <Image style={styles.cardImage} source={{ uri: item.image }}></Image>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <View style={styles.cardDifficulty}>
              {[1, 2, 3].map((star) => (
                <AntDesign
                  key={star}
                  name="star"
                  size={18}
                  color={star <= item.difficulty ? "#FFC107" : "#E1E1E1"}
                />
              ))}
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardContainer: {
    width: "48%",
    borderRadius: 7,
    marginBottom: 20,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  cardImage: {
    width: "100%",
    height: 120,
    borderRadius: 7,
  },
  cardInfo: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardDifficulty: {
    flexDirection: "row",
  },
});

export default FitnessCards;
