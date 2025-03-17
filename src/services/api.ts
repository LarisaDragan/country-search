import axios from "axios";

const getCountries = async () => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    return response;
  } catch (error) {
    console.log("error in api", error);
    return error;
  }
};

export default getCountries;
