import $ from 'jquery';
import device from '../device';

if (device === 'mobile') {
  $(() => {
    $('.service-price-table').each((i, table) => {
      const $table = $(table);
      const nameDescription = $table.find('thead tr').children().eq(0).html();
      const priceDescription = $table.find('thead tr').children().eq(2).html();

      const rootClassName = 'service-price-table-adaptive';
      const $root = $(`<div class="${rootClassName}"></div>`);
      $table.find('tbody tr').each((j, row) => {
        const $item = $(row);
        const $adaptiveItem = $(`<div class="${rootClassName}__item"></div>`);
        const name = $item.find('td').eq(0).html();
        const text = $item.find('td').eq(1).html();
        const price = $item.find('td').eq(2).html();

        $adaptiveItem.append(`
      <div class="${rootClassName}__name">
        <div class="${rootClassName}__description">${nameDescription}</div>
        <div class="${rootClassName}__value">${name}</div>
      </div>
      <div class="${rootClassName}__price">
        <div class="${rootClassName}__description">${priceDescription}</div>
        <div class="${rootClassName}__value">${price}</div>
      </div>
      <div class="${rootClassName}__text">${text}</div>
    `);

        $root.append($adaptiveItem);
      });

      $table.replaceWith($root);
    });
  });
}
