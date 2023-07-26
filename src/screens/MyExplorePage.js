import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Constants from "expo-constants";
import { ScrollView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getAllTrips } from "../apis/trips";

export default function MyExplorePage() {
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["trips"],
    queryFn: () => getAllTrips(),
  });

  console.log(data);
  const tripList = data?.map((trip) => {
    return <Text key={trip._id}>{trip._id}</Text>;
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "green",
        paddingTop: Constants.statusBarHeight,
      }}
    >
      <ScrollView
        style={{ backgroundColor: "red" }}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
      >
        {tripList}
      </ScrollView>
    </View>
  );
}
