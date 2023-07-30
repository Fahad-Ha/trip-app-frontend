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
import SimpleMenu from "../components/SimpleMenu";
import { useTheme } from "@react-navigation/native";

import Svg, { Path } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const Heart = ({ color }) => (
  <Svg>
    <Path
      fill={color}
      d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
    />
  </Svg>
);

const TripDetail = ({ route, navigation }) => {
  const { oneTrip, userProfile } = route.params;
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [likeCounter, setLikeCounter] = useState(null);
  const scale = useSharedValue(0);

  const theme = useTheme(); // Get the currently active theme

  const animatedHeartStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

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
          setLikeCounter(trip?.likes.length);
          // Set if the user has saved the trip
          const hasUserAlreadySaved = profileData.savedTrips.includes(trip._id);
          setIsSaved(hasUserAlreadySaved);
          setUserInfo(decoded);
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
    onSuccess: (data) => {
      setLikeCounter((prevCounter) =>
        data.message.includes("unliked") ? prevCounter - 1 : prevCounter + 1
      );
    },
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

      // Trigger the heart pop animation
      scale.value = withSpring(3, { damping: 10, stiffness: 190 }, () => {
        // Reset to 0 after popping
        scale.value = 0;
      });

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: 80,
    },
    card: {
      width: "100%",
      borderRadius: 10,
    },
    userContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 10,
    },
    profileContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    userName: {
      fontSize: 18,
      marginLeft: 10,
      color: theme.colors.text,
    },
    imageContainer: {
      flexGrow: 1,
      width: "100%",
    },

    details: {
      paddingHorizontal: 15,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginVertical: 10,
      color: theme.colors.text,
    },
    description: {
      fontSize: 16,
      marginVertical: 5,
      color: theme.colors.text,
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
      color: theme.colors.text,
    },
  });

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
        <View style={styles.userContainer}>
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
                    ROUTES.APPROUTES.OTHERPROFILE,

                    {
                      user: { _id: trip?.creator._id },
                    },
                    { key: trip?._id }
                  )
            }
          >
            <View style={styles.profileContainer}>
              <View className="w-10 h-10 overflow-hidden rounded-full border-[1px] border-white">
                <Image
                  source={{ uri: `${BASE_URL}/${trip?.creator.image}` }}
                  className="w-full h-full"
                />
              </View>
              <Text style={styles.userName}> {trip?.creator.username}</Text>
            </View>
          </Pressable>
          {userInfo?._id === trip?.creator._id && (
            <View>
              <SimpleMenu id={trip?._id} navigation={navigation} />
            </View>
          )}
        </View>

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
          <Animated.View
            style={[
              {
                position: "absolute",
                top: "40%",
                left: "40%",
                width: 50,
                height: 50,
              },
              animatedHeartStyles,
            ]}
          >
            <Heart color="white" />
          </Animated.View>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <Text style={styles.buttonText}>Likes: {likeCounter}</Text>
          </View>
          <View style={styles.buttonWrapper}>
            <View style={styles.buttonRow} className=" justify-end">
              <TouchableOpacity onPress={handleLikePress}>
                {isLiked ? (
                  <FontAwesome name="heart" size={24} color="red" />
                ) : (
                  <FontAwesome
                    name="heart-o"
                    size={24}
                    color={theme.colors.text}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSavePress}>
                <Ionicons
                  name={isSaved ? "bookmark" : "bookmark-outline"}
                  size={24}
                  color={isSaved ? theme.colors.text : theme.colors.text}
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

export default TripDetail;
