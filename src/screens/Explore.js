import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const trips = [
  {
    id: 1,
    title: "Trip 1",
    description: "Trip 1 Details",
    image: "https://via.placeholder.com/200",
    user: "Ahmad",
  },
  {
    id: 2,
    title: "Trip 2",
    description: "Trip 2 Details",
    image: "https://via.placeholder.com/200",
    user: "Ahmad2",
  },
];

const Explore = () => {
  const navigation = useNavigation();

  const handleTripPress = (trip) => {
    navigation.navigate("TripDetail", { trip });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleTripPress(item)}>
      <View>
        <Image source={{ uri: item.image }} style={styles.thumbnail} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.user}>Added by: {item.user}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={trips}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  thumbnail: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  user: {
    fontSize: 14,
    color: "gray",
  },
});

export default Explore;
