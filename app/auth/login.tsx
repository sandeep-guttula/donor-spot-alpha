import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/fb";
import { router } from "expo-router";
import { colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { getUserDataThroughFirebaseUid } from "@/gql/user_queries";
import { useUserStore } from "@/store/userStore";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const setPhoneNumber = useUserStore((state) => state.setPhoneNumber);
  const setFirebaseUID = useUserStore((state) => state.setFirebaseUID);
  const setUserId = useUserStore((state) => state.setUserId);
  const setUserName = useUserStore((state) => state.setUserName);
  const setUserEmail = useUserStore((state) => state.setUserEmail);
  const setUserAge = useUserStore((state) => state.setUserAge);
  const setUserGender = useUserStore((state) => state.setUserGender);
  const setUserBloodType = useUserStore((state) => state.setUserBloodType);
  const setUserCity = useUserStore((state) => state.setUserCity);
  const setUserPinCode = useUserStore((state) => state.setUserPinCode);
  const setUserAvatar = useUserStore((state) => state.setUserAvatar);
  const setActiveForDonation = useUserStore(
    (state) => state.setActiveForDonation
  );
  const user = useUserStore((state) => state.user);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      console.log("Sign In");

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!userCredential.user.uid) {
        console.log("User not created");
        return;
      }
      if (userCredential.user.uid) {
        const response = await getUserDataThroughFirebaseUid(
          userCredential.user.uid
        );

        console.log("Response", response);

        setPhoneNumber(response?.phone);
        setFirebaseUID(userCredential.user.uid);
        setUserId(response?.id);
        setUserName(response?.fullName);
        setUserEmail(response?.email);
        setUserAge(response?.age);
        setUserGender(response?.gender);
        setUserBloodType(response?.bloodType);
        setUserCity(response?.address?.city);
        setUserPinCode(response?.address?.pincode);
        setActiveForDonation(response?.activeForDonation);
        setUserAvatar(response?.avatar);
        setLoading(false);
        router.push("/(tabs)");
      }
    } catch (error) {
      console.log("Error occurred");

      console.log(error);
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
          <Text style={styles.heading}>Login to continue</Text>
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
        <Pressable style={styles.buttonStyle} onPress={() => handleSignIn()}>
          <Text style={styles.btnText}>Login</Text>
          {loading && <ActivityIndicator size="small" color="white" />}
        </Pressable>
        <Text style={{ justifyContent: "center", alignItems: "center" }}>
          Create new
          <Pressable onPress={() => router.push("/auth/register")}>
            <Text style={styles.link}>account ?</Text>
          </Pressable>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default login;

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
