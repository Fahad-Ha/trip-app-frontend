import { useState } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useMutation } from "react-query";
import { deleteTrip } from "../apis/trips/index";

const DeleteTrip = () => {
  const [open, setOpen] = useState(false);
  const [tripInfo, setTripInfo] = useState({ name: "", instructions: "" });

  const { mutate: deleteTripFun, isLoading: deletingTrip } = useMutation(
    deleteTrip,
    {
      onSuccess: () => {},
      onError: (error) => {},
    }
  );

  const handleChange = (name, value) => {
    setTripInfo({ ...tripInfo, [name]: value });
  };

  const handleDeleteTrip = (tripId) => {
    deleteTripFun(tripId);
  };

  if (!trips) return <Text>Not found!</Text>;

  return (
    <View style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
      <ScrollView style={{ marginVertical: 20 }}>
        {trips.length > 0 ? (
          trips.map((trip) => (
            <View
              key={trip.id}
              style={{
                width: 250,
                minHeight: 100,
                backgroundColor: "white",
                borderRadius: 8,
                alignItems: "center",
                padding: 10,
                marginVertical: 15,
              }}
            >
              <Text>{trip.name}</Text>
              <Text>{trip.instructions}</Text>
              <TouchableOpacity onPress={() => handleDeleteTrip(trip._id)}>
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View>
            <View
              style={{
                width: 250,
                minHeight: 100,
                backgroundColor: "#333",
                borderRadius: 8,
                alignItems: "center",
                padding: 10,
                marginVertical: 15,
              }}
            >
              <Text style={{ color: "white" }}>No trips added yet</Text>
              <Text style={{ color: "white" }}>Please add some to view</Text>
            </View>
          </View>
        )}
      </ScrollView>

      <Modal visible={open}>
        <View
          style={{ padding: 20, backgroundColor: "white", borderRadius: 8 }}
        >
          <Button
            title="Close"
            onPress={() => {
              setOpen(false);
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default DeleteTrip;
