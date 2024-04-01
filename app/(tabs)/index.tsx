import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { ScrollView, Switch } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import { auth } from "@/fb";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useUserStore } from "@/store/userStore";
import { colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { updateActiveForDonation } from "@/gql/user_queries";
import RequestCard from "@/components/RequestCard";

export default function TabOneScreen() {
  const user = useUserStore((state) => state.user);
  const [activeForDonationLoading, setActiveForDonationLoading] =
    useState(false);
  const [_activeForDonation, _setActiveForDonation] = useState(
    user?.activeForDonation
  );

  const setActiveForDonation = useUserStore(
    (state) => state.setActiveForDonation
  );

  useEffect(() => {
    console.log("activeForDonation: ");
    console.log(user);
  }, []);

  const handleActiveForDonation = async () => {
    setActiveForDonationLoading(true);
    const data = await updateActiveForDonation(
      user?.id!,
      !user?.activeForDonation!
    );
    setActiveForDonation(data.activeForDonation);
    console.log(data);
    setActiveForDonationLoading(false);
  };

  return user?.id ? (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar style="inverted" />
        <View style={styles.activeCard}>
          <View style={styles.cardEdit}>
            <Text style={styles.cardTitle}>Location</Text>
            <Feather name="edit-3" size={16} color="white" />
          </View>
          <Text style={styles.title}>Kakinada</Text>
          {/* <View style={styles.separator} /> */}

          <View style={styles.activeDonation}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Currently willing to Donate
            </Text>
            {activeForDonationLoading && (
              <ActivityIndicator color="white" size="small" />
            )}
            <Switch
              size="md"
              value={user?.activeForDonation!}
              onChange={() => handleActiveForDonation()}
            />
          </View>
          <View style={styles.bloodTypeContainer}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Your Blood type
            </Text>
            <Text style={styles.bloodType}>O+</Text>
          </View>
        </View>

        <View style={styles.requestsContainer}>
          <View style={styles.requestHeaderContainer}>
            <Text style={styles.requestHeader}>Requests for you:</Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <Ionicons name="reload-outline" size={16} color="black" />
              <Text style={styles.requestSeeAll}>See All</Text>
            </View>
          </View>
          <RequestCard />
        </View>
      </View>
    </ScrollView>
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
    marginTop: 20,
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    rowGap: 30,
  },
  activeCard: {
    width: "90%",
    // height: 100,
    gap: 16,
    borderRadius: 10,
    backgroundColor: colors.backgroundPrimary,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "white",
  },
  cardEdit: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  activeDonation: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  bloodTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bloodType: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    fontSize: 18,
    fontWeight: "900",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "white",
  },
  // Your request styles
  requestsContainer: {
    width: "90%",
    // gap: 16,
    borderRadius: 10,
    // paddingHorizontal: 14,
    // paddingVertical: 10,
  },
  requestHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // padding: 10
  },
  requestHeader: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  requestSeeAll: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.linkBlue,
    textDecorationLine: "underline",
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
