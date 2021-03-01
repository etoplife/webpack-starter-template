import $ from 'jquery';
import 'selectize/dist/css/selectize.css';
import Selectize from 'selectize';

Selectize.define('hidden_textfield', function () {
  const self = this;
  this.setup_original = this.setup;

  this.setup = () => {
    self.setup_original();
    this.$control_input.prop('disabled', 'disabled');
  };
});

$(() => {
  const $selects = $('.js-select');

  $selects.each((i, item) => $(item).selectize({
    plugins: ['hidden_textfield'],
  }));
});
