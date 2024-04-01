import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "@/constants/Colors";

const RequestCard = () => {
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
          <TouchableOpacity style={[styles.btnContainer]}>
            <Text style={styles.btnDenyText}>Deny</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RequestCard;

const styles = StyleSheet.create({
  container: {
    padding: 14,
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    rowGap: 4,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 16,
    marginBottom: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderColor: colors.green,
    borderWidth: 1,
    borderRadius: 50,
  },
  nameText: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: "800",
  },
  textSubHeading: {
    color: colors.textDarkGray,
    fontSize: 16,
    fontWeight: "700",
  },
  textHeading: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: "800",
  },
  rowStyle: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
  btnContainer: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  btnTextHelp: {
    color: colors.cardBackground,
    fontSize: 14,
    fontWeight: "900",
  },
  btnDenyText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "900",
  },
});
