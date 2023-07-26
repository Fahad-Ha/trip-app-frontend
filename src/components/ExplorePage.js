import React from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import ExplorePost from "./Trips/ExplorePost";
import { getAllTrips } from "../apis/trips";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";

const ExplorePage = () => {
  const navigation = useNavigation();

  const { data: trips, error } = useQuery({
    queryKey: ["trips"],
    queryFn: () => getAllTrips(),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <Text style={styles.title}>Explore</Text>

      <FlatList
        data={trips}
        renderItem={({ item }) => <ExplorePost trip={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default ExplorePage;
