import fetch from 'isomorphic-fetch';
import config from 'config';

export default function request(params) {
  const headers = {
    'Content-Type': 'application/json',
  };

  return fetch(`http://${config.apiUrl}/${params.url}`, {
    method: params.method || 'GET',
    body: JSON.stringify(params.body),
    headers: headers,
  })
   .then(res => {
     if (res.status >= 400) {
       return res.json().then(err => Promise.reject(err.errors));
     }
     return res.json();
   });
}
