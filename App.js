/* eslint-disable react/prop-types */
import React from "react";
import {Text, View, Image } from "react-native";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import LoginScreen from "./login/views/screens/LoginScreen";
import RegistrationScreen from "./login/views/screens/RegistrationScreen";
import Loader from "./login/views/components/Loader";
import HomeScreen from "./screens/HomeScreen";
import WorkoutPlans from "./screens/WorkoutPlans";
import WorkoutScreen from "./screens/WorkoutScreen";
import FitScreen from "./screens/FitScreen";
import RestScreen from "./screens/RestScreen";
import AjustarRestScreen from "./screens/AjustarRestScreen";
import ExerciseFinnish from "./screens/ExerciseFinnish";
import Perfil from "./screens/Perfil";
import EditarPerfil from "./screens/EditarPerfil";
import VerMedidas from "./screens/VerMedidas";
import EditarMedidas from "./screens/EditarMedidas";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
 
//Drawers barra vertical
function Drawers({ navigation }) {
  const [userDetails, setUserDetails] = React.useState(null);
  const [image, setImage] = useState(null);

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };
  
  const loadImage = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      const image = await AsyncStorage.getItem('image');
      if (userData && image !== null) {
        setImage(image);
      }
    } catch (error) {
      console.log('Erro ao carregar imagem:', error);
    }
  };

  useEffect(() => {
    loadImage();
  }, []);

  

  React.useEffect(() => {
    getUserData();
  }, []);

 


  const handleLogout = async () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1 }}>
            <View style={{ height: 200, backgroundColor: '#3299CC' }}>
            <Image
                source={{ uri: image }}
                style={{ width: 100, height: 100, borderRadius: 50, marginTop: 50, alignSelf: 'center' }}  />
              <Text style={{ marginTop: 10, fontSize: 18,marginLeft:0 , alignSelf: 'center' }}>
                {userDetails?.fullname}
              </Text>
            </View>
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <DrawerItem label="Logout" onPress={handleLogout}  icon={({ color, size }) => ( <Icon name="log-out" color={color} size={size} />)}/>
            </DrawerContentScrollView>
          </View>
        );
      }}
    >

      <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: false, drawerIcon: ({ color, size }) => ( <Icon name="home-sharp" color={color} size={size} />), }} />
    </Drawer.Navigator>
  );
}

function Tabs(){  
  return (
    <Tab.Navigator screenOptions={{tabBarStyle:{position:"absolute",}}}>

      <Tab.Screen name="Inicio" component={Drawers} options={{ headerShown: false, tabBarIcon:({color,size,focused})=> {if(focused){
        return <Ionicons name="ios-home-sharp" size={size} color={color} />
      }
      return <Ionicons name="ios-home-outline" size={size} color={color} />
      }
    }}/>

      <Tab.Screen name="Planos de Treino" component={WorkoutPlans} options={{ headerShown: false, tabBarIcon:({color,size,focused})=> {if(focused){
        return <MaterialCommunityIcons name="clock-time-four" size={size} color={color} />
      }
      return   <MaterialCommunityIcons name="clock-time-four" size={size} color={color} />
       }
     }}/>


      <Tab.Screen name="Perfil" component={Perfil} options={{ headerShown: false,  tabBarIcon:({color,size,focused})=> {if(focused){
        return <Ionicons name="ios-person" size={size} color={color} />
      }
      return <Ionicons name="ios-person-outline" size={size} color={color} />
       } }}/>

    </Tab.Navigator>
  )
}



const StackNavigator = () => {
  const [initialRouteName, setInitialRouteName] = React.useState('');

  React.useEffect(() => {
    setTimeout(() => {
      authUser();
    }, 2000);
  }, []);

  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('userData');
      if (userData) {
        userData = JSON.parse(userData);
        if (userData.loggedIn) {
          setInitialRouteName('Tab');
        } else {
          setInitialRouteName('LoginScreen');
        }
      } else {
        setInitialRouteName('RegistrationScreen');
      }
    } catch (error) {
      setInitialRouteName('RegistrationScreen');
    }
  };

  return (

    <NavigationContainer>
      {!initialRouteName ? (
        <Loader visible={true} />
      ) : (
        <>
          <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{headerShown: false}}>
            <Stack.Screen
              name="RegistrationScreen"
              component={RegistrationScreen}
            />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="Tab" component={Tabs} options={{ headerShown: false }}/>
            <Stack.Screen name="Home1" component={HomeScreen} /> 
            <Stack.Screen name= "Workout1" component={WorkoutScreen} options={{ headerShown: false }}/>
            <Stack.Screen name= "WorkoutPlans1" component={WorkoutPlans} options={{ headerShown: false }}/>
            <Stack.Screen name= "Fit" component={FitScreen} options={{ headerShown: false }}/>
            <Stack.Screen name= "Rest" component={RestScreen} options={{ headerShown: false }}/>
            <Stack.Screen name= "AjustarRest" component={AjustarRestScreen} options={{ headerShown: false }}/>
            <Stack.Screen name= "Finnish" component={ExerciseFinnish} options={{ headerShown: false }}/>
            <Stack.Screen name= "Perfil" component={Perfil} options={{ headerShown: false }}/>
            <Stack.Screen name= "VerMedidas" component={VerMedidas} options={{ headerShown: false }}/>
            <Stack.Screen name= "EditarMedidas" component={EditarMedidas} options={{ headerShown: false }}/>
            <Stack.Screen name= "EditarPerfil" component={EditarPerfil} options={{ headerShown: false }}/>
          </Stack.Navigator>

        </>
      )}
    </NavigationContainer>
  );
};
export default StackNavigator;
