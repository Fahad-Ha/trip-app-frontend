import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Entypo } from "@expo/vector-icons";

import React, { useEffect, useState } from "react";
import Logout from "../components/Logout";
import { getMyProfile } from "../apis/auth";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../apis";
import { RefreshControl } from "react-native-gesture-handler";
import ROUTES from "../navigation";
import { useNavigation } from "@react-navigation/native";

const UserProfile = ({ navigation }) => {
  const [userProfile, setUserProfile] = useState(null);

  const navigationDrawer = useNavigation();

  const {
    data: profileData,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getMyProfile(),
  });

  const profile = async () => {
    const token = await getToken();
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setUserProfile(decoded);
      } catch (error) {
        setUserInfo(false);
      }
    } else {
      setUserInfo(false);
    }
  };
  useEffect(() => {
    profile();
  }, []);

  console.log(profileData?.trips);
  const sortedList = profileData?.trips?.sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  const tripList = sortedList?.map((oneTrip) => {
    return (
      <TouchableOpacity
        key={oneTrip._id}
        className="w-[33%] h-60 mt-[-1.5%]"
        onPress={() =>
          navigation.navigate(ROUTES.APPROUTES.TRIP_DETAIL, {
            oneTrip,
            userProfile,
          })
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

  if (isFetching) return <Text>Loading..</Text>;
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
        backgroundColor: "#232323",
        // paddingTop: Constants.statusBarHeight,
      }}
    >
      <View
        style={{
          flex: 0.4,
        }}
      >
        <LinearGradient
          // Background Linear Gradient
          colors={["rgba(255, 255, 255, 0.00)", "#1C535A"]}
          style={{
            paddingTop: Constants.statusBarHeight,

            flex: 1,
            borderBottomLeftRadius: 60,
            borderBottomRightRadius: 60,
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <View
            style={{
              flexDirection: "colum",
              alignItems: "center",
              padding: 16,
            }}
          ></View>

          <View className="absolute right-3 top-14">
            <Pressable onPress={() => navigationDrawer.openDrawer()}>
              <Entypo name="menu" size={32} color="white" />
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

          <Text style={{ fontSize: 20, color: "white" }}>
            {profileData?.username}
            <Feather name="edit" size={24} color="white" />
          </Text>
          <View
            style={{
              flex: 1,

              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Text style={{ color: "white" }}>Following</Text>
            {/* <Text>400</Text> */}

            <Text style={{ color: "white" }}>Followers</Text>
            {/* <Text> 1200</Text> */}
          </View>
        </LinearGradient>
      </View>

      <View
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
        }}
      >
        <View className=" mb-24 items-center ">
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={isFetching} onRefresh={refetch} />
            }
            contentContainerStyle={{
              flexWrap: "wrap",
              flexDirection: "row",
              gap: 1,
              paddingTop: Constants.statusBarHeight,
              width: "100%",
              height: "100%",
            }}
          >
            {tripList}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default UserProfile;
