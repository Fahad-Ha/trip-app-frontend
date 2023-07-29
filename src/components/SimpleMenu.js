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
export default function SimpleMenu({ navigation, id }) {
  console.log(id);
  const { mutate: deleteOneTrip } = useMutation({
    mutationFn: deleteTrip(id),
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
          text={<Entypo name="dots-three-horizontal" size={24} color="white" />}
        />
        <MenuOptions style={{ backgroundColor: "transparent" }}>
          <MenuOption onSelect={() => deleteOneTrip()}>
            <Text style={{ color: "red" }}>Delete</Text>
          </MenuOption>
          <MenuOption onSelect={() => alert(`Edit`)}>
            <Text style={{ color: "blue" }}>Edit</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
}
