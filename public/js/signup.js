/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

export const signUpCustomer = async (
  name,
  phoneNumber,
  Ncni,
  town,
  locationDescription,
  market,
  firstPayment,
  inChargeOf,
  products,
  notPercieved,
  cash
) => {
  try {
    const res = await axios({
      method: 'post',
      url: '/api/v1/customers',
      data: {
        name,
        phoneNumber,
        Ncni,
        town,
        locationDescription,
        market,
        firstPayment,
        inChargeOf,
        products,
        notPercieved,
        cash
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'added new customer successfully.');
    }
  } catch (err) {
    showAlert('danger', 'Failure adding new customer.');
  }
};
