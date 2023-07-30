import React from "react";
import { View, Text } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { Entypo } from "@expo/vector-icons";
import { deleteTrip } from "../apis/trips";
import { useMutation } from "@tanstack/react-query";
import { useTheme } from "@react-navigation/native";

export default function SimpleMenu({ navigation, id }) {
  const theme = useTheme(); // Get the currently active theme
  console.log(id);
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

  // const { mutate: deleteOneTrip } = useMutation({
  //   mutationFn: deleteTrip(id),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("trips");
  //     navigation.navigate(ROUTES.APPROUTES.EXPLORE);
  //   },
  //   onError: (err) => {
  //     console.log("err", err);
  //   },
  // });

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
          <MenuOption onSelect={() => deleteOneTrip(id)}>
            <Text
              style={{
                color: "rgba(255, 69, 0, 1) ",
                textAlign: "center",
                paddingVertical: 4,
              }}
            >
              Delete
            </Text>
          </MenuOption>
          <MenuOption onSelect={() => alert(`Edit`)}>
            <Text
              style={{
                color: "rgba(30, 144, 255, 1)   ",
                textAlign: "center",
                paddingVertical: 4,
              }}
            >
              Edit
            </Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
}
