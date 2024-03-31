import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { getUserDataThroughFirebaseUid, isUserExist } from "@/gql/user_queries";
import { router } from "expo-router";
import { useUserStore } from "@/store/userStore";
import { auth } from "@/fb";

const register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const setUserEmail = useUserStore((state) => state.setUserEmail);
  const setFirebaseUID = useUserStore((state) => state.setFirebaseUID);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user?.email && user?.firebaseUID) {
      console.log("User: -> ", user?.firebaseUID, user?.email);
    }
  }, [user?.email, user?.firebaseUID]);

  const handleSignUp = async () => {
    try {
      if (email === "" || password === "") {
        return;
      }

      setLoading(true);
      console.log("Sign Up");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!userCredential.user.uid) {
        console.log("User not created");
        return;
      }
      await sendEmailVerification(userCredential.user);
      setUserEmail(email);
      setFirebaseUID(userCredential.user.uid);
      console.log(userCredential.user.uid, email, password);
      console.log("User: -> ", user?.firebaseUID, user?.email);
      setLoading(false);
      router.push("/auth/new-user/newUser");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="inverted" />
      <View>
        <Image
          style={styles.imageStyle}
          source={require("@/assets/images/yoga.png")}
        />
      </View>
      <View style={styles.form}>
        <View style={styles.headingContainer}>
          <Text style={styles.subHeading}>Welcome !</Text>
          <Text style={styles.heading}>Sign Up to continue</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Email </Text>
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={setEmail}
            value={email}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Password </Text>
          <TextInput
            placeholder="password"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
            style={styles.input}
          />
        </View>
        <Pressable style={styles.buttonStyle} onPress={() => handleSignUp()}>
          <Text style={styles.btnText}>Continue</Text>
          {loading && <ActivityIndicator size="small" color="white" />}
        </Pressable>
        <Text style={{ justifyContent: "center", alignItems: "center" }}>
          All ready have an
          <Pressable onPress={() => router.push("/auth/login")}>
            <Text style={styles.link}>account ?</Text>
          </Pressable>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
  },
  subContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "space-around",
  },
  imageStyle: {
    marginTop: 20,
    width: 400,
    height: 370,
  },
  link: {
    color: colors.linkBlue,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  form: {
    marginTop: 20,
    width: "85%",
    gap: 20,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 7,
    borderColor: "gray",
    borderWidth: 0.5,
    width: "100%",
  },
  inputText: {
    fontWeight: "800",
    fontSize: 16,
    width: "100%",
    color: colors.textPrimary,
  },

  buttonStyle: {
    backgroundColor: colors.primary,
    // width: "85%",
    flexDirection: "row",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
  headingContainer: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 40,
    fontWeight: "bold",
    color: colors.textGray,
  },
  subHeading: {
    fontSize: 30,
    color: colors.textGray,
    fontWeight: "bold",
  },
  optEnterContainer: {
    flex: 1,
    marginTop: 60,
    width: "100%",
    gap: 20,
    padding: 20,
  },
  subHeadingText: {
    fontSize: 30,
    color: colors.textPrimary,
    fontWeight: "bold",
  },
  otpInput: {
    borderColor: colors.borderGray,
    borderWidth: 1,
    color: colors.textPrimary,
    borderRadius: 5,
  },
});
