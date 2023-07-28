
import React from "react";
import UserProfile from "./UserProfile";
import { getMyProfile } from "../../../apis/auth";
import { useQuery } from "@tanstack/react-query";

const Profile = ({ navigation }) => {
  const {
    data: profileData,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getMyProfile(),
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

export default Profile;
