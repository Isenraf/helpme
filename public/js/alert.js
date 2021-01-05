export const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

// type 'success' -> primary or 'error' -> danger
export const showAlert = (type, msg) => {
  hideAlert();

  const markup = `<div class="container alert alert-${type}" role="alert">${msg}</div>`;
  const form = document.querySelector('.alertContainer');

  if (form) form.insertAdjacentHTML('beforebegin', markup);
  else document.querySelector('body').insertAdjacentHTML('afterbegin', markup);

  window.setTimeout(hideAlert, 5000);
};

// insertAdjacentHTML('afterbegin', markup)
