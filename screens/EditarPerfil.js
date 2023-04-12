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

const EditarPerfil = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: "",
    fullname: "",
    age: "",
    height: "",
    weight: "",
    password: "",
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

    if (!inputs.email) {
      handleError("Insira um email", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\gmail\.\S+/)) {
      handleError("Insira um email válido", "email");
      isValid = false;
    }

    if (!inputs.fullname) {
      handleError("Insira o seu nome completo", "fullname");
      isValid = false;
    }

    if (!inputs.age) {
      handleError("Insira a sua idade", "age");
      isValid = false;
    } else if (inputs.weight.length > 4) {
      handleError("Selecione uma idade válida", "age");
      isValid = false;
    }

    if (!inputs.weight) {
      handleError("Insira o seu peso", "weight");
      isValid = false;
    } else if (inputs.weight.length > 4) {
      handleError("Selecione um peso valido", "weight");
      isValid = false;
    }
    if (!inputs.height) {
      handleError("Insira a sua altura em centimetros", "height");
      isValid = false;
    } else if (inputs.widht > 280) {
      handleError("Selecione uma altura valida", "height");
      isValid = false;
    }

    if (!inputs.password) {
      handleError("Insira uma palavra passe", "password");
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError("A palavra passe dever ter pelo menos 5 digitos", "password");
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
          Perfil
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Insira as suas informações
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            value={inputs.email}
            iconName="email"
            label="Email"
            placeholder="Insira o seu email"
            error={errors.email}
          />

          <Input
            onChangeText={(text) => handleOnchange(text, "fullname")}
            onFocus={() => handleError(null, "fullname")}
            value={inputs.fullname}
            iconName="account"
            label="Nome"
            placeholder="Insira o seu nome"
            error={errors.fullname}
          />

          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "age")}
            value={inputs.age}
            onFocus={() => handleError(null, "age")}
            iconName="calendar-month"
            label="Idade"
            placeholder="Insira a sua idade"
            error={errors.age}
          />

          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "weight")}
            value={inputs.weight}
            onFocus={() => handleError(null, "weight")}
            iconName="weight"
            label="Peso"
            placeholder="Insira o seu peso"
            error={errors.weight}
          />
          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "height")}
            value={inputs.height}
            onFocus={() => handleError(null, "height")}
            iconName="human-male"
            label="Altura"
            placeholder="Insira a sua altura em centimetros"
            error={errors.weight}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "password")}
            onFocus={() => handleError(null, "password")}
            value={inputs.password}
            iconName="lock"
            label="Password"
            placeholder="Insira a sua palavra-passe"
            error={errors.password}
            password
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

export default EditarPerfil;
