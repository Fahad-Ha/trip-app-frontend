import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import ExplorePost from "./ExplorePost";

const ExplorePage = ({ trip }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <FlatList
        data={trip}
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
