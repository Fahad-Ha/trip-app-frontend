import {
  View,
  Text,
  RefreshControl,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../apis";
import ROUTES from "../navigation";
import { getToken } from "../apis/storage";
import jwt_decode from "jwt-decode";
import { useRoute, useTheme } from "@react-navigation/native";
import { getHashtagByName } from "../apis/hashtags";
import Constants from "expo-constants";

const HashtagTrips = ({ route, navigation }) => {
  const { hashtag } = route.params;

  const [userProfile, setUserProfile] = useState(null);
  const theme = useTheme();
  const routeName = useRoute();

  const {
    data: hashtagData,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["hashtag-trips"],
    queryFn: () => getHashtagByName(hashtag),
  });
  const data = hashtagData?.trips;
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
          routeName.name == ROUTES.APPROUTES.HASHTAG_EXPLORE
            ? navigation.push(
                ROUTES.APPROUTES.TRIP_DETAIL,

                {
                  oneTrip,
                  userProfile,
                },
                { key: hashtagData?._id }
              )
            : navigation.push(
                ROUTES.APPROUTES.PROFILE_TRIP_DETAIL,

                {
                  oneTrip,
                  userProfile,
                },
                { key: hashtagData?._id }
              )
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
    <View className="flex-1" style={{ paddingTop: Constants.statusBarHeight }}>
      <View className="w-full items-center m-4">
        <Text className="text-xl" style={{ color: theme.colors.text }}>
          {hashtag}
        </Text>
      </View>
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
    </View>
  );
};

export default HashtagTrips;
