import instance from "..";

//test it
// const getAllTrips = async () => {
//   const res = await instance.get("/trips");
//   return res.data;
// };

// test it
// const getTripId = async (id) => {
//   const res = await instance.get(`/trips/${id}`);
//   return res.data;
// };

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

export {
  // getAllTrips,
  // getTripId,
  addTrip,
};
