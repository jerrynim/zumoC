import { MAPS_KEY } from "./keys";
import axios from "axios";

export const reverseGeoCode = async (lat: number, lng: number) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAPS_KEY}`;
  const { data } = await axios(URL);
  if (!data.error_message) {
    const { results } = data;
    const firstPlace = results[0];
    const address = firstPlace.formatted_address;
    return address;
  } else {
    return "";
  }
};
