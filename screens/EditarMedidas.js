import { View, Text, SafeAreaView, Keyboard, ScrollView, Alert, StyleSheet } from "react-native";
import React from "react";
import COLORS from "../login/conts/colors";
import Button from "../login/views/components/Button";
import Input from "../login/views/components/Input";
import Loader from "../login/views/components/Loader";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const EditarMedidas = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    date: "",
    ombros: "",
    braçodireito: "",
    braçoesquerdo: "",
    torax: "",
    abdomen: "",
    quadril: "",
    coxadireita: "",
    coxaesquerda: "",
  });
  
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const handleOnDateChange = (date) => {
    const dateString = date.toISOString().slice(0, 10);
    setInputs({ ...inputs, date: dateString });
  };

  //Caso clique na caixa de texto da data está mostra o DataTimePicker
  const handleOnPressDateInput = () => {
    setShowDatePicker(true);
  };


  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.date) {
      handleError("Insira a data", "date");
      isValid = false;
    }

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

    if (isValid) {
      salvar();
    }
  };

  const salvar = async () => {
    setLoading(true);
  
    try {
      const Medidas = await AsyncStorage.getItem("userMedidas");
      const MedidasObj = JSON.parse(Medidas);
  
      if (MedidasObj && MedidasObj.ombros && MedidasObj.torax && MedidasObj.abdomen && MedidasObj.quadril && MedidasObj.braçodireito && MedidasObj.braçoesquerdo && MedidasObj.coxadireita && MedidasObj.coxaesquerda) {
        // Se userMedidas já tiver medidas, crie uma nova chave "NewMedidas"
        console.log("userMedidas já tem medidas, criando nova chave NewMedidas");
        const NewMedidas = await AsyncStorage.getItem("userNewMedidas");
        let NewMedidasObj = NewMedidas ? JSON.parse(NewMedidas) : {};
  
        NewMedidasObj = {
          ombrosNewMedidas: inputs.ombros,
          braçodireitoNewMedidas: inputs.braçodireito,
          braçoesquerdoNewMedidas: inputs.braçoesquerdo,
          toraxNewMedidas: inputs.torax,
          abdomenNewMedidas: inputs.abdomen,
          quadrilNewMedidas: inputs.quadril,
          coxadireitaNewMedidas: inputs.coxadireita,
          coxaesquerdaNewMedidas: inputs.coxaesquerda,
          dateNewMedidas: inputs.date,
        };
  
        console.log("Salvando medidas em userNewMedidas:", NewMedidasObj);
        await AsyncStorage.setItem("userNewMedidas", JSON.stringify(NewMedidasObj));
      } else {
        // Caso contrário, atualize a chave "userMedidas" existente
        console.log("userMedidas não tem medidas, atualizando chave existente");
        const updatedUserMedidas = {
          ...MedidasObj,
          ombros: inputs.ombros,
          braçodireito: inputs.braçodireito,
          braçoesquerdo: inputs.braçoesquerdo,
          torax: inputs.torax,
          abdomen: inputs.abdomen,
          quadril: inputs.quadril,
          coxadireita: inputs.coxadireita,
          coxaesquerda: inputs.coxaesquerda,
          date: inputs.date,
        };
  
        console.log("Salvando medidas em userMedidas:", updatedUserMedidas);
        await AsyncStorage.setItem("userMedidas", JSON.stringify(updatedUserMedidas));
      }
  
      setLoading(false);
      navigation.navigate("Tab");
      console.log("Medidas salvas com sucesso");
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Algo deu errado");
      console.log("Erro ao salvar medidas:", error);
    }
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

            <Text style={styles.label}>Selecione a Data</Text>
            <TouchableOpacity onPress={handleOnPressDateInput}>
              <View
                style={[
                  styles.inputContainer,
                  {
                    borderColor: errors.date ? COLORS.red : COLORS.light,
                  },
                ]}
              >

                <Text style={styles.inputText}>
                  {inputs.date
                    ? moment(inputs.date).format("DD/MM/YYYY")
                    :  moment().format("DD/MM/YYYY")}
                </Text>
              </View>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={inputs.date ? new Date(inputs.date) : new Date()}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={(event, date) => {
                  setShowDatePicker(false);
                  handleOnDateChange(date);
                }}
              />
            )}
            <Text style={styles.errorText}>{errors.date}</Text>
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
const styles = StyleSheet.create({

  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey,
  },
  inputContainer: {
    height: 55,
    backgroundColor: COLORS.light,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    alignItems: 'center',
  },
  inputText: {
    color: "#9B9B9B",
    flex: 1,
    marginLeft:10,
  },
  errorText: {
    marginTop: 7,
    color: COLORS.red,
    fontSize: 12,
  },
});

export default EditarMedidas;
