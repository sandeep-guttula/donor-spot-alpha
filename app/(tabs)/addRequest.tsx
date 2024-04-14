import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React,{ useState, useEffect } from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { colors } from "@/constants/Colors";
import { router } from "expo-router";
import { useUserStore } from "@/store/userStore";
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
import { AntDesign } from "@expo/vector-icons";
import { addDonationInYourArea } from "@/gql/user_queries";


const addRequest = () => {

  const user = useUserStore((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState(user?.address?.city);
  const [bloodType, setBloodType] = useState("");

  const handleAddRequest = async () => {
    console.log("Add Request");
    setLoading(true);
    let date = new Date().toISOString();
    date = date.split("T")[0];
    if(user?.id && city && bloodType){
      const response = await addDonationInYourArea(user?.id, date,"request-in-your-area",bloodType,city);
      console.log(response);
    }
    
    console.log(city, bloodType, user?.id,date);
    setLoading(false);
  }

  return (
    <View style={styles.container} >
      <View style={{}} >
        <Text style={{ fontSize: 14,fontWeight: "400" }}  >Name</Text>
        <Text style={styles.header} >{user?.fullName}</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>City </Text>
          <TextInput
            placeholder="City"
            style={styles.input}
            onChangeText={setCity}
            value={city}
          />
        </View>
        <View style={styles.inputContainer} >
          <Text style={styles.inputText} >Blood Type</Text>
          <Select
              style={{ padding: 0 }}
              onValueChange={(value) => setBloodType(value)}
              placeholder="Select blood type"
            >
              <SelectTrigger
                variant="outline"
                size="sm"
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

        <Pressable style={styles.buttonStyle} onPress={() => handleAddRequest()}>
          <Text style={styles.btnText}>Add Request</Text>
          {loading && <ActivityIndicator size="small" color="white" />}
        </Pressable>

      </View>
    </View>
  );
};

export default addRequest;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    color: colors.textPrimary,
    fontSize: wp("8%"),

    fontWeight: "800",
  },
  form: {
    marginTop: 20,
    width: "100%",
    gap: hp('1.5%'),
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  input: {
    paddingVertical: wp('3%'),
    paddingHorizontal: wp('5%'),
    borderRadius: 7,
    borderColor: "gray",
    borderWidth: 0.5,
    width: wp('94%'),
  },
  inputText: {
    fontWeight: "800",
    fontSize: 16,
    width: "100%",
    color: colors.textPrimary,
  },

  buttonStyle: {
    backgroundColor: colors.primary,
    width: wp('94%'),
    flexDirection: "row",
    height: hp('6.5%'),
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
  heading: {
    fontSize: hp('4%'),
    fontWeight: "bold",
    color: colors.textPrimary,
  },
  selectTrigger: {
    width: "100%",
    height: hp("7%"),
    paddingRight: 10,
    borderColor: colors.textGray,
    fontSize: 10,
  },
});
