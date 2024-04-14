import {
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@gluestack-ui/themed";
import { useUserStore } from "@/store/userStore";
import { colors } from "@/constants/Colors";
import { addUser } from "@/gql/user_queries";
import { router } from "expo-router";
import PhoneInput, { ICountry } from "react-native-international-phone-number";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const newUser = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState<ICountry | null>(null);
  const [age, setAge] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [gender, setGender] = useState("");
  const [showAddress, setShowAddress] = useState(false);

  const user = useUserStore((state) => state.user);
  const setUserId = useUserStore((state) => state.setUserId);
  const setUserName = useUserStore((state) => state.setUserName);
  const setPhoneNumber = useUserStore((state) => state.setPhoneNumber);
  const setUserAge = useUserStore((state) => state.setUserAge);
  const setUserGender = useUserStore((state) => state.setUserGender);
  const setUserBloodType = useUserStore((state) => state.setUserBloodType);
  const setUserCity = useUserStore((state) => state.setUserCity);
  const setUserPinCode = useUserStore((state) => state.setUserPinCode);

  const handleSubmit = async () => {
    try {
      if (
        fullName === "" ||
        phone === "" ||
        age === "" ||
        bloodType === "" ||
        city === "" ||
        pinCode === "" ||
        gender === ""
      ) {
        return;
      }

      let fullPhoneNumber = `${countryCode?.callingCode}${phone.replaceAll(
        " ",
        ""
      )}`;

      if (user?.firebaseUID && user?.email) {
        const response = await addUser(
          user?.firebaseUID,
          fullName,
          user?.email,
          fullPhoneNumber,
          age,
          gender,
          bloodType,
          city,
          pinCode
        );

        if (response?.id) {
          setUserId(response.id);
          setUserName(fullName);
          setPhoneNumber(fullPhoneNumber);
          setUserAge(age);
          setUserGender(gender);
          setUserBloodType(bloodType);
          setUserCity(city);
          setUserPinCode(pinCode);
        }
        // const pro = new Promise((res:any) => {
        //   setTimeout(() => {
        //     // console.log("New User: -> ", user);
        //     res();
        //   }, 1000);
        // });

        // await pro;
        console.log("New User: -> ", user);
        router.replace("/auth/new-user/verify");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="inverted" />
      {showAddress ? (
        <View style={styles.form}>
          <Text>{user?.fullName}</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>City </Text>
            <TextInput
              placeholder="New York"
              value={city}
              onChangeText={setCity}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Pin Code</Text>
            <TextInput
              keyboardType="numeric"
              placeholder="110001"
              value={pinCode}
              onChangeText={setPinCode}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Gender</Text>
            <Select
              style={{ padding: 0 }}
              onValueChange={(value) => setGender(value)}
              placeholder="Select option"
            >
              <SelectTrigger
                variant="outline"
                size="lg"
                style={styles.selectTrigger}
              >
                <SelectInput placeholder="Select option" />
                <AntDesign name="down" size={20} color={colors.borderGray} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="M" value="M" />
                  <SelectItem label="F" value="F" />
                  <SelectItem label="Prefer not to say" value="NA" />
                </SelectContent>
              </SelectPortal>
            </Select>
          </View>
          <Pressable
            onPress={() => handleSubmit()}
            style={[styles.primaryButtonStyle, { height: 60 }]}
          >
            <Text style={styles.btnText}>Create</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.form}>
          <View style={styles.imageContainer}>
            <View style={styles.imagePlaceholder}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Full Name</Text>
            <TextInput
              placeholder="Jon Doe"
              value={fullName}
              onChangeText={setFullName}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Phone</Text>
            <PhoneInput
              placeholder="Phone number"
              value={phone}
              onChangePhoneNumber={setPhone}
              // style={styles.input}
              defaultCountry="IN"
              selectedCountry={countryCode}
              onChangeSelectedCountry={setCountryCode}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Age</Text>
            <TextInput
              keyboardType="numeric"
              placeholder="21"
              value={age}
              onChangeText={setAge}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Blood type</Text>
            <Select
              style={{ padding: 0 }}
              onValueChange={(value) => setBloodType(value)}
              placeholder="Select option"
            >
              <SelectTrigger
                variant="outline"
                size="lg"
                style={styles.selectTrigger}
              >
                <SelectInput placeholder="Select option" />
                <AntDesign name="down" size={20} color={colors.borderGray} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="O+" value="O+" />
                  <SelectItem label="O-" value="O-" />
                  <SelectItem label="A+" value="A+" />
                  <SelectItem label="A-" value="A-" />
                  <SelectItem label="B+" value="B+" />
                  <SelectItem label="B-" value="B-" />
                  <SelectItem label="AB+" value="AB+" />
                  <SelectItem label="AB-" value="AB-" />
                </SelectContent>
              </SelectPortal>
            </Select>
          </View>
          <Pressable
            onPress={() => setShowAddress(true)}
            style={[styles.primaryButtonStyle, { height: 60 }]}
          >
            <Text style={styles.btnText}>Next</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

export default newUser;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 20,
  },
  imageContainer: {
    width: "100%",
    height: hp('20%'),
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "lightgray",
    borderRadius: 50,
  },
  selectTrigger: {
    width: "100%",
    height: 60,
    paddingRight: 10,
    borderColor: colors.textGray,
    fontSize: 20,
  },
  form: {
    marginTop: 20,
    width: "85%",
    gap: hp('1.5%'),
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  input: {
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('5%'),
    borderRadius: 7,
    borderColor: "gray",
    borderWidth: 0.5,
    width: wp('85%'),
  },
  inputText: {
    fontWeight: "800",
    fontSize: 16,
    width: "100%",
    color: colors.textPrimary,
  },
  primaryButtonStyle: {
    backgroundColor: colors.primary,
    height: hp('6%'),
    width: wp('85%'),
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "800",
    fontSize: hp('2.5%'),
    justifyContent: "center",
    alignItems: "center",
  },
  btnDisable: {
    opacity: 0.5,
  },
  phoneInput: {
    marginBottom: 20,
    borderRadius: 5,
    padding: 10,
    paddingVertical: hp('1.5%'),
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.borderGray,
  },
});
