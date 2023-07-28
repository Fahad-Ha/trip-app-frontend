import React from "react";
import UserProfile from "./UserProfile";
import { getMyProfile, getProfile } from "../../../apis/auth";
import { useQuery } from "@tanstack/react-query";

const OtherUserProfile = ({ navigation, route }) => {
  const { user } = route.params;
  const {
    data: profileData,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user-profile"],
    queryFn: () => getProfile(user?._id),
  });
  return (
    <UserProfile
      navigation={navigation}
      profileData={profileData}
      isFetching={isFetching}
      error={error}
      refetch={refetch}
    />
  );
};

export default OtherUserProfile;
