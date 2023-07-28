import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React from "react";
import FollowList from "../../../components/Profile/FollowList";
import { getMyFollowings } from "../../../apis/auth";
import { useQuery } from "@tanstack/react-query";
import { RefreshControl } from "react-native-gesture-handler";
import Constants from "expo-constants";
const OtherFollowings = ({ navigation, route }) => {
  const { profileData } = route.params;
  const {
    data: followingsData,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["followings"],
    queryFn: () => getMyFollowings(profileData._id),
  });
  console.log(profileData.followings);
  if (isFetching)
    return (
      <View className="flex-1 justify-center items-center top-[-15%]">
        <ActivityIndicator size="large" color="#1C535A" />
      </View>
    );
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
      }
      contentContainerStyle={{
        paddingTop: Constants.statusBarHeight,
      }}
    >
      <View>
        <FollowList
          followList={followingsData?.followings}
          navigation={navigation}
        />
      </View>
    </ScrollView>
  );
};

export default OtherFollowings;
