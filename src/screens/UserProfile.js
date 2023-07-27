import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";

import React from "react";
import Logout from "../components/Logout";

const UserProfile = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#232323",
        // paddingTop: Constants.statusBarHeight,
      }}
    >
      <View
        style={{
          flex: 0.4,
        }}
      >
        <LinearGradient
          // Background Linear Gradient
          colors={["rgba(255, 255, 255, 0.00)", "#1C535A"]}
          style={{
            paddingTop: Constants.statusBarHeight,

            flex: 1,
            borderBottomLeftRadius: 60,
            borderBottomRightRadius: 60,
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <View
            style={{
              flexDirection: "colum",
              alignItems: "center",
              padding: 16,
            }}
          ></View>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,

              backgroundColor: "white",
            }}
          ></View>
          <Text style={{ fontSize: 20, color: "white" }}>UserName</Text>
          <View
            style={{
              flex: 1,

              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Text style={{ color: "white" }}>Following</Text>
            {/* <Text>400</Text> */}

            <Text style={{ color: "white" }}>Followers</Text>
            {/* <Text> 1200</Text> */}
          </View>
        </LinearGradient>
      </View>
      <View style={{ flex: 0.6, backgroundColor: "blue" }}>
        <View style={{ flex: 0.2, backgroundColor: "#232323" }}>
          <Logout />
        </View>
        <View style={{ flex: 0.8, backgroundColor: "#232323" }}></View>
      </View>
    </View>
  );
};

export default UserProfile;
