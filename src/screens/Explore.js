import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import UserContext from "../context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { getAllTrips } from "../apis/trips";

// const data = [
//   {
//     id: 1,
//     imageUrl:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShcNZuBWJEQOnx48DSThyRgmFVtcRCKiykfhSbDMScuA&s",
//   },
//   {
//     id: 2,
//     imageUrl:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShcNZuBWJEQOnx48DSThyRgmFVtcRCKiykfhSbDMScuA&s",
//   },
//   {
//     id: 3,
//     imageUrl:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShcNZuBWJEQOnx48DSThyRgmFVtcRCKiykfhSbDMScuA&s",
//   },
//   {
//     id: 4,
//     imageUrl:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShcNZuBWJEQOnx48DSThyRgmFVtcRCKiykfhSbDMScuA&s",
//   },
//   {
//     id: 5,
//     imageUrl:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShcNZuBWJEQOnx48DSThyRgmFVtcRCKiykfhSbDMScuA&s",
//   },
//   // Add more images or posts as needed
// ];

const ExplorePage = () => {
  const [query, setQuery] = useState("");
  const trips = useQuery(["trips"], () => getAllTrips());

  const { data: tripsFunction, isLoading } = useQuery({
    queryKey: ["Trips"],
    queryFn: () => getAllTrips(),
  });
  const tripsList = tripsFunction?.data?.map();

  const renderPost = ({ item }) => {
    console.log(item.imageUrl);
    return (
      <View style={styles.postContainer}>
        <Image
          style={styles.postImage}
          source={{
            uri: item.imageUrl,
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
      <FlatList
        data={data}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3} // You can change the number of columns to suit your design
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  postContainer: {
    flex: 1,
    margin: 2,
    aspectRatio: 1, // Maintain the aspect ratio of the images/posts
  },
  postImage: {
    flex: 1,
    width: "100%",
    height: 100,

    borderRadius: 0,
  },
});

export default ExplorePage;
