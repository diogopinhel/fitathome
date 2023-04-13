import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import FitnessCardsHome from "../components/FitnessCardsHome";

const HomeScreen = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState();
  const [countexercisesTotal, setCountexExercisesTotal] = useState(0);
  const [countplansTotal, setCountPlansTotal] = useState(0);
  useEffect(() => {
    getUserData();
  }, []);

  //Obter dados do utilizador da Async
  const getUserData = async () => {
    const userData = await AsyncStorage.getItem("userData");
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

  const getcountexercisesTotal = async () => {
    const value = await AsyncStorage.getItem("countexercisesTotal");
    const countExercises = await AsyncStorage.getItem("countExercises");
    const updatedValue = parseInt(value || 0) + parseInt(countExercises || 0);
    setCountexExercisesTotal(updatedValue);
    await AsyncStorage.setItem("countexercisesTotal", updatedValue.toString());
    await AsyncStorage.setItem("countExercises", "0");
  };

  const getcountplansTotal = async () => {
    const value1 = await AsyncStorage.getItem("countplansTotal");
    const countPlans = await AsyncStorage.getItem("countPlans");
    const updatedValue = (parseInt(value1) || 0) + (parseInt(countPlans) || 0);
    setCountPlansTotal(updatedValue);
    await AsyncStorage.setItem("countplansTotal", updatedValue.toString());
    await AsyncStorage.setItem("countPlans", "0");
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
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleMenuPress}>
          <Ionicons name="menu-outline" size={48} color="black" />
        </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.greeting}>Olá, {userDetails?.fullname}</Text>
          <Text style={styles.subtitle}>Vamos lá treinar!</Text>
        </View>
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
      <Text style={styles.Title}>Planos em Destaques</Text>
      <FitnessCardsHome></FitnessCardsHome>
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
  iconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  titleContainer: {
    flex: 7,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    top:8,
  },
  greeting: {
    flex: 1,
    fontSize: 24,
    fontWeight: "600",
    color: "#0c0d34",
    marginRight: 130,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    top:10,
    marginRight: 130,

  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginVertical: 30,
    },
    
    statBox: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    padding: 16,
    width: "45%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    },
    
    statIcon: {
    fontSize: 32,
    color: "#ff6b6b",
    marginBottom: 8,
    },
    
    statLabel: {
    fontSize: 16,
    fontWeight: "400",
    color: "#0c0d34",
    opacity: 0.5,
    textTransform: "uppercase",
    },
    
    statValue: {
    fontSize: 26,
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
    textTransform: "uppercase",
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
  exercisesContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  exerciseImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0c0d34",
  },
  Title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0c0d34",
    top: 70,
    marginLeft: 20,
  },
});

export default HomeScreen;
