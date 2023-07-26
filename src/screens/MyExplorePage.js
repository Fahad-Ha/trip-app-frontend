import {
  View,
  Text,
  FlatList,
  RefreshControl,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Constants from "expo-constants";
import { ScrollView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getAllTrips } from "../apis/trips";
import { BASE_URL } from "../apis";
import ROUTES from "../navigation";

export default function MyExplorePage({ navigation }) {
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["trips"],
    queryFn: () => getAllTrips(),
  });
  //   console.log(data);
  const tripList = data?.map((trip) => {
    console.log(`${BASE_URL}/${trip.image}`);
    return (
      <TouchableOpacity
        key={trip._id}
        className="w-[33%] h-60 mt-[-1.5%]"
        onPress={() =>
          navigation.navigate(ROUTES.APPROUTES.TRIP_DETAIL, { trip })
        }
      >
        <Image
          className="w-full h-full"
          source={{
            uri: `${BASE_URL}/${trip.image}`,
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
  );
}
