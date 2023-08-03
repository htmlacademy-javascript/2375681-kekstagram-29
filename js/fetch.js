const Urls = {
  GET: 'https://29.javascript.pages.academy/kekstagram/data',
  POST: 'https://29.javascript.pages.academy/kekstagram'
};

const sendRequest = (onSuccess, showErrorAlert, method, body) => {
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
      showErrorAlert(err);
    });
};
const loadData = (onSuccess, showErrorAlert, method = 'GET') => sendRequest(onSuccess, showErrorAlert, method);

const uploadData = (onSuccess, showErrorAlert, method = 'POST', body) => sendRequest(onSuccess, showErrorAlert, method, body);


export {loadData, uploadData};
