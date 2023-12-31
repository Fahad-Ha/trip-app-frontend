import {
  View,
  Text,
  RefreshControl,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import { ScrollView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getAllTrips } from "../apis/trips";
import { BASE_URL } from "../apis";
import ROUTES from "../navigation";
import { getToken } from "../apis/storage";
import jwt_decode from "jwt-decode";
import { useTheme } from "@react-navigation/native";

export default function MyExplorePage({ navigation }) {
  const [userProfile, setUserProfile] = useState(null);
  const theme = useTheme();
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["trips"],
    queryFn: () => getAllTrips(),
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
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
  if (isFetching)
    return (
      <View className="flex-1 justify-center items-center top-[-5%]">
        <ActivityIndicator size="large" color="#1C535A" />
      </View>
    );
  const sortedList = shuffle(data?.length && data);

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
  // if (isFetching) return <Text>loading..</Text>;
  if (error) return <Text>No connection..</Text>;
  return (
    <View
      style={{
        flex: 0.94,
      }}
    >
      <View className=" mb-24 items-center h-full">
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={refetch} />
          }
          // className="flex-1"
          contentContainerStyle={{
            flexWrap: "wrap",
            flexDirection: "row",
            gap: 1,
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
  );
}
