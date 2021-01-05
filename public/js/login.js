/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

export const login = async (contact, password) => {
  try {
    const res = await axios({
      method: 'post',
      url: '/api/v1/users/login',
      data: {
        phoneNumber: contact,
        password
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'logged in successfully');
      window.setTimeout(() => {
        location.assign('/dashboard');
      }, 1500);
    }
  } catch (err) {
    showAlert('danger', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'get',
      url: '/api/v1/users/logout'
    });

    if (res.data.status === 'success') location.assign('/signin');
  } catch (err) {
    showAlert('danger', 'Error logging out! Try again');
  }
};

export const setMarket = async mkid => {
  try {
    const res = await axios({
      method: 'post',
      url: `/getmarketid/${mkid}`
    });

    if (res.data.status === 'success') {
      showAlert('success', 'send successfully');
    }
  } catch (err) {
    showAlert('danger', err.response.data.message);
  }
};

export const sendEntries = async (author, entries, exits, market) => {
  try {
    const res = await axios({
      method: 'post',
      url: `/api/v1/entries`,
      data: {
        author,
        entries,
        exits,
        market
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'send successfully');
    }
  } catch (err) {
    showAlert('danger', err.response.data.message);
  }
};

export const sendProductinfo = async (
  name,
  price,
  brandName,
  summary,
  description,
  model,
  warranty,
  firstPay,
  dailyPay,
  cashPrice,
  duration
) => {
  try {
    const res = await axios({
      method: 'post',
      url: '/api/v1/products',
      data: {
        name,
        price,
        brandName,
        summary,
        description,
        model,
        warranty,
        firstPay,
        dailyPay,
        cashPrice,
        duration
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'send successfully');
    }
  } catch (err) {
    showAlert('danger', err.response.data.message);
  }
};

export const sendUserinfo = async (
  name,
  phoneNumber,
  address,
  town,
  password,
  passwordConfirm,
  role
) => {
  try {
    const res = await axios({
      method: 'post',
      url: `/api/v1/users/signup`,
      data: {
        name,
        phoneNumber,
        address,
        town,
        password,
        passwordConfirm,
        role
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'send successfully');
    }
  } catch (err) {
    showAlert('danger', err.response.data.message);
  }
};
