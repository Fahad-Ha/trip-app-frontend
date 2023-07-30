import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { BASE_URL } from "../../apis";
import ROUTES from "../../navigation";
import { useRoute } from "@react-navigation/native";

const FollowList = ({ followList, navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const routeName = useRoute();
  console.log(routeName.name);
  const mappedFollowList = followList
    ?.sort((a, b) =>
      a?.username?.toLowerCase().localeCompare(b?.username?.toLowerCase())
    )
    .filter((user) =>
      user?.username?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((user) => (
      <TouchableHighlight
        onPress={() =>
          routeName.name !== ROUTES.APPROUTES.OTHERFOLLOWERS &&
          routeName.name !== ROUTES.APPROUTES.OTHERFOLLOWINGS
            ? navigation.push(
                ROUTES.APPROUTES.OTHERPROFILEEXPLORE,
                {
                  user,
                },
                { key: followList?._id }
              )
            : navigation.push(
                ROUTES.APPROUTES.OTHERPROFILE,
                {
                  user,
                },
                { key: followList?._id }
              )
        }
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            paddingLeft: 15,
          }}
          className="border-t-2  border-[#1c1c1c]"
        >
          <View className="w-10 h-10 overflow-hidden rounded-full border-[1px] border-white">
            <Image
              source={{ uri: `${BASE_URL}/${user?.image}` }}
              className="w-full h-full"
            />
          </View>
          <Text className="text-white mx-3">{user?.username}</Text>
        </View>
      </TouchableHighlight>
    ));

  return (
    <View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
          placeholder="Search"
          placeholderTextColor="#888"
        />
      </View>
      {mappedFollowList}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "#444",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    color: "#fff",
    backgroundColor: "#333",
  },
});

export default FollowList;
