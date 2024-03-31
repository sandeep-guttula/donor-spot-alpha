import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native";
import { router } from "expo-router";
import { useUserStore } from "@/store/userStore";

const verify = () => {
  const user = useUserStore((state) => state.user);
  console.log(user);

  return (
    <View>
      <Text>verify email </Text>

      <Button title="Go to login" onPress={() => router.push("/auth/login")} />
    </View>
  );
};

export default verify;

const styles = StyleSheet.create({});
