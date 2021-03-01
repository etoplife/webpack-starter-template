import loadScript from './loadScript';

const YANDEX_MAP_API_KEY = 'adc1900c-be1e-4df0-949c-6edf18ec6520';
const yandexMapUrl = `https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_MAP_API_KEY}&lang=ru_RU`;

const loadYandexMap = () => new Promise((resolve) => {
  loadScript(yandexMapUrl).then(() => window.ymaps.ready(resolve));
});

export default loadYandexMap;
