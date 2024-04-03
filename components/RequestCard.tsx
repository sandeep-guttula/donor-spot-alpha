import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "@/constants/Colors";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export type RequestCardProps = {
  id: string;
  userId: string;
  bloodType: string;
  city?: string;
  donationDate: string;
  fullName: string;
  avatar: string;
  donationType: string;
}

const RequestCard = ( 
  { id, userId, bloodType, city, donationDate, fullName, avatar, donationType }: RequestCardProps
 ) => {

  console.log(
    "id, userId, bloodType, city, donationDate, fullName, avatar, donationType",
    id,
    userId,
    bloodType,
    city,
    donationDate,
    fullName,
    avatar,
    donationType
  );
  

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text>Date: 03-04-2024</Text>
      </View>
      <View style={styles.profileContainer}>
        <Image
          style={styles.image}
          source={{
            uri: "https://avatar.iran.liara.run/public/boy?username=Ash",
          }}
        />
        <Text style={styles.nameText}>Sandeep Guttula</Text>
      </View>
      <View style={styles.rowStyle}>
        <Text style={styles.textSubHeading}>City:</Text>
        <Text style={styles.textHeading}>Kakinada</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={styles.rowStyle}>
          <Text style={styles.textSubHeading}>Need:</Text>
          <Text style={styles.textHeading}>O+</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[styles.btnContainer, { backgroundColor: colors.green }]}
          >
            <Text style={styles.btnTextHelp}> Help</Text>
          </TouchableOpacity>
          {
            donationType === "request-for-donor" && (
              <TouchableOpacity
                style={[styles.btnContainer]}
              >
                <Text style={styles.btnDenyText}> Deny</Text>
              </TouchableOpacity>
            )
          }
        </View>
      </View>
    </View>
  );
};

export default RequestCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    rowGap: 4,
    marginBottom: 10,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: wp("2%"),
    marginBottom: 5,
  },
  image: {
    width: wp("12%"),
    height: wp("12%"),
    borderColor: colors.green,
    borderWidth: 1,
    borderRadius: 50,
  },
  nameText: {
    color: colors.textPrimary,
    fontSize: wp("5%"),
    fontWeight: "800",
  },
  textSubHeading: {
    color: colors.textDarkGray,
    fontSize: hp("2%"),
    fontWeight: "700",
  },
  textHeading: {
    color: colors.textPrimary,
    fontSize: hp("2.5%"),
    fontWeight: "800",
  },
  rowStyle: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
  btnContainer: {
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("1%"),
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTextHelp: {
    color: colors.cardBackground,
    fontSize: hp("1.8%"),
    fontWeight: "900",
  },
  btnDenyText: {
    color: colors.primary,
    fontSize: hp("1.8%"),
    fontWeight: "900",
  },
});
