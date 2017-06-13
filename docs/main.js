/*eslint-env browser */
/*eslint no-console: off */
/*global Promise */

console.log('loaded main.js');

function regitsServiceWorker() {
  if (navigator.serviceWorker) {
    return navigator.serviceWorker.register('./sw-cache.js')
    .then(()=>{
      console.log('serviceWorker.register成功。');
    })
    .catch((err)=>{
      console.log('serviceWorker.register失敗。');
      throw err;
    })
    .then(()=>{
      return fetch('./sw/sw_version').then((data) =>{
            if (data.ok) {
              return data.text();
            }

            return null;

            //throw new Error('sw_version is no response.');
        })
        .then((version)=>{

            return {version};
        });
    });
  }

  return Promise.resolve()
  .then(()=>{
    console.log('serviceWorkerが使えません。');
    throw new Error('navigator.serviceWorker undefined.');
  });
}

function checkLoadedDocument() {
  return new Promise((resolve) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', resolve);
    } else {
      resolve();
    }
  });
}

const $id=document.getElementById.bind(document);

function u$($elm) {
  return {
    text(msg) {
      $elm.textContent = msg;
    }
  };
}

(async () => {
  const values = await Promise.all([
          checkLoadedDocument(),
          regitsServiceWorker()
        ]),
        swInfo = values[1];

  console.log('LoadedDoccument');
  const $ver = $id('swVersion');

  if (swInfo === null) {
    u$($ver).text('service worker do not regist.');

    return;
  }

  u$($ver).text(swInfo.version);
})();
