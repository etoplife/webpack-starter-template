import $ from 'jquery';

const svgSprite = async (id, css, className = '') => {
  const svg = await import('../../images/svg-sprite/angle-down.svg');
  const { viewBox } = await svg.default;

  const $svg = $(`
    <svg class="svg-sprite-icon svg-sprite-icon-${id} ${className}" viewbox="${viewBox}">
      <use href="#${id}"></use>
    </svg>
  `);

  $svg.css(css);

  return $svg.css(css)[0].outerHTML;
};

export default svgSprite;
