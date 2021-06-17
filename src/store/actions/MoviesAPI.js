import URL from '../../../url_backend';
const BASE_API = `${URL}`;
import axios from "axios";

export const getMovies = ({ page }) => async () => {
  try {
    const { data } = await axios.get(`${BASE_API}/movie/now_playing?api_key=634b49e294bd1ff87914e7b9d014daed&language=es-CO&page=${page}`, {});
    return data;
  } catch (error) {
    console.log(error)
    return false;
  }
};

export const getMoviesDetails = ({ movie_id }) => async () => {
  try {
    const { data } = await axios.get(`${BASE_API}/movie/${movie_id}?api_key=634b49e294bd1ff87914e7b9d014daed&language=es`, {});
    return data;
  } catch (error) {
    console.log(error)
    return false;
  }
};
