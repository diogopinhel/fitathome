import { StyleSheet, Text, SafeAreaView, Image, Pressable} from "react-native";
import React, { useEffect, useState} from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const RestScreen= () => {
  const navigation = useNavigation();
  let timer=0;
  const [timeLeft, setTimeLeft] = useState();


  const startTime = () => {
    timer =setTimeout(()=>{
      if(timeLeft  <= 0){
        navigation.goBack();
        clearTimeout(timer)
      }
      setTimeLeft(timeLeft - 1);
    },1000)
  }

  useEffect(() => {
    const getTime = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        const parsedUserData = JSON.parse(userData) ?? {};
        setTimeLeft(parsedUserData.RestTime ?? 60);
      } catch(e) {
        console.error(e);
      }
    }
    getTime();
  }, []);



  useEffect(()=>{
    startTime();
    return () => clearTimeout(timer);
  },)
    return (
        <SafeAreaView>
            <Image
        source={{
          uri: "https://cdn-images.cure.fit/www-curefit-com/image/upload/fl_progressive,f_auto,q_auto:eco,w_500,ar_500:300,c_fit/dpr_2/image/carefit/bundle/CF01032_magazine_2.png",
        }}
        style={{ width: "100%", height: 420 }}
      />
      <Text style={{fontSize:30,fontWeight:"900",marginTop:50, textAlign: "center"}}>
        DESCANSO
      </Text>
      <Text style={{fontSize: 40, fontWeight: "800", marginTop:50, textAlign:"center"}}>{timeLeft}</Text>
          </SafeAreaView> 
  );
};
export default RestScreen

const styles = StyleSheet.create({});