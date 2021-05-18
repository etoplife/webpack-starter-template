import $ from 'jquery';

$('.js-anchor').click(function () {
  const target = $(this).data('anchor-target');
  const $target = $(`[data-anchor-aim="${target}"]`);

  if (!$target.length) {
    return;
  }

  const destination = $target.offset().top;
  $('html, body').animate({ scrollTop: destination }, 1000);
});
