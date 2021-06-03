import $ from 'jquery';
import device from '../device';

if (device === 'mobile') {
  const $priceTable = $('.js-price-table');

  const getTransformedItem = ({
    name,
    img,
    pricePreposition,
    price,
    text,
  }, nameDescription, priceDescription) => `
    <div class="price-table-item">
      <div class="price-table-item__row">
        <div class="price-table-item__preview">
          <img src="${img}" alt="${name}" class="price-table-item__img">
        </div>
        <div class="price-table-item__info">
          <div class="price-table-item__section">
            <div class="price-table-item__description">${nameDescription}</div>
            <div class="price-table-item__value">${name}</div>
          </div>
          <div class="price-table-item__section">
            <div class="price-table-item__description">${priceDescription}</div>
            <div class="price-table-item__value">
              <span class="price-table-item__muted">${pricePreposition}</span> ${price}
            </div>
          </div>
        </div>
      </div>
      <div class="price-table-item__text">${text}</div>
    </div>
  `;

  const transformPriceTable = (table) => {
    const $table = $(table);
    const items = $(table).data('source');
    const $descriptions = $table.find('thead td');
    const nameDescription = $descriptions.eq(1).html();
    const priceDescription = $descriptions.eq(3).html();

    table.outerHTML = items
      .map((item) => `<div class="price-table__item">${getTransformedItem(item, nameDescription, priceDescription)}</div>`)
      .reduce((result, current) => result + current, '');
  };

  $priceTable.each((i, table) => transformPriceTable(table));
}
