import {Pressable,StyleSheet,SafeAreaView,Text,View,Image,Platform,TouchableOpacity,} from "react-native";
import { useNavigation} from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect } from "@react-navigation/native";
import {Table,TableWrapper,Row,Rows,Col} from "react-native-table-component";
import moment from "moment";

const Perfil = () => {
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = React.useState();
  const [selectedDate, setSelectedDate] = React.useState("");
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


  const medidas = {
    tableHead: ["Datas", moment(selectedDate || userDetails?.date).format("DD/MM/YYYY"), ""],
    tableTitle: [
      "Ombros",
      "Braço Direito",
      "Braço Esquerdo",
      "Tórax",
      "Abdomén",
      "Quadril",
      "Coxa Direita",
      "Coxa Esquerda",
    ],
    tableData: [
      [userDetails?.ombros || "", ""],
      [userDetails?.braçodireito || "", ""],
      [userDetails?.braçoesquerdo || "", ""],
      [userDetails?.torax || "", ""],
      [userDetails?.abdomen || "", ""],
      [userDetails?.quadril || "", ""],
      [userDetails?.coxadireita || "", ""],
      [userDetails?.coxaesquerda || "", ""],
    ],
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
            color="black"
            onPress={() => navigation.navigate("EditarPerfil")}
          />
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.imageContainer}>
              {image && <Image source={{ uri: image }} style={styles.image} />}
              {!image && (
                <Image
                  source={{
                    uri: "https://digimedia.web.ua.pt/wp-content/uploads/2017/05/default-user-image.png",
                  }}
                  style={styles.image}
                />
              )}
            </View>
          </TouchableOpacity>
          <View style={styles.detailsContainer}>
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
          </View>
        </View>
      </View>

      <View style={styles.MainTable}>
        <Table borderStyle={{ borderWidth: 1 }}>
          <Row
            data={medidas.tableHead}
            flexArr={[1, 1, 1, 1, 1]}
            style={styles.tableheader}
            textStyle={styles.tableheader_text}
          />
          

          <TableWrapper style={styles.tableWrapper}>
            <Col data={medidas.tableTitle} textStyle={styles.textTitle} />

            <Rows
              style={styles.stats}
              data={medidas.tableData}
              flexArr={[1, 1]}
              textStyle={styles.textstats}
            />
          </TableWrapper>
        </Table>
        <View style={styles.btnContainer}>
          <Pressable
            style={styles.btnstyle}
            onPress={() => navigation.navigate("EditarMedidas")}
          >
            <Text style={styles.btnText}>Editar</Text>
          </Pressable>
          <Pressable
            style={styles.btnstyle}
            onPress={() => navigation.navigate("EditarMedidas")}
          >
            <Text style={styles.btnText}>Limpar</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 15,
    paddingTop: Platform.OS === "android" ? 45 : 0,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  container: {
    flex: 1,
    marginTop: 20,
    marginLeft: 25,
    backgroundColor: "#f0f0f0",
    flexDirection: "column",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    width: 110,
    height: 110,
    borderRadius: 75,
    overflow: "hidden",
    marginBottom: 0,
    borderWidth: 2,
    backgroundColor: "#f2f2f2",
    alignSelf: "flex-start",
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
  detailsContainer: {
    flexDirection: "column",
    marginLeft: 20,
    flex: 1,
  },

  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  infoBox: {
    alignItems: "center",
  },

  infoTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  infoSubtitle: {
    fontSize: 16,
    color: "#a3a3a3",
  },
  MainTable: {
    flex: 1,
    padding: 20,
    marginBottom: 280,
  },
  tableheader: {
    height: 40,
    backgroundColor: "#325288",
  },
  tableheader_text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
  },
  tableWrapper: {
    flexDirection: "row",
    backgroundColor: "#325288",
  },
  textTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  textstats: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  stats: {
    height: 40,
    backgroundColor: "#fff",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  btnText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
  },
  btnstyle: {
    backgroundColor: "#325288",
    borderRadius: 10,
    padding: 10,
    width: 130,
  },
});

export default Perfil;
