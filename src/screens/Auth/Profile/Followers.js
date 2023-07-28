import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import FollowList from "../../../components/Profile/FollowList";
import { getMyFollowers } from "../../../apis/auth";
import { useQuery } from "@tanstack/react-query";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import Constants from "expo-constants";
const Followers = ({ navigation }) => {
  const {
    data: followersData,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["followings"],
    queryFn: () => getMyFollowers(),
  });

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
        <FollowList followList={followersData?.followers} navigation={navigation}/>
      </View>
    </ScrollView>
  );
};

export default Followers;
