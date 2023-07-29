import instance from ".";
const register = async (userInfo) => {
  console.log("first");
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
  console.log("first", formData);
  const res = await instance.post("/auth/register", formData);
  return res.data;
};
const login = async (userInfo) => {
  const res = await instance.post("/auth/sign-in", userInfo);
  return res.data;
};

const getProfile = async (id) => {
  const res = await instance.get(`/auth/profile/${id}`);

  return res.data;
};
const checkUsername = async (username) => {
  const res = await instance.put(`/auth/username`, { username });

  return res.data;
};

const getMyProfile = async () => {
  const res = await instance.get(`/auth/my-profile`);

  return res.data;
};
const follow = async (id) => {
  const res = await instance.put(`/auth/follow/${id}`);
  return res.data;
};

const getMyFollowers = async () => {
  const res = await instance.get(`/auth/my-followers`);

  return res.data;
};
const getMyFollowings = async () => {
  const res = await instance.get(`/auth/my-followings`);

  return res.data;
};

const getOtherFollowers = async (id) => {
  const res = await instance.get(`/auth/followers/${id}`);

  return res.data;
};

const getOtherFollowings = async (id) => {
  const res = await instance.get(`/auth/followings/${id}`);

  return res.data;
};

export {
  login,
  register,
  getProfile,
  getMyProfile,
  checkUsername,
  getMyFollowers,
  getMyFollowings,
  follow,
  getOtherFollowings,
  getOtherFollowers,
};
