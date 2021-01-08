/* eslint-disable */
import '@babel/polyfill';
import { logout } from './login';
import {
  login,
  setMarket,
  sendEntries,
  sendUserinfo,
  sendProductinfo
} from './login';
import { updateSettings } from './updateSettings';
import { signUpCustomer } from './signup';

// DOM ELEMENTS
const signInForm = document.querySelector('.form-signin');
const logOutBtn = document.querySelector('.logout');
const userDataForm = document.querySelector('.user-data');
const userPasswordForm = document.querySelector('.user-data-password');
const customerDataForm = document.querySelector('.customer-data');
const marketForm = document.querySelector('.market-data');
const entryForm = document.querySelector('.entries-data');
const searchForm = document.querySelector('.searchbar');
const newUserData = document.querySelector('.newuser-data');
const newProductData = document.querySelector('.newproduct-data');

// DELEGATION
if (signInForm) {
  signInForm.addEventListener('submit', e => {
    e.preventDefault();

    const contact = document.getElementById('inputContact').value;
    const password = document.getElementById('inputPassword').value;

    login(contact, password);
  });
}

if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}

if (userDataForm) {
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('inputName').value;
    const phoneNumber = document.getElementById('inputPhoneNumber').value;
    updateSettings({ name, phoneNumber }, 'data');
  });
}

if (searchForm) {
  const result = document.querySelector('.searchResult');
  searchForm.addEventListener('input', e => {});
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('inputCurrent').value;
    const password = document.getElementById('inputNew').value;
    const passwordConfirm = document.getElementById('inputConfirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.save-password').textContent = 'save setting';
    document.getElementById('inputCurrent').value = '';
    document.getElementById('inputNew').value = '';
    document.getElementById('inputConfirm').value = '';
  });
}

if (marketForm) {
  marketForm.addEventListener('submit', e => {
    e.preventDefault();

    // const number = document.getElementById('inputTeamNumber').value;
    // const town = document.getElementById('inputTown').name;
    const market = document.getElementById('inputMarkets').value;

    setMarket(market);
  });
}

if (customerDataForm) {
  customSelectField();

  customerDataForm.addEventListener('submit', e => {
    e.preventDefault();

    let elValue;
    let quan;
    let nonL;
    let cs;
    const cash = [];
    const products = [];
    const notPercieved = [];

    const name = document.getElementById('inputCustomerName').value;
    const phoneNumber = document.getElementById('inputTel').value;
    const Ncni = document.getElementById('inputNcni').value;
    const locationDescription = document.getElementById('inputLocation').value;
    const firstPayment = document.getElementById('inputFirstPayment').value;
    const town = document.getElementById('inputTown').name;
    const inChargeOf = document.getElementById('inputInCharge').name;
    const market = document.getElementById('inputMarket').name;

    const listGroup = document.querySelectorAll('li.list-group-item');
    listGroup.forEach(el => {
      elValue = el.getAttribute('data-value');
      quan = el.children[1].nextSibling.textContent;
      nonL = el.children[4].nextSibling.textContent;
      cs = el.children[7].nextSibling.textContent;

      // Fill array with object
      if (quan > 0) products.push({ refId: `${elValue}`, quantity: quan });
      if (nonL > 0) notPercieved.push({ refId: `${elValue}`, quantity: nonL });
      if (cs > 0) cash.push({ refId: `${elValue}`, quantity: cs });
    });

    signUpCustomer(
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
    );
  });
}

if (entryForm) {
  customSelectField();

  entryForm.addEventListener('submit', e => {
    e.preventDefault();

    const auth = document.getElementById('inputAuthor').value;
    const market = document.getElementById('inputMarket').name;
    const entries = [];
    const exits = [];

    const listGroup = document.querySelectorAll('li.list-group-item');
    listGroup.forEach(el => {
      const elValue = el.getAttribute('data-value');
      const ent = el.children[1].nextSibling.textContent;
      const ext = el.children[4].nextSibling.textContent;

      if (ent > 0) entries.push({ refId: elValue, quantity: ent });
      if (ext > 0) exits.push({ refId: elValue, quantity: ext });
    });

    sendEntries(auth, entries, exits, market);
  });
}

if (newUserData) {
  newUserData.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('inputUserName').value;
    const phoneNumber = document.getElementById('inputTel').value;
    const address = document.getElementById('inputaddress').value;
    const town = document.getElementById('inputTown').value;
    const password = document.getElementById('inputPassword').value;
    const passwordConfirm = document.getElementById('inputPasswordConfirm')
      .value;
    const role = document.getElementById('inputRole').value;

    sendUserinfo(
      name,
      phoneNumber,
      address,
      town,
      password,
      passwordConfirm,
      role
    );

    //clear fields
    document.getElementById('inputUserName').value = '';
    document.getElementById('inputTel').value = '';
    document.getElementById('inputaddress').value = '';
    document.getElementById('inputTown').value = '';
    document.getElementById('inputPassword').value = '';
    document.getElementById('inputPasswordConfirm').value = '';
    document.getElementById('inputRole').value = '';
  });
}

if (newProductData) {
  newProductData.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('inputPdtName').value;
    const price = document.getElementById('inputPrice').value;
    const brandName = document.getElementById('inputBrandName').value;
    const summary = document.getElementById('inputSummary').value;
    const description = document.getElementById('inputDescription').value;
    const model = document.getElementById('inputModel').value.toUpperCase();
    const warranty = document.getElementById('inputWarranty').value;
    const firstPay = document.getElementById('inputFirstPay').value;
    const dailyPay = document.getElementById('inputDailyPay').value;
    const cashPrice = document.getElementById('inputCashPrice').value;
    const duration = document.getElementById('inputDuration').value;

    sendProductinfo(
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
    );

    //clear fields
    document.getElementById('inputPdtName').value = '';
    document.getElementById('inputPrice').value = '';
    document.getElementById('inputBrandName').value = '';
    document.getElementById('inputSummary').value = '';
    document.getElementById('inputDescription').value = '';
    document.getElementById('inputModel').value = '';
    document.getElementById('inputWarranty').value = '';
    document.getElementById('inputFirstPay').value = '';
    document.getElementById('inputDailyPay').value = '';
    document.getElementById('inputCashPrice').value = '';
    document.getElementById('inputDuration').value = '';
  });
}

// helpers
function customSelectField() {
  const spanGroup = document.querySelectorAll('span');
  spanGroup.forEach(el => {
    let text;
    let result;
    if (el.className === 'leftArrow') {
      el.addEventListener('click', e => {
        text = el.nextSibling.textContent;
        result = text - 1;
        el.nextSibling.textContent = result;
      });
    } else if (el.className === 'rightArrow') {
      el.addEventListener('click', e => {
        text = el.previousSibling.textContent;
        result = Number(text) + 1;
        el.previousSibling.textContent = result;
      });
    }
  });
}
