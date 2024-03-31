import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Button,
  Pressable,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { colors } from "@/constants/Colors";

const onboarding = () => {
  return (
    <SafeAreaView>
      <StatusBar style="inverted" />
      <View style={onBoardingStyles.container}>
        <Image
          source={require("@/assets/images/welcome.png")}
          style={onBoardingStyles.imageStyle}
        />
        <View style={onBoardingStyles.textContainer}>
          <Text style={onBoardingStyles.header}>Welcome to DonorSpot</Text>
          <Text style={onBoardingStyles.subText}>
            Be a lifeline: donate blood today
          </Text>
          <Pressable
            onPress={() => router.push("/auth/register")}
            style={[onBoardingStyles.buttonStyle]}
          >
            <Text style={onBoardingStyles.btnText}>Get Stated</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default onboarding;

const onBoardingStyles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    paddingTop: 60,
    alignItems: "center",
    justifyContent: "space-around",
    color: "black",
    height: "100%",
  },
  imageStyle: {
    width: 420,
    height: 420,
  },
  header: {
    fontSize: 35,
    fontWeight: "bold",
  },
  textContainer: {
    alignItems: "center",
    gap: 20,
  },
  subText: {
    fontSize: 20,
    color: "gray",
  },
  buttonStyle: {
    backgroundColor: colors.primary,
    width: 360,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
});
