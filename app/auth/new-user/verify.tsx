import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native";
import { router } from "expo-router";
import { useUserStore } from "@/store/userStore";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { colors } from "@/constants/Colors";


const verify = () => {
  const user = useUserStore((state) => state.user);
  console.log(user);

  return (
    <View style={styles.container} >
      <Image source={require('@/assets/images/verify.png')} style={styles.image} />
      <Text style={styles.header} >Verify your email address</Text>
      <Text style={styles.subText} >
      Please click on the link that has just  been sent to your email account to verify your email and continue the registration process.
      </Text>
      <Pressable onPress={() => router.replace('/auth/login') } >
      <Text style={styles.textLink} >Go to login</Text>
      </Pressable>
      {/* <Button title="Go to login" onPress={() => router.push("/auth/login")} /> */}
    </View>
  );
};

export default verify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 8,
  },
  image: {
    width: wp("100%"),
    height: hp("40%"),
  },
  header :{
    fontSize: hp("3%"),
    fontWeight: "bold",
    color: "black",
  },
  subText: {
    fontSize: hp("2%"),
    color: colors.textGray,
    textAlign: "center",
    width: wp("80%"),
  },
  textLink: {
    color: colors.linkBlue,
    fontWeight: "bold",
    fontSize: hp("2%"),
    textDecorationLine: "underline",
  }
});
