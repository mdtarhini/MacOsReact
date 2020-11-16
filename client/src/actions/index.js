import { SET_IS_SMALL_SCREEN } from "./types";

export const setIsSmallScreen = (value) => {
  return { type: SET_IS_SMALL_SCREEN, payload: value };
};
