import $ from 'jquery';
import waitInteresting from '../utils/waitInteresting';
import loadScript from '../utils/loadScript';
import svgSprite from '../utils/svgSprite';

const shareScriptUrl = 'https://yastatic.net/share2/share.js';
const socials = ['vkontakte', 'facebook', 'whatsapp', 'telegram', 'twitter', 'odnoklassniki'];
const shareElementHTML = `<div class="ya-share2" data-services="${socials.join(',')}"></div>`;

$(() => {
  const $items = $('.js-share-buttons');

  if ($items.length) {
    $items.each(async (i, item) => {
      await waitInteresting(item);
      const $item = $(item);
      $item.append(shareElementHTML);
      await loadScript(shareScriptUrl);
      const links = $item.find('a').map((j, link) => link.getAttribute('href'));

      $item.empty();
      for (const social of socials) {
        const j = socials.indexOf(social);
        // eslint-disable-next-line no-await-in-loop
        const svg = await svgSprite(`socials-${social}`);
        const link = links[j];
        $item.append(`<a class="share__item" href="${link}">${svg}</a>`);
      }
    });
  }
});
