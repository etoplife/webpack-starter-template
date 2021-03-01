const loadScript = (url) => new Promise(function (resolve, reject) {
  const script = document.createElement('script');

  script.onload = function () {
    resolve(url);
  };

  script.onerror = function (event) {
    reject(event);
  };

  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
});

export default loadScript;
