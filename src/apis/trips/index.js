import instance from "..";

// test it
const getAllTrips = async () => {
  const res = await instance.get("/trips/gettrips");
  return res.data;
};

// test it
const getTripId = async (id) => {
  const res = await instance.get(`/trips/${id}`);
  return res.data;
};

const deleteTrip = async (tripId) => {
  const { data } = await instance.delete(`/trip/delete/${tripId}`);
  return data;
};

const addTrip = async (data) => {
  const formData = new FormData();

  for (const key in data) {
    if (key != "image") {
      formData.append(key, data[key]);
    }
  }

  formData.append("image", {
    name: data.image,
    type: "image/jpeg",
    uri: data.image,
  });

  const res = await instance.post("/trips", formData);
  return res.data;
};

const saveTrip = async (id) => {
  const res = await instance.put(`/trips/save/${id}`);
  return res.data;
};
const likeTrip = async (id) => {
  const res = await instance.put(`/trips/like/${id}`);
  return res.data;
};

export { getAllTrips, getTripId, addTrip, deleteTrip, saveTrip, likeTrip };
