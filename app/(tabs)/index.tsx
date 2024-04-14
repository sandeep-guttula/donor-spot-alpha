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
import { ScrollView, set, Switch } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import { auth } from "@/fb";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useUserStore } from "@/store/userStore";
import { colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { getRequestInYourArea, getRequestsForYou, updateActiveForDonation } from "@/gql/user_queries";
import RequestCard from "@/components/RequestCard";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import { RequestInArea, RequestInAreaUserType,RequestForYouType,RequestForYouUserType } from "@/types";


export default function TabOneScreen() {
  const user = useUserStore((state) => state.user);
  const [activeForDonationLoading, setActiveForDonationLoading] =
    useState(false);
  const [_activeForDonation, _setActiveForDonation] = useState(
    user?.activeForDonation
  );

  const [requestForYouLoading, setRequestForYouLoading] = useState(false);
  const [requestsInYourAreaLoading, setRequestsInYourAreaLoading] = useState(false);

  const [requestsInArea, setRequestsInArea] = useState<RequestInArea[]>([])
  const [requestsInYourAreaUsers, setRequestsInYourAreaUsers] = useState<RequestInAreaUserType[]>([])

  const [requestsForYou, setRequestsForYou] = useState<RequestForYouType[]>([])
  const [requestsForYouUsers, setRequestsForYouUsers] = useState<RequestForYouUserType[]>([])

  const setActiveForDonation = useUserStore(
    (state) => state.setActiveForDonation
  );

  useEffect(() => {
    handleGetRequestsInYourArea()
    handleGetRequestsForYou()
  }, [user?.id]);

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

  const handleGetRequestsInYourArea = async () => {
    setRequestsInYourAreaLoading(true);
    if(user?.address?.city){
      const response = await getRequestInYourArea(user?.address?.city);
      setRequestsInArea(response.donationsInYourArea);
      setRequestsInYourAreaUsers(response.users);
    }
    setRequestsInYourAreaLoading(false);
  }

  const handleGetRequestsForYou = async () => {
    setRequestForYouLoading(true);
    if(user?.id){
      const response = await getRequestsForYou(user?.id);
      console.log("⭐⭐⭐",response);
      setRequestsForYou(response.donationRequestsForYou);
      setRequestsForYouUsers(response.users);
      
    }
    setRequestForYouLoading(false);
  }

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
              <Pressable onPress={() => handleGetRequestsForYou()} >
                {
                  requestForYouLoading && (
                    <ActivityIndicator color="black" size="small" />
                  )
                }
              <Ionicons name="reload-outline" size={16} color="black" />
              </Pressable>
              <Text style={styles.requestSeeAll}>See All</Text>
            </View>
           
          </View>
          <View style={{display:"flex",flexDirection:"column"}} >
            {
              requestsForYou.map((request) => (
                <RequestCard
                  key={request.id}
                  id={request.id}
                  userId={request.userId}
                  bloodType={request.bloodType}
                  donationDate={request.donationDate}
                  donationType={request.donationType}
                  fullName={requestsForYouUsers.find(user => user.id === request.userId)?.fullName!}
                  avatar={requestsForYouUsers.find(user => user.id === request.userId)?.avatar!}
                />
              ) )
            }
            </View>
        </View>
        <View style={styles.requestsContainer}>
          <View style={styles.requestHeaderContainer}>
            <Text style={styles.requestHeader}>Requests in your:</Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <Pressable onPress={() => handleGetRequestsInYourArea()} >
                {
                  requestsInYourAreaLoading && (
                    <ActivityIndicator color="black" size="small" />
                  )
                }
              <Ionicons name="reload-outline" size={16} color="black" />
              </Pressable>
              <Text style={styles.requestSeeAll}>See All</Text>
            </View>
          </View>
          <View style={{flexDirection:"column"}} >
            {
              requestsInArea.map((request) => (
                <RequestCard
                  key={request.id}
                  id={request.id}
                  userId={request.userId}
                  bloodType={request.bloodType}
                  city={request.city}
                  donationDate={request.donationDate}
                  donationType={request.donationType}
                  fullName={requestsInYourAreaUsers.find(user => user.id === request.userId)?.fullName!}
                  avatar={requestsInYourAreaUsers.find(user => user.id === request.userId)?.avatar!}
                />
              ) )
            }
             </View>
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
            onPress={() => router.push("/auth/login")}
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
    marginTop: hp("2%"),
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    rowGap: hp("2%"),
  },
  activeCard: {
    width: "90%",
    // height: 100,
    gap: hp("1%"),
    borderRadius: 10,
    backgroundColor: colors.backgroundPrimary,
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("1.5%"),
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
    alignItems: "center",
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
    fontSize: hp("2%"),
    fontWeight: "900",
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("0.5%"),
    color: "white",
  },
  // Your request styles
  requestsContainer: {
    width: "90%",
    display: "flex",
    gap: 10,
    flexDirection: "column",
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
    fontSize: hp("2.5%"),
    fontWeight: "800",
    color: colors.textPrimary,
  },
  requestSeeAll: {
    fontSize: hp("2%"),
    fontWeight: "bold",
    color: colors.linkBlue,
    textDecorationLine: "underline",
  },
});

const onBoardingStyles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "space-around",
    color: "black",
  },
  imageStyle: {
    width: wp("100%"),
    height: hp("50%"),
  },
  header: {
    fontSize: hp("5%"),
    fontWeight: "bold",
  },
  textContainer: {
    alignItems: "center",
    gap: 20,
  },
  subText: {
    fontSize: hp("2.5%"),
    color: "gray",
  },
  buttonStyle: {
    backgroundColor: colors.primary,
    width: wp("85%"),
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
