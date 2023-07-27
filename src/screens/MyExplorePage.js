import {
  View,
  Text,
  FlatList,
  RefreshControl,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Constants from "expo-constants";
import { ScrollView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getAllTrips } from "../apis/trips";
import { BASE_URL } from "../apis";
import ROUTES from "../navigation";
import { getToken } from "../apis/storage";
import jwt_decode from "jwt-decode";

export default function MyExplorePage({ navigation }) {
  const [userProfile, setUserProfile] = useState(null);
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["trips"],
    queryFn: () => getAllTrips(),
  });
  console.log(userProfile);
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

  const sortedList = data?.sort(function (a, b) {
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

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View className=" mb-24 items-center">
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={refetch} />
          }
          // className="flex-1"
          contentContainerStyle={{
            flexWrap: "wrap",
            flexDirection: "row",
            gap: 1,
            paddingTop: Constants.statusBarHeight,
          }}
        >
          {tripList}
        </ScrollView>
      </View>
    </View>
  );
}
