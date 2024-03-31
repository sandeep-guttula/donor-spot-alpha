import { Button, StyleSheet, TextInput, View, Text } from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "@/fb";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useUserStore } from "@/store/userStore";

export default function TabOneScreen() {
  const user = useUserStore((state) => state.user);

  return (
    <View style={styles.container}>
      <StatusBar style="inverted" />

      <Button
        title="Go to Register"
        onPress={() => router.push("/auth/onboarding")}
      />
      <Button
        title="Go to New User"
        onPress={() => router.push("/auth/new-user/newUser")}
      />
      <Button title="Go Login" onPress={() => router.push("/auth/login")} />

      <Text>{user?.email}</Text>
      <Text>{user?.firebaseUID}</Text>
      <Text>{user?.fullName}</Text>
    </View>
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
