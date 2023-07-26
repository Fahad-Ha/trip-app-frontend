import React from "react";
import { View, Image, StyleSheet } from "react-native";

const ExplorePost = ({ trip }) => {
  return (
    <View style={styles.postContainer}>
      <Image source={{ uri: trip.imageUrl }} style={styles.postImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    margin: 5,
    aspectRatio: 1,
  },
  postImage: {
    flex: 1,
    width: "100%",
    borderRadius: 10,
  },
});

export default ExplorePost;
