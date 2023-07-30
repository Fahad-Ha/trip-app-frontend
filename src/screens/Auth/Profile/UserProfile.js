import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Entypo, SimpleLineIcons } from "@expo/vector-icons";

import React, { useEffect, useState } from "react";
import Logout from "../../../components/Logout";
import { BASE_URL } from "../../../apis";
import { RefreshControl } from "react-native-gesture-handler";
import ROUTES from "../../../navigation";
import { useNavigation } from "@react-navigation/native";
import { getToken } from "../../../apis/storage";
import jwt_decode from "jwt-decode";
import { follow } from "../../../apis/auth";
import { useMutation } from "@tanstack/react-query";
import { useRoute } from "@react-navigation/native";
import socketIOClient from "socket.io-client";
import { useTheme } from "@react-navigation/native";

const UserProfile = ({
  navigation,
  profileData,
  isFetching,
  error,
  refetch,
}) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false);

  const theme = useTheme(); // Get the currently active theme

  const navigationDrawer = useNavigation();
  const routeName = useRoute();
  const profile = async () => {
    const token = await getToken();
    if (token) {
      try {
        const decoded = jwt_decode(token);

        // Set if the user has liked the trip
        const followed = profileData?.followers.includes(decoded._id);
        setIsFollowed(followed);
        setUserProfile(decoded);
      } catch (error) {
        setUserInfo(false);
      }
    } else {
      setUserInfo(false);
    }
  };
  useEffect(() => {
    profile(); // Set up the Socket.IO client
    const socket = socketIOClient(BASE_URL);

    // Listen for 'notification' events from the server
    socket.on("notification", (data) => {
      console.log("Notification received:", data);
      // Handle the notification (e.g., show a toast or display a notification)
    });

    // Clean up the Socket.IO client when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [profileData]);

  const sortedList = profileData?.trips?.sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const tripList = sortedList?.map((oneTrip) => {
    return (
      <TouchableOpacity
        key={oneTrip._id}
        className="w-[33%] h-60 mt-[-1.5%] "
        onPress={() =>
          routeName.name == ROUTES.APPROUTES.OTHERPROFILEEXPLORE
            ? navigation.push(
                ROUTES.APPROUTES.TRIP_DETAIL,

                {
                  oneTrip,
                  userProfile,
                },
                { key: profileData?._id }
              )
            : navigation.push(
                ROUTES.APPROUTES.PROFILE_TRIP_DETAIL,

                {
                  oneTrip,
                  userProfile,
                },
                { key: profileData?._id }
              )
        }
      >
        <Image
          className="w-full h-full"
          source={{
            uri: `${BASE_URL}/${oneTrip.image}`,
          }}
        />
      </TouchableOpacity>
    );
  });

  const { mutate: followFunc } = useMutation({
    mutationFn: () => follow(profileData?._id),
    onSuccess: () => {
      refetch();
    },
    onError: (err) => {
      console.log("err", err);
    },
  });

  const handleFollow = () => {
    setIsFollowed((prevIsFollowed) => !prevIsFollowed);
    followFunc();
    // Emit a 'follow' event to the server with the followerUserId and followedUserId
    const socket = socketIOClient(BASE_URL);
    socket.emit("follow", {
      followerUserId: userProfile?._id,
      followedUserId: profileData?._id,
    });
  };
  // if (isFetching)
  //   return (
  //     <View className="flex-1 justify-center items-center top-[-15%]">
  //       <ActivityIndicator size="large" color="#1C535A" />
  //     </View>
  //   );

  if (error)
    return (
      <View className="mt-20">
        <Logout />
      </View>
    );
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 0.4,
        }}
        className="mb-2"
      >
        {!profileData?.headerImage && (
          <LinearGradient
            // Background Linear Gradient
            colors={["rgba(255, 255, 255, 0.00)", "#1C535A"]}
            style={{
              paddingTop: Constants.statusBarHeight,

              flex: 1,
              position: "absolute",
              borderBottomLeftRadius: 60,
              borderBottomRightRadius: 60,
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              width: "100%",
              height: "100%",
            }}
          ></LinearGradient>
        )}

        <ImageBackground
          style={{
            flex: 1,
            paddingTop: Constants.statusBarHeight,
            borderBottomLeftRadius: 60,
            borderBottomRightRadius: 60,
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
          source={{
            uri: `${BASE_URL}/${profileData?.headerImage}`,
          }}
        >
          {profileData?.headerImage && (
            <View
              style={{
                top: 0,
                bottom: 0,
                flex: 1,
                position: "absolute",
                // zIndex: -1,
                backgroundColor: "#00000070",
                opacity: 70,
                width: "100%",
              }}
            />
          )}

          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              padding: 16,
            }}
          ></View>

          <View className="absolute right-3 top-14">
            <Pressable onPress={() => navigationDrawer.openDrawer()}>
              <Entypo name="menu" size={32} color={theme.colors.text} />
            </Pressable>
          </View>
          <View className="w-20 h-20 overflow-hidden rounded-full border-[1px] border-white">
            <Image
              className="w-full h-full"
              source={{
                uri: `${BASE_URL}/${profileData?.image}`,
              }}
            />
          </View>
          {/* <Text style={{ fontSize: 20, color: "white" }}>
            {profileData?.username}
          </Text> */}
          {userProfile?._id === profileData?._id ? (
            <>
              <View className="m-2 ">
                <Text style={{ fontSize: 20, color: "white" }}>
                  {profileData?.username}
                </Text>
                <View className="absolute left-16">
                  <Pressable onPress={() => alert("Soon.. :P")}>
                    <Feather name="edit" size={24} color="white" />
                  </Pressable>
                </View>
              </View>
            </>
          ) : (
            <>
              <Text style={{ fontSize: 20, color: theme.colors.text }}>
                {profileData?.username}
              </Text>
            </>
          )}

          <View
            style={{
              flex: 1,
              marginBottom: 20,
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Pressable
              onPress={() =>
                routeName.name == ROUTES.APPROUTES.OTHERPROFILEEXPLORE
                  ? navigation.push(
                      ROUTES.APPROUTES.OTHERFOLLOWERS_EXPLORE,
                      {
                        profileData,
                      },
                      { key: profileData?._id }
                    )
                  : navigation.push(
                      ROUTES.APPROUTES.OTHERFOLLOWERS,
                      {
                        profileData,
                      },
                      { key: profileData?._id }
                    )
              }
            >
              <View>
                <Text style={{ color: "white" }} className="text-center ">
                  Followers
                </Text>
                <Text style={{ color: "white" }} className="text-center">
                  {profileData?.followers?.length || "0"}
                </Text>
              </View>
            </Pressable>
            <View>
              <Text style={{ color: "white" }} className="text-center ">
                Trips
              </Text>
              <Text style={{ color: "white" }} className="text-center ">
                {profileData?.trips?.length || "0"}
              </Text>
            </View>

            <Pressable
              onPress={() =>
                routeName.name == ROUTES.APPROUTES.OTHERPROFILEEXPLORE
                  ? navigation.push(
                      ROUTES.APPROUTES.OTHERFOLLOWINGS_EXPLORE,
                      {
                        profileData,
                      },
                      { key: profileData?._id }
                    )
                  : navigation.push(
                      ROUTES.APPROUTES.OTHERFOLLOWINGS,
                      {
                        profileData,
                      },
                      { key: profileData?._id }
                    )
              }
            >
              <View>
                <Text style={{ color: "white" }} className="text-center ">
                  Followings
                </Text>
                <Text style={{ color: "white" }} className="text-center ">
                  {profileData?.followings?.length || "0"}
                </Text>
              </View>
            </Pressable>
          </View>
        </ImageBackground>
      </View>

      {/* Trips List View */}
      <View
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
          alignItems: "center",
        }}
      >
        {userProfile?._id === profileData?._id ? (
          <></>
        ) : (
          <>
            <TouchableOpacity onPress={handleFollow}>
              {isFollowed ? (
                <SimpleLineIcons
                  name="user-following"
                  size={24}
                  color={theme.colors.text}
                />
              ) : (
                <SimpleLineIcons
                  name="user-follow"
                  size={24}
                  color={theme.colors.text}
                />
              )}
            </TouchableOpacity>
          </>
        )}
        <View className=" mb-24 items-center h-full w-full mt-2">
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={isFetching} onRefresh={refetch} />
            }
            contentContainerStyle={{
              flexWrap: "wrap",
              flexDirection: "row",
              gap: 1,
              height: "100%",
            }}
            className="w-full"
          >
            {tripList?.length === 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="my-[50%]"
              >
                <Text
                  style={{ color: theme.colors.text }}
                  className=" text-4xl  "
                >
                  No Trips Yet
                </Text>
              </View>
            ) : (
              tripList
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default UserProfile;
