import $ from 'jquery';
import device from './device';

$(() => {
  const $article = $('.js-article');
  
  if (!$article.length) {
    return;
  }
  
  const $announcementList = $article.find('.js-article-announcement-list');

  if ($announcementList.children().length > 5 && device !== 'mobile') {
    $announcementList.css('column-count', 2);
  }
});

$(() => {
  const $listItems = $('.text-wrapper ol li');

  $listItems.each((i, item) => {
    const $children = $(item).children();

    if ($children.length > 1) {
      $children.wrapAll('<div></div>');
    }
  });
});
