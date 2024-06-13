import { getData } from "../../utils/fetch";
import debounce from "debounce-promise";
import { clearNotif } from "../notif/actions";
import {
  ERROR_FETCHING_ORDERS,
  START_FETCHING_ORDERS,
  SUCCESS_FETCHING_ORDERS,
} from "./constants";

let debouncedFetchOrders = debounce(getData, 1000);

export const startFetchingOrders = () => {
  return {
    type: START_FETCHING_ORDERS,
  };
};

export const successFetchingOrders = ({ orders }) => {
  return {
    type: SUCCESS_FETCHING_ORDERS,
    orders,
  };
};

export const errorFetchingOrders = () => {
  return {
    type: ERROR_FETCHING_ORDERS,
  };
};

export const fetchOrders = () => {
  return async (dispatch) => {
    dispatch(startFetchingOrders());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 3000);

      let res = await debouncedFetchOrders("/order");

      res.data.data.forEach((res) => {
        res.User = res.User.name;
        res.NamaBarang = res.namaBarang;
        res.Harga = res.harga;
        res.JumlahOrder = res.jumlahOrder;
        res.StatusPengajuan = res.statusPengajuan;
      });

      dispatch(
        successFetchingOrders({
          orders: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingOrders());
    }
  };
};
