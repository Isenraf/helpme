/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

// type is either password or data
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/updateMyPassword'
        : '/api/v1/users/updateMe';

    const res = await axios({
      method: 'patch',
      url,
      data
    });

    if (res.data.status === 'success') {
      showAlert('primary', `${type.toUpperCase()} updated successfully`);
    }
  } catch (err) {
    showAlert('danger', err.response.data.message);
  }
};
