import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  Pressable,
} from "react-native";
import { Switch } from "@gluestack-ui/themed";
import { useState } from "react";
import { auth } from "@/fb";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useUserStore } from "@/store/userStore";
import { colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native";

export default function TabOneScreen() {
  const user = useUserStore((state) => state.user);

  return user?.id ? (
    <View style={styles.container}>
      <StatusBar style="inverted" />
      <Text style={styles.title}>Welcome, {user?.fullName}</Text>
      <Text> Email: {user?.email}</Text>
      <Text>Phone: {user?.phoneNumber}</Text>
      <Text>bloodType {user?.bloodType}</Text>
      <Text>city{user?.address?.city}</Text>
      <Text>zip{user?.address?.zip}</Text>
      <Text>gender{user?.gender}</Text>
      <Text>age{user?.age}</Text>
      <Text>activeForDonation {String(user?.activeForDonation)}</Text>
      <Text>firebaseUID{user?.firebaseUID}</Text>
      <Text>id{user?.id}</Text>
    </View>
  ) : (
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

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
