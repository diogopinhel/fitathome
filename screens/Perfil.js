import {
  Pressable,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  Platform,
  Button,
  Item,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

const Perfil = () => {
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = React.useState();
  React.useEffect(() => {
    getUserData();
  }, []);

  //Ir buscar dados do login
  const getUserData = async () => {
    const userData = await AsyncStorage.getItem("userData");
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      saveImage(result.uri);
    }
  };
  const saveImage = async (image) => {
    await AsyncStorage.setItem("image", image);
  };

  const loadImage = async () => {
    try {
      const image = await AsyncStorage.getItem("image");
      if (image !== null) {
        setImage(image);
      }
    } catch (error) {
      console.log("Erro ao carregar imagem:", error);
    }
  };

  useEffect(() => {
    loadImage();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getUserData();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: "#f0f0f0" }}>
        <View style={styles.header}>
          <View
            style={{ flexDirection: "row", alignItems: "center", bottom: 10 }}
          >
            <Text style={styles.headerTitle}>Perfil</Text>
          </View>
          <View style={{ bottom: 10 }}>
            <MaterialIcons
              name="edit"
              size={26}
              color="white"
              onPress={() => navigation.navigate("EditarPerfil")}
            />
          </View>
        </View>

        <View style={styles.container}>
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.imageContainer}>
              {image && <Image source={{ uri: image }} style={styles.image} />}
              {!image && (
                <Image
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/3135/3135768.png",
                  }}
                  style={styles.image}
                />
              )}
            </View>
          </TouchableOpacity>
          <Text style={styles.name}>{userDetails?.fullname}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>{userDetails?.age}</Text>
              <Text style={styles.infoSubtitle}>Idade</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>{userDetails?.weight}</Text>
              <Text style={styles.infoSubtitle}>Peso</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>{userDetails?.height}</Text>
              <Text style={styles.infoSubtitle}>Altura</Text>
            </View>
          </View>

          <View style={styles.measurementsContainer}>
            <Text style={styles.measurementsTitle}>Medidas</Text>
            <View style={styles.measurementsTable}>
              <View style={styles.measurementsRow}>
                <Text style={styles.measurementsLabel}>Ombros</Text>
                <Text style={styles.measurementsValue}>
                  {userDetails?.ombros}
                </Text>
              </View>
              <View style={styles.measurementsRow}>
                <Text style={styles.measurementsLabel}>Braço direito</Text>
                <Text style={styles.measurementsValue}>
                  {userDetails?.bracoDireito}
                </Text>
              </View>
              <View style={styles.measurementsRow}>
                <Text style={styles.measurementsLabel}>Braço esquerdo</Text>
                <Text style={styles.measurementsValue}>
                  {userDetails?.bracoEsquerdo}
                </Text>
              </View>
              <View style={styles.measurementsRow}>
                <Text style={styles.measurementsLabel}>Torax</Text>
                <Text style={styles.measurementsValue}>
                  {userDetails?.torax}
                </Text>
              </View>
              <View style={styles.measurementsRow}>
                <Text style={styles.measurementsLabel}>Abdomen</Text>
                <Text style={styles.measurementsValue}>
                  {userDetails?.abdomen}
                </Text>
              </View>
              <View style={styles.measurementsRow}>
                <Text style={styles.measurementsLabel}>Quadril</Text>
                <Text style={styles.measurementsValue}>
                  {userDetails?.quadril}
                </Text>
              </View>
              <View style={styles.measurementsRow}>
                <Text style={styles.measurementsLabel}>Coxa direita</Text>
                <Text style={styles.measurementsValue}>
                  {userDetails?.coxaDireita}
                </Text>
              </View>
              <View style={styles.measurementsRow}>
                <Text style={styles.measurementsLabel}>Coxa esquerda</Text>
                <Text style={styles.measurementsValue}>
                  {userDetails?.coxaEsquerda}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#2E9AFE",
    paddingHorizontal: 15,
    paddingTop: Platform.OS === "android" ? 45 : 0,
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#f0f0f0",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#2E9AFE",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },

  infoTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  infoSubtitle: {
    fontSize: 16,
    color: "#a3a3a3",
  },
  btnContainer: {
    gap: 4,
    flex: 1,
    marginVertical: 40,
    width: "80%",
    gap: 4,
    flexDirection: "column",
    justifyContent: "space-around",
    marginVertical: 40,
    marginBottom: 10,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "black",
    padding: 10,
    marginTop: 10,
  },
  measurementsContainer: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
  },
  measurementsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  measurementsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  measurementsLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  measurementsValue: {
    fontSize: 16,
    color: "#666",
  },
  measurementsSeparator: {
    backgroundColor: "#ccc",
    height: 1,
    width: "100%",
    marginVertical: 10,
  },
});

export default Perfil;
