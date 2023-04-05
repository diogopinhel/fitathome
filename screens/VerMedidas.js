import {Pressable, StyleSheet, Text, View, Image,ScrollView, ImageBackground, Dimensions,Platform, Button, Item} from 'react-native';
import { useNavigation, useRoute} from "@react-navigation/native";
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
const VerMedidas = () => {
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = React.useState();
  React.useEffect(() => {
    getUserData();

  }, []);

  //Ir buscar dados do login
  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

  return (

<View style={styles.container}>
<Ionicons onPress={() => navigation.goBack()} style={{ position: "absolute", top: 40, left: 25 }} name="arrow-back-outline" size={24} color="black" />
    <View style={styles.section}>
      <Text style={styles.label}>Ombros</Text>
      <Text style={styles.value}>{userDetails?.ombros} cm</Text>
    </View>
    <View style={styles.section}>
      <Text style={styles.label}>Braço direito</Text>
      <Text style={styles.value}>{userDetails?.braçodireito} cm</Text>
    </View>
    <View style={styles.section}>
      <Text style={styles.label}>Braço esquerdo</Text>
      <Text style={styles.value}>{userDetails?.braçoesquerdo} cm</Text>
    </View>
    <View style={styles.section}>
      <Text style={styles.label}>Tórax</Text>
      <Text style={styles.value}>{userDetails?.torax} cm</Text>
    </View>
    <View style={styles.section}>
      <Text style={styles.label}>Abdomen</Text>
      <Text style={styles.value}>{userDetails?.abdomen} cm</Text>
    </View>
    <View style={styles.section}>
      <Text style={styles.label}>Quadril</Text>
      <Text style={styles.value}>{userDetails?.quadril} cm</Text>
    </View>
    <View style={styles.section}>
      <Text style={styles.label}>Coxa direita</Text>
      <Text style={styles.value}>{userDetails?.coxadireita} cm</Text>
    </View>
    <View style={styles.section}>
      <Text style={styles.label}>Coxa esquerda</Text>
      <Text style={styles.value}>{userDetails?.coxaesquerda} cm</Text>
    </View>
    <View style={styles.section}>
      <Text style={styles.label}>Gemio direito</Text>
      <Text style={styles.value}>{userDetails?.gemeodireito} cm</Text>
    </View>
    <View style={styles.section}>
      <Text style={styles.label}>Gemio esquerdo</Text>
      <Text style={styles.value}>{userDetails?.gemeoesquerdo} cm</Text>
    </View>
    <Pressable 
      onPress={() => 
        {navigation.navigate("EditarMedidas",{
        })}
       } style={{ backgroundColor: "blue", padding: 10, marginLeft: "auto", marginRight: "auto", marginVertical: 15, borderRadius: 6, width: 140 }}>
        <Text style={{ textAlign: "center", color: "white", fontSize: 15, fontWeight: "600" }}>Editar Medidas</Text>
      </Pressable>
</View>
);
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingVertical: 80,
      paddingHorizontal: 30,
    },
    section: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingVertical: 10,
    },
    label: {
      fontSize: 16,
      color: '#444',
    },
    value: {
      fontSize: 18,
      color: '#2E9AFE',
    },
  });
  
export default VerMedidas;