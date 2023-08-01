const Urls = {
  GET: 'https://29.javascript.pages.academy/kekstagram/data',
  POST: 'https://29.javascript.pages.academy/kekstagram'
};

const sendRequest = (onSuccess, errorAlert, method, body) => {
  fetch(
    Urls[method],
    {
      method: method,
      body: body,
    },
  )
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      errorAlert(err);
    });
};
const loadData = (onSuccess, errorAlert, method = 'GET') => sendRequest(onSuccess, errorAlert, method);

const uploadData = (onSuccess, errorAlert, method = 'POST', body) => sendRequest(onSuccess, errorAlert, method, body);


export {loadData, uploadData};

