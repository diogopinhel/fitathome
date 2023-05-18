import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";
import COLORS from "../../conts/colors";
import Button from "../components/Button";
import Input from "../components/Input";
import Loader from "../components/Loader";

const RegistrationScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    fullname: "",
    email: "",
    age: "",
    height: "",
    weight: "",
    password: "",
  });

  const resetAsyncStorage = async () => {
    await AsyncStorage.setItem("countexercisesTotal", "0");
    await AsyncStorage.setItem("countExercises", "0");
    await AsyncStorage.setItem("countplansTotal", "0");
    await AsyncStorage.setItem("countPlans", "0");
    await AsyncStorage.removeItem("image");
    await AsyncStorage.setItem("userMedidas", "0");
    await AsyncStorage.setItem("userNewMedidas", "0");
  };

  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.fullname) {
      handleError("Insira o seu nome completo", "fullname");
      isValid = false;
    }

    if (!inputs.email) {
      handleError("Insira um email", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\gmail\.\S+/)) {
      handleError("Insira um email válido", "email");
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
      handleError("Insira a sua altura em centímetros", "height");
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
      register();
      resetAsyncStorage();
    }
  };

  const register = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
        AsyncStorage.setItem("userData", JSON.stringify(inputs));
        navigation.navigate("LoginScreen");
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
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>
          Registe-se
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Insira as suas informações pessoais
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "fullname")}
            onFocus={() => handleError(null, "fullname")}
            iconName="account"
            label="Nome"
            placeholder="Insira o seu nome"
            error={errors.fullname}
          />

          <Input
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            iconName="email"
            label="Email"
            placeholder="Insira o seu email"
            error={errors.email}
          />

          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "age")}
            onFocus={() => handleError(null, "age")}
            iconName="calendar-month"
            label="Idade"
            placeholder="Insira a sua idade"
            error={errors.age}
          />

          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "weight")}
            onFocus={() => handleError(null, "weight")}
            iconName="weight"
            label="Peso"
            placeholder="Insira o seu peso"
            error={errors.weight}
          />
          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "height")}
            onFocus={() => handleError(null, "height")}
            iconName="human-male"
            label="Altura"
            placeholder="Insira a sua altura em centímetros"
            error={errors.weight}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "password")}
            onFocus={() => handleError(null, "password")}
            iconName="lock"
            label="Palavra-passe"
            placeholder="Insira a sua palavra-passe"
            error={errors.password}
            password
          />
          <Button title="Registar" onPress={validate} />
          <Text
            onPress={() => navigation.navigate("LoginScreen")}
            style={{
              color: COLORS.black,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Já possui conta? Conecte-se Já
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;
