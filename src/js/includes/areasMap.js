import $ from 'jquery';
import waitInteresting from '../utils/waitInteresting';
import loadYandexMap from '../utils/loadYandexMap';
import Dropdown from '../UI/dropdown';

class AreasMap {
  constructor(el) {
    this.$el = $(el);
    this.$map = this.$el.find('.js-areas-map');
    this.$select = this.$el.find('.js-areas-select');
  }

  static CHANGE_AREA_EVENT = 'areas-map.change';

  static activeAreaStrokeColor = 'rgb(122, 169, 93)';

  static activeAreaFillColor = 'rgba(122, 169, 93, 0.2)';

  static disabledAreaColor = 'rgba(0, 0, 0, 0)';

  activeArea = null;

  loadData = async () => {
    this.areas = await $.getJSON('/js/data/areas.json');
    this.activeArea = this.areas[0];
  };

  changeActiveArea(area) {
    this.activeArea = area;
    const currentSelectItem = this.selectList.find((item) => item.id === area.id);
    this.select.change(currentSelectItem);
    this.$el.trigger(AreasMap.CHANGE_AREA_EVENT, area);
  }

  onChange(callback) {
    this.$el.on(AreasMap.CHANGE_AREA_EVENT, (e, area) => callback.call(null, area));
  }

  setActiveAreaGeoObject = (geoObject) => {
    geoObject.options.set('fillColor', AreasMap.activeAreaFillColor);
    geoObject.options.set('strokeColor', AreasMap.activeAreaStrokeColor);
  };

  unsetActiveAreaGeoObject = (geoObject) => {
    geoObject.options.set('fillColor', AreasMap.disabledAreaColor);
    geoObject.options.set('strokeColor', AreasMap.disabledAreaColor);
  };

  getAreaGeoObject = (area) => {
    const { id, coordinates } = area;
    const polygon = new window.ymaps.Polygon(
      [coordinates],
      {
        id: id,
      },
      {
        fillColor: AreasMap.disabledAreaColor,
        strokeColor: AreasMap.disabledAreaColor,
        strokeWidth: 1,
        strokeStyle: 'solid',
      },
    );

    polygon.events.add('mouseenter', this.setActiveAreaGeoObject.bind(null, polygon));

    polygon.events.add('mouseleave', () => {
      if (id !== this.activeArea.id) {
        this.unsetActiveAreaGeoObject(polygon);
      }
    });

    polygon.events.add('click', this.changeActiveArea.bind(this, area));

    return polygon;
  };

  initSelect = () => {
    const listWithoutAreasEnding = this.areas.map(({ id, name }) => ({
      id,
      name: name.split(' ')[0],
    }));

    this.selectList = listWithoutAreasEnding;

    const select = new Dropdown(this.$select[0], listWithoutAreasEnding);
    select.onChange(({ id }) => {
      if (this.activeArea.id !== id) {
        const currentArea = this.areas.find((area) => area.id === id);
        this.changeActiveArea(currentArea);
      }
    });

    this.select = select;
  };

  initMap(el) {
    const map = new window.ymaps.Map(el, {
      center: [55.73, 37.75],
      zoom: 15,
      controls: ['zoomControl'],
    });

    const areasObjects = this.areas.map((area) => this.getAreaGeoObject(area));
    areasObjects.forEach((obj) => map.geoObjects.add(obj));
    map.setBounds(map.geoObjects.getBounds());

    this.onChange(({ id }) => {
      map.geoObjects.each((geoObject) => {
        const currentObjectId = geoObject.properties.get('id');

        if (currentObjectId === id) {
          this.setActiveAreaGeoObject(geoObject);
        } else {
          this.unsetActiveAreaGeoObject(geoObject);
        }
      });
    });

    return map;
  }

  async init() {
    await Promise.all([this.loadData(), loadYandexMap()]);
    this.initMap(this.$map[0]);
    this.initSelect();
  }
}

$(() => {
  const $items = $('.js-areas');
  $items.each((i, el) => waitInteresting(el).then(() => new AreasMap(el).init()));
});
