import instance from ".";

const login = async (userInfo) => {
  const res = await instance.post("/auth/sign-in", userInfo);
  return res.data;
};

const fetchImageFromUrl = async (imageUrl) => {
  try {
    const response = await fetch(imageUrl);
    const imageBlob = await response.blob();
    return imageBlob;
  } catch (error) {
    throw new Error("Failed to fetch image from URL");
  }
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
  console.log(formData);
  const res = await instance.post("/auth/register", formData);
  return res.data;
};

export { login, register };
