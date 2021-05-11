import $ from 'jquery';
import device from '../includes/device';

window.jQuery = $;
require('@fancyapps/fancybox');

const openPopup = (src) => {
  $.fancybox.open({
    src,
    type: 'inline',
    autoFocus: device === 'desktop',
    touch: false,
  });
};

export default openPopup;
