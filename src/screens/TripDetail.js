import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
  ActivityIndicator,
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
import ROUTES from "../navigation";
import { useRoute } from "@react-navigation/native";

const TripDetail = ({ route, navigation }) => {
  const { oneTrip, userProfile } = route.params;
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const routeName = useRoute();

  const {
    data: trip,
    isFetching: tripFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["trip"],
    queryFn: () => getTripId(oneTrip._id),
  });
  const {
    data: profileData,
    isFetching: profileFetching,
    refetch: profileRefetch,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(userProfile._id),
  });

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

  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    Image.getSize(`${BASE_URL}/${trip?.image}`, (width, height) => {
      // If both width and height are greater than zero, set the values.
      if (width > 0 && height > 0) {
        setImageWidth(width);
        setImageHeight(height);
      }
    });
  }, [trip]);

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
  if (tripFetching)
    return (
      <View className="flex-1 justify-center items-center top-[-15%]">
        <ActivityIndicator size="large" color="#1C535A" />
      </View>
    );
  return (
    // <View style={styles.container}>
    <ScrollView
      contentContainerStyle={{ flex: 0.9 }}
      refreshControl={
        <RefreshControl
          refreshing={profileFetching}
          onRefresh={profileRefetch}
        />
      }
    >
      <View style={styles.card}>
        <Pressable
          onPress={() =>
            routeName.name == ROUTES.APPROUTES.TRIP_DETAIL
              ? navigation.push(
                  ROUTES.APPROUTES.OTHERPROFILEEXPLORE,

                  {
                    user: { _id: trip?.creator._id },
                  },
                  { key: trip?._id }
                )
              : navigation.push(
                  ROUTES.APPROUTES.PROFILE,

                  {
                    user: { _id: trip?.creator._id },
                  },
                  { key: trip?._id }
                )
          }
        >
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
        </Pressable>
        <TouchableOpacity
          onPress={handleDoubleTap}
          activeOpacity={1}
          style={styles.imageContainer}
        >
          <Image
            source={{ uri: `${BASE_URL}/${trip?.image}` }}
            style={{
              width: "100%",
              aspectRatio:
                imageWidth && imageHeight
                  ? imageWidth / imageHeight
                  : undefined,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              resizeMode: "cover",
            }}
          />
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <Text style={styles.buttonText}>Likes: {trip?.likes.length}</Text>
          </View>
          <View style={styles.buttonWrapper}>
            <View style={styles.buttonRow} className=" justify-end">
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
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
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
    // overflow: "hidden",
    // minHeight: "20%",
    // maxHeight: "100%",
    width: "100%",
  },

  details: {
    paddingHorizontal: 15,
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
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 2,
  },
  buttonWrapper: {
    flex: 1,
    padding: 10,
    height: 50,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
  },
  buttonText: {
    color: "white",
  },
});

export default TripDetail;
