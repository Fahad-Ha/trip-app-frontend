import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getLikedTrips } from "../../../apis/trips";
import { useQuery } from "@tanstack/react-query";
import { RefreshControl } from "react-native-gesture-handler";
import Constants from "expo-constants";
import ROUTES from "../../../navigation";
import { BASE_URL } from "../../../apis/index";
import jwt_decode from "jwt-decode";
import { getToken } from "../../../apis/storage";
import { useTheme } from "@react-navigation/native";

const SavedTrips = ({ navigation }) => {
  const [userProfile, setUserProfile] = useState(null);
  const theme = useTheme();
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["saved-trips"],
    queryFn: () => getLikedTrips(),
  });
  const trips = data?.likedTrips;
  const profile = async () => {
    const token = await getToken();
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setUserProfile(decoded);
      } catch (error) {
        setUserProfile(false);
      }
    } else {
      setUserProfile(false);
    }
  };
  useEffect(() => {
    profile();
  }, []);

  const sortedList = trips?.reverse();
  const tripList = sortedList?.map((oneTrip) => {
    return (
      <TouchableOpacity
        key={oneTrip._id}
        className="w-[33%] h-60 mt-[-1.5%]"
        onPress={() =>
          navigation.replace(ROUTES.APPROUTES.PROFILE_TRIP_DETAIL, {
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
  if (error) return <Text>No connection..</Text>;
  return (
    <View
      style={{
        flex: 0.9,
      }}
    >
      <View className=" mb-24 items-center h-full">
        <View className="mt-20">
          <Text
            className=" text-xl font-bold"
            style={{ color: theme.colors.text }}
          >
            Liked Trips
          </Text>
        </View>
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
                No Liked Trips Yet
              </Text>
            </View>
          ) : (
            tripList
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default SavedTrips;
