import { useEffect, useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { Coords } from "@/types";
import { colors } from "@/constants/Colors";
import Modal from "react-native-modal";
import { addDonationThroughMaps, getAllUsersCoords, updateUserCoords } from "@/gql/user_queries";
import { useUserStore } from "@/store/userStore";

const INITIAL_REGION = {
  latitude: 20.5937,
  longitude: 78.9629,
  latitudeDelta: 5,
  longitudeDelta: 5,
};

type UserCoordsDetails = {
  id: string;
  firebaseUID: string;
  fullName: string;
  bloodType: string;
  activeForDonation: boolean;
  coords: Coords;
};

type SendRequestForDonationType ={
  userId: string;
  donationDate: string;
  donationType: string;
  bloodType: string;
  reciverId: string;
}

export default function TabTwoScreen() {
  const [location, setLocation] = useState(null);

  const [selectedUser, setSelectedUser] = useState<SendRequestForDonationType>()

  const requestLocationPermission = async () => {

    // Request permission to access the user's location
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      // Handle permission denial
      console.log("Location permission denied.");
    } else {
      // Permission granted, proceed with displaying the map
      console.log("Location permission granted.");
    }
  };

  const [usersCoords, setUsersCoords] = useState<UserCoordsDetails[]>();

  const fetchUsersCoords = async () => {
    const response = await getAllUsersCoords();
    setUsersCoords(response);
    console.log(response);
  };

  useEffect(() => {
    requestLocationPermission();
    fetchUsersCoords();
  }, []);

  const mapRef = useRef<any>();
  const navigation = useNavigation();
  const [coords, setCoords] = useState<Location.LocationObjectCoords>(); // get user coords in a particulr area
  const user = useUserStore((state) => state.user);

  // modal state
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // TODO: Add a button to navigate to my current location
  const navigateToMyCurrentLocation = async () => {


    // get my current location
    const location = await Location.getCurrentPositionAsync({});
    const { coords } = location;
    setCoords(coords);
    console.log(coords);

    // animate the map to my current location
    mapRef.current?.animateToRegion(
      {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000
    );
  };

  const addUserCoords = async () => {
    console.log("Add user coords");
    navigateToMyCurrentLocation();
    if (!coords?.latitude || !coords?.longitude) {
      console.log("No coords found");
      return;
    }
    if (user?.id) {
      const response = await updateUserCoords(
        user?.id,
        coords?.latitude.toString(),
        coords?.longitude.toString()
      );
      console.log(response);
      toggleModal();
      ToastAndroid.show("Location Updated", ToastAndroid.SHORT);
      return;
    }
  };

  const sendRequest = async () => {
    console.log("Send request to user");
    console.log(currentClickedUser);
    const response = await addDonationThroughMaps(
      user?.id!,
      new Date().toISOString(),
      "request-for-donor",
      currentClickedUser?.bloodType!,
      currentClickedUser?.id!
    )
    if(response?.id){
      ToastAndroid.show("Request Sent", ToastAndroid.SHORT);
    }
    setShowAddRequestModel(false);
  }

  const [showAddRequestModel, setShowAddRequestModel] = useState(false);
  const [currentClickedUser, setCurrentClickedUser] =
    useState<UserCoordsDetails>();
  const onMarkerPress = (_user: UserCoordsDetails) => {
    setShowAddRequestModel(true);
    setCurrentClickedUser(_user);
    console.log("Marker pressed", user);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsCompass
        ref={mapRef}
      >
        {usersCoords?.map(
          (_user: UserCoordsDetails) =>
            _user?.id !== user?.id && (
              _user?.coords?.lat && _user?.coords?.lng && (
                <Marker
                key={_user?.id}
                coordinate={{
                  latitude: parseFloat(_user?.coords?.lat),
                  longitude: parseFloat(_user?.coords?.lng),
                }}
                title={_user?.bloodType}
                onPress={() => onMarkerPress(_user)}
              />
              )
            )
        )}
        
      </MapView>
      <TouchableOpacity
        style={styles.addMyLocationButton}
        onPress={toggleModal}
      >
        <MaterialIcons
          name="add-location-alt"
          size={24}
          color={colors.emeraldGreen}
        />
      </TouchableOpacity>
      <Modal isVisible={isModalVisible} style={styles.modelContainer}>
        <View style={styles.model}>
          <Text style={{ fontSize: 16, fontWeight: "800" }}>
            Add My Location
          </Text>
          <Text>
            By clicking save it will add your location and helps others will
            able to send request through maps
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity onPress={toggleModal} style={[styles.btn]}>
              <Text style={{ color: colors.primaryLight }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={addUserCoords}
              style={[styles.btn, styles.save]}
            >
              <Text style={{ color: "white", fontWeight: "800" }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal isVisible={showAddRequestModel} style={styles.modelContainer}>
        <View style={styles.model}>
          <Text style={{ fontSize: 16, fontWeight: "800" }}>Request</Text>
          <Text>Send a request to this user</Text>
          <View>
            <Text>Blood Group :</Text>
            <Text>{currentClickedUser?.bloodType}</Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity
              onPress={() => setShowAddRequestModel(!showAddRequestModel)}
              style={[styles.btn]}
            >
              <Text style={{ color: colors.primaryLight }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => sendRequest()}
              style={[styles.btn, styles.save]}
            >
              <Text style={{ color: "white", fontWeight: "800" }}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.myLocationButton}
        onPress={navigateToMyCurrentLocation}
      >
        <MaterialIcons name="my-location" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  myLocationButton: {
    position: "absolute",
    bottom: 80,
    right: 20,
    backgroundColor: "white",
    padding: 14,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addMyLocationButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "white",
    padding: 14,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modelContainer: {
    justifyContent: "flex-end",
    margin: 0,
  },
  model: {
    padding: 20,
    borderRadius: 20,
    rowGap: 10,
    backgroundColor: "white",
  },
  btn: {
    padding: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 5,
    alignItems: "center",
  },
  save: {
    backgroundColor: colors.emeraldGreen,
  },
});
