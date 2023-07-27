import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { BASE_URL } from "../apis";
import { getTripId, likeTrip, saveTrip } from "../apis/trips";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getToken } from "../apis/storage";
import jwt_decode from "jwt-decode";
import { getProfile } from "../apis/auth";
import { RefreshControl } from "react-native-gesture-handler";

const TripDetail = ({ route }) => {
  const { oneTrip, userProfile } = route.params;
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const {
    data: trip,
    isFetching: tripFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["trip"],
    queryFn: () => getTripId(oneTrip._id),
  });
  const { data: profileData, isFetching: profileFetching,refetch:profileRefetch } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(userProfile._id),
  });
  console.log(profileData);

  const profile = async () => {
    const token = await getToken();
    if (token) {
      try {
        const decoded = jwt_decode(token);
        if (trip) {
          // Set if the user has liked the trip
          const hasUserAlreadyLiked = profileData.likedTrips.includes(trip._id);
          setIsLiked(hasUserAlreadyLiked);

          // Set if the user has saved the trip
          const hasUserAlreadySaved = profileData.savedTrips.includes(trip._id);
          setIsSaved(hasUserAlreadySaved);
        }
      } catch (error) {
        setUserInfo(false);
      }
    } else {
      setUserInfo(false);
    }
  };

  // console.log(profileData, userInfo);
  useEffect(() => {
    profile();
  }, [trip]);

  const { mutate: likeFunc } = useMutation({
    mutationFn: () => likeTrip(trip?._id),
    onSuccess: () => {},
    onError: (err) => {
      console.log("err", err);
    },
  });
  const { mutate: saveFunc } = useMutation({
    mutationFn: () => saveTrip(trip?._id),
    onSuccess: () => {},
    onError: (err) => {
      console.log("err", err);
    },
  });
  // Ref to keep track of the last tap timestamp for image double-tap
  const lastTapRef = useRef(null);

  // Function to handle double tap on image for liking
  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300; // Time window to consider double tap

    if (lastTapRef.current && now - lastTapRef.current < DOUBLE_PRESS_DELAY) {
      // Double tap detected, toggle like status
      setIsLiked((prevIsLiked) => !prevIsLiked);
      likeFunc();
      // Reset the last tap timestamp
      lastTapRef.current = null;
    } else {
      // Single tap, update the last tap timestamp
      lastTapRef.current = now;
    }
  };

  // Function to handle single tap on the heart icon for liking
  const handleLikePress = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
    likeFunc();
  };

  // Function to handle the "Save" button press for saving the image
  const handleSavePress = () => {
    setIsSaved((prevIsSaved) => !prevIsSaved);

    saveFunc();
  };

  useEffect(() => {
    // Reset the last tap timestamp on unmount
    return () => {
      lastTapRef.current = null;
    };
  }, []);

  if (tripFetching) return <Text>loading..</Text>;
  return (
    // <View style={styles.container}>
    <ScrollView contentContainerStyle={{ flex: 0.9 }} refreshControl={
      <RefreshControl refreshing={profileFetching} onRefresh={profileRefetch} />} >
      <View style={styles.card}>
        <View style={styles.userContainer}>
          {/* <Ionicons name="person-circle-outline" size={40} color="white" /> */}
          <View className="w-10 h-10 overflow-hidden rounded-full border-[1px] border-white">
            <Image
              source={{ uri: `${BASE_URL}/${trip?.creator.image}` }}
              className="w-full h-full"
            />
          </View>
          <Text style={styles.userName}> {trip?.creator.username}</Text>
        </View>
        <TouchableOpacity
          onPress={handleDoubleTap}
          activeOpacity={1}
          style={styles.imageContainer}
        >
          <Image
            source={{ uri: `${BASE_URL}/${trip?.image}` }}
            style={styles.image}
          />
        </TouchableOpacity>
        <View className="flex-1 flex-wrap ">
          <View className="w-1/2 p-2 h-10">
            <Text className="text-white">Likes: {trip?.likes.length}</Text>
          </View>
          <View className="w-1/2  items-end p-2  h-10">
            <View className="flex-row gap-2">
              <TouchableOpacity onPress={handleLikePress}>
                {isLiked ? (
                  <FontAwesome name="heart" size={24} color="red" />
                ) : (
                  <FontAwesome name="heart-o" size={24} color="white" />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSavePress}>
                <Ionicons
                  name={isSaved ? "bookmark" : "bookmark-outline"}
                  size={24}
                  color={isSaved ? "white" : "white"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{trip?.title}</Text>
          <Text style={styles.description}>{trip?.description}</Text>
          <View style={styles.likeContainer}></View>
        </View>
      </View>
    </ScrollView>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 80,
  },
  card: {
    width: "100%",

    borderRadius: 10,
    // backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  userName: {
    fontSize: 18,
    marginLeft: 10,
    color: "white",
  },
  imageContainer: {
    // Add flexGrow to allow the image to grow on double-tap
    flexGrow: 1,
    overflow: "hidden",
    minHeight: "30%",
    maxHeight: "70%",
  },
  image: {
    width: "100%",
    height: "100%",
    width: "100%",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    resizeMode: "cover",
  },
  details: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    color: "white",
  },
  description: {
    fontSize: 16,
    marginVertical: 5,
    color: "white",
  },
  likeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
});

export default TripDetail;
