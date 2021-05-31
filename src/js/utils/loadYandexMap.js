import loadScript from './loadScript';

const YANDEX_MAP_API_KEY = 'adc1900c-be1e-4df0-949c-6edf18ec6520';
const yandexMapUrl = `https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_MAP_API_KEY}&lang=ru_RU`;

let fetchPromise = null;

const loadYandexMap = () => {
  if (fetchPromise) {
    return fetchPromise;
  }

  return new Promise((resolve) => {
    if (fetchPromise) {
      return fetchPromise;
    }

    fetchPromise = loadScript(yandexMapUrl);

    return fetchPromise
      .then(() => window.ymaps.ready(resolve))
      .catch(() => { fetchPromise = null; });
  });
};

export default loadYandexMap;
