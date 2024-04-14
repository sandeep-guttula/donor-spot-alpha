import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "@/constants/Colors";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Avatar, AvatarBadge, AvatarFallbackText, Badge, BadgeText } from '@gluestack-ui/themed';
import { useUserStore } from "@/store/userStore";

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
  

  const user = useUserStore((state) => state.user);

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        {
          userId === user?.id && (
            <Badge size="md" variant="solid" borderRadius="$none" action="success">
              <BadgeText>You</BadgeText>
            </Badge>
          )
        }
        <Text>Date: 03-04-2024</Text>
      </View>
      <View style={styles.profileContainer}>
        {/* <Image
          style={styles.image}
          source={{
            uri: `${avatar}`,
          }}
        /> */}

        <Avatar size="md" bgColor="$amber600" >
          <AvatarFallbackText>{fullName}</AvatarFallbackText>
          <AvatarBadge $dark-borderColor="#000" />
        </Avatar>
        <Text style={styles.nameText}>{fullName}</Text>

      </View>
      <View style={styles.rowStyle}>
        <Text style={styles.textSubHeading}>City:</Text>
        <Text style={styles.textHeading}>{city}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={styles.rowStyle}>
          <Text style={styles.textSubHeading}>Need:</Text>
          <Text style={styles.textHeading}>{bloodType}</Text>
        </View>
        <View style={{ flexDirection: "row-reverse",  }}>
          <TouchableOpacity
            style={[styles.btnContainer, { backgroundColor: colors.green }]}
          >
            <Text style={styles.btnTextHelp}> Help</Text>
          </TouchableOpacity>
          {
            donationType === "request-for-donor" ? (
              <TouchableOpacity
                style={[styles.btnContainer]}
              >
                <Text style={styles.btnDenyText}> Deny</Text>
              </TouchableOpacity>
            ) : (
              userId === user?.id && (
                <TouchableOpacity
                style={[styles.btnContainer]}
              >
                <Text style={styles.btnDenyText}> Cancel</Text>
              </TouchableOpacity>
              )
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
    columnGap: 5,
    
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
