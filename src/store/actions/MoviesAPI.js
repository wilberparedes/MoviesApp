const VERSION = `/v1`;

import axios from "axios";
import { headerAxios } from '../../settings/utils';

export const getTree = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`${url}${VERSION}/tree?filter=${fil}&all=${all}`, {
      headers: headerAxios(token),
    });
    dispatch({
      type: TREE_FETCH,
      payload: data,
    });
    return true;
  } catch (error) {
    console.log(error)
    return false;
  }
};
