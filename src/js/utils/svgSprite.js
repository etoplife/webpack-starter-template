import $ from 'jquery';

const svgSprite = async (id, css, className = '') => {
  const svg = await import(`../../images/svg-sprite/${id}.svg`);
  const { viewBox } = await svg.default;

  const $svg = $(`
    <svg class="svg-sprite-icon svg-sprite-icon-${id} ${className}" viewbox="${viewBox}">
      <use href="#${id}"></use>
    </svg>
  `);

  if (css) {
    $svg.css(css);
  }

  return $svg[0].outerHTML;
};

export default svgSprite;
