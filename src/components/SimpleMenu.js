import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { Entypo } from "@expo/vector-icons";
import { deleteTrip } from "../apis/trips";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTheme } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import ROUTES from "../navigation";

export default function SimpleMenu({ navigation, id }) {
  const theme = useTheme(); // Get the currently active theme
  const queryClient = useQueryClient(); // Import and use query client here
  const { mutate: deleteOneTrip } = useMutation({
    mutationFn: deleteTrip,
    onSuccess: () => {
      queryClient.invalidateQueries("trips");
      navigation.navigate(ROUTES.APPROUTES.EXPLORE);
    },
    onError: (err) => {
      console.log("err", err);
    },
  });

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Menu>
        <MenuTrigger
          text={
            <Entypo
              name="dots-three-horizontal"
              size={24}
              color={theme.colors.text}
            />
          }
        />
        <MenuOptions style={{ backgroundColor: theme.colors.popMenu }}>
          <MenuOption
            onSelect={() =>
              Alert.alert(
                "Are you sure?",
                "the trip will be deleted permanently!",
                [
                  // The "Yes" button
                  {
                    text: "Delete",
                    onPress: () => {
                      deleteOneTrip(id);
                    },
                  },
                  // The "No" button
                  // Does nothing but dismiss the dialog when tapped
                  {
                    text: "Cancel",
                  },
                ]
              )
            }
          >
            <Text
              style={{
                color: "rgba(255, 69, 0, 1) ",
                textAlign: "center",
                paddingVertical: 4,
              }}
            >
              <FontAwesome
                name="trash-o"
                size={24}
                color="rgba(255, 69, 0, 1)"
              />
              <Text className="text-lg"> Delete Trip</Text>
            </Text>
          </MenuOption>
          {/* <MenuOption onSelect={() => alert(`Soon.. :P`)}>
            <Text
              style={{
                color: "rgba(30, 144, 255, 1)   ",
                textAlign: "center",
                paddingVertical: 4,
              }}
            >
              Edit
            </Text>
          </MenuOption> */}
        </MenuOptions>
      </Menu>
    </View>
  );
}
