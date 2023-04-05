import {Pressable, StyleSheet,SafeAreaView, Text, View, Image,ScrollView, ImageBackground, Dimensions,Platform, Button, Item} from 'react-native';
import { useNavigation, useRoute} from "@react-navigation/native";
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';



const Perfil = () => {
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
    try {
      await AsyncStorage.setItem('image', image);
      console.log('Imagem salva com sucesso!');
    } catch (error) {
      console.log('Erro ao salvar imagem: ', error);
    }
  };

  const loadImage = async () => {
    try {
      const image = await AsyncStorage.getItem('image');
      if (image !== null) {
        setImage(image);
      }
    } catch (error) {
      console.log('Erro ao carregar imagem:', error);
    }
  };

  useEffect(() => {
    loadImage();
  }, []);



  return (
    <SafeAreaView style={{backgroundColor:"#ffffff",}}>
    <ImageBackground style={{backgroundColor:"#2E9AFE" ,height:"100%", bottom:"51%"}}>

    <MaterialIcons style={{marginLeft:"auto", marginRight:75,top:465}} name="edit" size={26} color="black" onPress={pickImage}/>
      
      <Image source={{ uri:"https://cdn-icons-png.flaticon.com/512/3135/3135768.png"}} style={{top:434,marginLeft:"auto", marginRight:"auto" ,width: 175, height: 175}} />
      {image && <Image source={{ uri: image }} style={{top:"32%", width: 190, height: 190, borderRadius:100, marginLeft:"auto",marginRight:"auto" }} />}
    
      <View>
        

        <Text style={{color:"black",marginLeft:"auto", marginRight:"auto", fontWeight:"bold",fontSize:22, top:265,}}>{userDetails?.fullname}</Text>

        </View>


      <View style={{flexDirection:"row", alignItems: "center", justifyContent:"space-between", top:260, padding:40}}>
        <View>

        <Text style={{color:"black",textAlign:"center",fontSize:18,fontWeight:"bold"}}>{userDetails?.age}</Text>
        <Text>Idade</Text>
        </View>

        <View>

        <Text style={{color:"black",textAlign:"center",fontSize:18,fontWeight:"bold"}}>{userDetails?.weight}</Text>
        <Text>Peso</Text>
        </View>

        <View>

        <Text style={{color:"black",textAlign:"center",fontSize:18,fontWeight:"bold"}}>{userDetails?.height}</Text>
        <Text>Altura</Text>
        </View>
    </View>

    



    <View style={{ top: 240, padding: 35, flexDirection: "column", alignItems: "center", marginRight:180 }}>
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <MaterialCommunityIcons name="ruler" size={26} color="black" />
    <Pressable
      onPress={() => {
        navigation.navigate("VerMedidas");
      }}
      style={{ marginLeft: 10 }}
    >
      <Text style={{ color: "black", fontSize: 18 }}>Suas Medidas</Text>
    </Pressable>
  </View>

  <View style={{ flexDirection: "row", alignItems: "center", marginTop: 30, marginRight:25 }}>
    <MaterialCommunityIcons name="account" size={26} color="black" />
    <Pressable
      onPress={() => {
        navigation.navigate("EditarPerfil");
      }}
      style={{ marginLeft: 10 }}
    >
      <Text style={{ color: "black", fontSize: 18, marginLeft:4 }}>Editar perfil</Text>
    </Pressable>
  </View>
</View>


    </ImageBackground>  

  </SafeAreaView>
  )
}
export default Perfil;