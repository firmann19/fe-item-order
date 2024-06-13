/* eslint-disable no-undef */
import debounce from "debounce-promise";
import { getData } from "../../utils/fetch";
import {
  ERROR_FETCHING_LISTS_GROUP,
  START_FETCHING_LISTS_GROUP,
  SUCCESS_FETCHING_LISTS_GROUP,
} from "./constants";

let debouncedFetchListsGroup = debounce(getData, 1000);

export const startFetchingListsGroup = () => {
  return {
    type: START_FETCHING_LISTS_GROUP,
  };
};

export const successFetchingListsGroup = ({ groups }) => {
  return {
    type: SUCCESS_FETCHING_LISTS_GROUP,
    groups,
  };
};

export const errorFetchingListsGroup = () => {
  return {
    type: ERROR_FETCHING_LISTS_GROUP,
  };
};

export const fetchListsGroup = () => {
  return async (dispatch) => {
    dispatch(startFetchingListsGroup());

    try {
      let res = await debouncedFetchListsGroup("/group");

      let _temp = [];

      res.data.data.forEach((res) => {
        _temp.push({
          value: res.id,
          label: res.name,
          target: { value: res.id, name: "groupId" },
        });
      });

      dispatch(
        successFetchingListsGroup({
          groups: _temp,
        })
      );
    } catch (error) {
      dispatch(errorFetchingListsGroup());
    }
  };
};
