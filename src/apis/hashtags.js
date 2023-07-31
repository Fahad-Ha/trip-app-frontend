import instance from ".";

const getHashtags = async () => {
  const res = await instance.get("/hashtags/");
  return res.data;
};

const getHashtagByName = async (name) => {
  if (name[0] === "#") {
    name = name.slice(1);
  }
  const res = await instance.get(`/hashtags/by-name/${name}`);
  return res.data;
};

export { getHashtags, getHashtagByName };
