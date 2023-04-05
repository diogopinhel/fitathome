import { StyleSheet, Text, View,SafeAreaView,Image, Pressable} from "react-native";
import React, { useState } from "react";
import { useNavigation} from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AjustarRestScreen= () => {
  const navigation = useNavigation();
  const [timeLeft, setTimeLeft] = useState(60);

  const increaseTime = () => {
    setTimeLeft(timeLeft + 1);
  };

  const decreaseTime = () => {
    setTimeLeft(timeLeft - 1);
  };
  

  const saveTime = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      const updatedUserData = JSON.parse(userData) ?? {};
      updatedUserData.RestTime = timeLeft;
      await AsyncStorage.mergeItem('userData', JSON.stringify(updatedUserData));
      navigation.goBack();
    } catch (e) {
      console.error(e);
    }
  };


  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Ionicons onPress={() => navigation.goBack()} style={styles.backButton} name="arrow-back-outline" size={24} color="white" />
        <Text style={styles.title}>DESCANSO</Text>
      </View>
      <Text style={styles.timerText}>{timeLeft}</Text>
      <View style={styles.timeAdjustmentContainer}>
        <Ionicons onPress={decreaseTime} style={styles.timeAdjustmentIcon} name="remove-outline" size={24} color="black" />
        <Text style={styles.timeAdjustmentText}>Ajustar tempo de descanso</Text>
        <Ionicons onPress={increaseTime} style={styles.timeAdjustmentIcon} name="add-outline" size={24} color="black" />
      </View>
      <Pressable onPress={saveTime} style={styles.nextButton}>
      <Text style={styles.nextButtonText}>Salvar</Text>
      </Pressable>
      
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "blue",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 20,
    top:15
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginRight:"auto",
    marginLeft:60,
    top:15 
  },
  timerIcon: {
    marginLeft: 20,
  },
  timerText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 50,
    textAlign: "center",
  },
  timeAdjustmentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 40,
    marginTop: 20,
  },
  timeAdjustmentIcon: {
    backgroundColor: "#D3D3D3",
    borderRadius: 10,
    padding: 5,
  },
  timeAdjustmentText: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 20,
  },
  nextButton: {
    backgroundColor: "blue",
    borderRadius: 20,
    padding: 10,
    width: 140,
    top: 40,
    marginLeft: "auto",
    marginRight: "auto",
  },
  nextButtonText: {
    color: "white" }});

    export default AjustarRestScreen;