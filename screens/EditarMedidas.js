import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";

import COLORS from "../login/conts/colors";
import Button from "../login/views/components/Button";
import Input from "../login/views/components/Input";
import Loader from "../login/views/components/Loader";
import { Ionicons } from "@expo/vector-icons";

const EditarMedidas = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    ombros: "80",
    braçodireito: "",
    braçoesquerdo: "",
    antebraçodireito: "",
    antebraçoesquerdo: "",
    torax: "",
    abdomen: "",
    quadril: "",
    coxadireita: "",
    coxaesquerda: "",
    gemeodireito: "",
    gemioesquerdo: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await AsyncStorage.getItem("userData");
        if (data) {
          const parsedData = JSON.parse(data);
          setInputs(parsedData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadData();
  }, []);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.ombros) {
      handleError("Insira a medida dos ombros", "ombros");
      isValid = false;
    }

    if (!inputs.braçodireito) {
      handleError("Insira a medida do braço direto", "braçodireito");
      isValid = false;
    }

    if (!inputs.braçoesquerdo) {
      handleError("Insira a medida do braço esquerdo", "braçoesquerdo");
      isValid = false;
    }

    if (!inputs.torax) {
      handleError("Insira a medida do toráx", "torax");
      isValid = false;
    }

    if (!inputs.abdomen) {
      handleError("Insira a medida do abdomén", "abdomen");
      isValid = false;
    }

    if (!inputs.quadril) {
      handleError("Insira a medida do quadril", "quadril");
      isValid = false;
    }

    if (!inputs.coxadireita) {
      handleError("Insira a medida da coxa direita", "coxadireita");
      isValid = false;
    }

    if (!inputs.coxaesquerda) {
      handleError("Insira a medida do toráx", "coxaesquerda");
      isValid = false;
    }

    if (!inputs.gemeodireito) {
      handleError("Insira a medida do toráx", "gemeodireito");
      isValid = false;
    }

    if (!inputs.gemeoesquerdo) {
      handleError("Insira a medida do toráx", "gemeoesquerdo");
      isValid = false;
    }

    if (isValid) {
      salvar();
    }
  };

  const salvar = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
        AsyncStorage.setItem("userData", JSON.stringify(inputs));
        navigation.navigate("Tab");
      } catch (error) {
        Alert.alert("Error", "Algo deu errado");
      }
    }, 3000);
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
      >
        <Ionicons
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", top: 40, left: 25 }}
          name="arrow-back-outline"
          size={24}
          color="black"
        />
        <Text
          style={{
            color: COLORS.black,
            fontSize: 40,
            marginTop: 20,
            fontWeight: "bold",
          }}
        >
          Medidas
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Insira as suas medidas
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "ombros")}
            value={inputs.ombros}
            onFocus={() => handleError(null, "ombros")}
            label="Ombros"
            placeholder="Insira a medida dos ombros"
            error={errors.ombros}
          />

          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "braçodireito")}
            value={inputs.braçodireito}
            onFocus={() => handleError(null, "braçodireito")}
            label="Braço Direito"
            placeholder="Insira a medida do braço direito"
            error={errors.braçodireito}
          />

          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "braçoesquerdo")}
            value={inputs.braçoesquerdo}
            onFocus={() => handleError(null, "braçoesquerdo")}
            label="Braço esquerdo"
            placeholder="Insira a medida do braço esquerdo"
            error={errors.braçoesquerdo}
          />

          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "torax")}
            value={inputs.torax}
            onFocus={() => handleError(null, "torax")}
            label="Toráx"
            placeholder="Insira a medida do toráx"
            error={errors.torax}
          />

          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "abdomen")}
            value={inputs.abdomen}
            onFocus={() => handleError(null, "abdomen")}
            label="Abdómen"
            placeholder="Insira a medida do abdómen"
            error={errors.abdomen}
          />

          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "quadril")}
            value={inputs.quadril}
            onFocus={() => handleError(null, "quadril")}
            label="Quadril"
            placeholder="Insira a medida do quadril"
            error={errors.quadril}
          />

          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "coxadireita")}
            value={inputs.coxadireita}
            onFocus={() => handleError(null, "coxadireita")}
            label="Coxa direta"
            placeholder="Insira a medida da coxa direita"
            error={errors.coxadireita}
          />

          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "coxaesquerda")}
            value={inputs.coxaesquerda}
            onFocus={() => handleError(null, "coxaesquerda")}
            label="Coxa esquerda"
            placeholder="Insira a medida da coxa esquerda"
            error={errors.coxaesquerda}
          />

          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "gemeodireito")}
            value={inputs.gemeodireito}
            onFocus={() => handleError(null, "gemeodireito")}
            label="Gémeo direito"
            placeholder="Insira a medida do gémeo direito"
            error={errors.gemeodireito}
          />

          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "gemeoesquerdo")}
            value={inputs.gemeoesquerdo}
            onFocus={() => handleError(null, "gemeoesquerdo")}
            label="Gémeo esquerdo"
            placeholder="Insira a medida do gémeo esquerdo"
            error={errors.gemeoesquerdo}
          />

          <Button title="Salvar" onPress={validate} />
          <Text
            onPress={() => navigation.navigate("Tab")}
            style={{
              color: COLORS.black,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}
          ></Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditarMedidas;
