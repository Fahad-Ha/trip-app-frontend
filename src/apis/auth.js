import instance from ".";

const login = async (userInfo) => {
  const res = await instance.post("/auth/sign-in", userInfo);
  return res.data;
};

const getProfile = async (id) => {
  const res = await instance.get(`/auth/${id}`);

  return res.data;
};
const checkUsername = async (username) => {
  const res = await instance.put(`/auth/username`, { username });

  return res.data;
};

const getMyProfile = async () => {
  const res = await instance.post(`/auth/my-profile`);

  return res.data;
};

const register = async (userInfo) => {
  const formData = new FormData();

  for (const key in userInfo) {
    if (key != "image") {
      formData.append(key, userInfo[key]);
    } else {
      formData.append("image", {
        name: userInfo.image,
        type: "image/jpeg",
        uri: userInfo.image,
      });
    }
  }

  const res = await instance.post("/auth/register", formData);
  return res.data;
};

export { login, register, getProfile, getMyProfile, checkUsername };
