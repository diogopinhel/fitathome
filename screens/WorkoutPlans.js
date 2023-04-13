import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React from "react";
import FitnessCards from "../components/FitnessCards";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from "react-native-web";

const WorkoutPlans = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={{}}>
     <ImageBackground   style={styles.backgroundImage}
      source={{ uri: 'https://img.freepik.com/fotos-gratis/homem-jovem-fitness-em-estudio_7502-5008.jpg' }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            top: 60,
          }}
        >
        </View>
        <FitnessCards></FitnessCards>
        </ImageBackground>
    </ScrollView>
  );
};
export default WorkoutPlans;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
