import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";

const AjustarRestScreen = () => {
  const navigation = useNavigation();
  const [timeLeft, setTimeLeft] = useState(60);

  const increaseTime = () => {
    setTimeLeft(timeLeft + 1);
  };

  const decreaseTime = () => {
    setTimeLeft(timeLeft - 1);
  };

  const saveTime = async () => {
   
      const userData = await AsyncStorage.getItem("userData");
      const updatedUserData = JSON.parse(userData) ?? {};
      updatedUserData.RestTime = timeLeft;
      await AsyncStorage.mergeItem("userData", JSON.stringify(updatedUserData));
      ToastAndroid.show("Tempo salvo com sucesso!", ToastAndroid.SHORT,);
      navigation.goBack();
    }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          name="arrow-back-outline"
          size={24}
          color="white"
        />
        <Text style={styles.headerTitle}>DESCANSO</Text>
        <View style={styles.timerIconContainer}>
          <Ionicons name="time-outline" size={30} color="white" />
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.timerText}>{timeLeft}</Text>
        <View style={styles.timeAdjustmentContainer}>
          <Pressable
            onPress={decreaseTime}
            style={({ pressed }) => [
              styles.timeAdjustmentButton,
              {
                opacity: pressed ? 0.5 : 1,
              },
            ]}
          >
            <Ionicons
              style={styles.timeAdjustmentIcon}
              name="remove-outline"
              size={30}
              color="black"
            />
          </Pressable>
          <Text style={styles.timeAdjustmentText}>Ajustar tempo de descanso</Text>
          <Pressable
            onPress={increaseTime}
            style={({ pressed }) => [
              styles.timeAdjustmentButton,
              {
                opacity: pressed ? 0.5 : 1,
              },
            ]}
          >
            <Ionicons
              style={styles.timeAdjustmentIcon}
              name="add-outline"
              size={30}
              color="black"
            />
          </Pressable>
        </View>
        <Pressable onPress={saveTime} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
export default AjustarRestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#325288",
    paddingTop: 50,
    paddingBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 50,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  timerText: {
    fontSize: 100,
    fontWeight: "bold",
    marginTop: 70,
    textAlign: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    marginHorizontal: 30,
    marginTop: 30,
  },
  timeAdjustmentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 70,
  },
  timeAdjustmentButton: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 10,
  },
  timeAdjustmentIcon: {
    textAlign: "center",
  },
  timeAdjustmentText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#325288d",
    paddingVertical: 15,
    paddingHorizontal: 70,
    borderRadius: 50,
    marginBottom: 30,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});