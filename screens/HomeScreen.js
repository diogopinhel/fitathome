import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState();
  const [countexercisesTotal, setcountexercisesTotal] = useState(0);
  const [countplansTotal, setCountPlansTotal] = useState(0);
  useEffect(() => {
    getUserData();
  }, []);

  //Obter dados do usuario da Async
  const getUserData = async () => {
    const userData = await AsyncStorage.getItem("userData");
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

  const getcountexercisesTotal = async () => {
    const value = await AsyncStorage.getItem("countexercisesTotal");
    const countExercises = await AsyncStorage.getItem("countExercises");
    const updatedValue =
      (parseInt(value) || 0) + (parseInt(countExercises) || 0);
    setcountexercisesTotal(updatedValue);
  };

  const getcountplansTotal = async () => {
    const value1 = await AsyncStorage.getItem("countplansTotal");
    const countPlans = await AsyncStorage.getItem("countPlans");
    const updatedValue = (parseInt(value1) || 0) + (parseInt(countPlans) || 0);
    setCountPlansTotal(updatedValue);
  };

  //Atualizar sempre que a tela é carregada
  useFocusEffect(
    React.useCallback(() => {
      getcountexercisesTotal();
      getcountplansTotal();
    }, [])
  );

  //Abrir Tela lateral
  const handleMenuPress = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleMenuPress}>
          <Ionicons name="menu-outline" size={48} color="black" />
        </TouchableOpacity>
        <Text style={styles.greeting}>Olá, {userDetails?.fullname}</Text>
        <Text style={styles.subtitle}>Vamos lá treinar!</Text>
      </View>
      <View style={styles.stats}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Exercícios</Text>
          <Text style={styles.statValue}>{countexercisesTotal}</Text>
          <Text style={styles.statSubtitle}>Finalizados</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Planos</Text>
          <Text style={styles.statValue}>{countplansTotal}</Text>
          <Text style={styles.statSubtitle}>Finalizados</Text>
        </View>
      </View>
      <View style={styles.workoutSection}>
        <Text style={styles.sectionTitle}>Treinos Recentes</Text>
        <TouchableOpacity style={styles.workoutBox}>
          <View style={styles.workoutBoxIcon}>
            <Ionicons name="fitness-outline" size={24} color="black" />
          </View>
          <View style={styles.workoutBoxContent}>
            <Text style={styles.workoutBoxTitle}>Treino de Pernas</Text>
            <Text style={styles.workoutBoxSubtitle}>
              Concluído em 9 de abril de 2023
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.workoutBox}>
          <View style={styles.workoutBoxIcon}>
            <Ionicons name="fitness-outline" size={24} color="black" />
          </View>
          <View style={styles.workoutBoxContent}>
            <Text style={styles.workoutBoxTitle}>Treino de Abdômen</Text>
            <Text style={styles.workoutBoxSubtitle}>
              Concluído em 7 de abril de 2023
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.workoutBox}>
          <View style={styles.workoutBoxIcon}>
            <Ionicons name="fitness-outline" size={24} color="black" />
          </View>
          <View style={styles.workoutBoxContent}></View>
          <View style={styles.workoutBoxContent}>
            <Text style={styles.workoutBoxTitle}>Treino de Costas</Text>
            <Text style={styles.workoutBoxSubtitle}>
              Concluído em 5 de abril de 2023
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 24,
    paddingVertical: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "600",
    color: "#0c0d34",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#0c0d34",
    opacity: 0.5,
    marginTop: 4,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginVertical: 32,
  },
  statBox: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    padding: 16,
    width: "47%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  statLabel: {
    fontSize: 16,
    fontWeight: "400",
    color: "#0c0d34",
    opacity: 0.5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "600",
    color: "#0c0d34",
    marginTop: 4,
  },
  statSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#0c0d34",
    opacity: 0.5,
    marginTop: 4,
  },
  workoutSection: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0c0d34",
    marginBottom: 16,
  },
  workoutBox: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  workoutBoxIcon: {
    backgroundColor: "#e5e5e5",
    borderRadius: 8,
    padding: 8,
  },
  workoutBoxContent: {
    marginLeft: 16,
  },
  workoutBoxTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0c0d34",
  },
  workoutBoxSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#0c0d34",
    opacity: 0.5,
    marginTop: 4,
  },
});

export default HomeScreen;
