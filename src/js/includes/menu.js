import $ from 'jquery';
import device from './device';
import cssTimeToMilliseconds from '../utils/cssTimeToMilliseconds';
import { toggleFixedBody } from '../utils/window-fixed';
import svgSprite from '../utils/svgSprite';

window.$ = $;

const getMaxScreenOffset = (x, y) => {
  const screenWidth = document.documentElement.clientWidth;
  const screenHeight = window.innerHeight;

  const maxXOffset = Math.max(...[x, screenWidth - x]);
  const maxYOffset = Math.max(...[y, screenHeight - y]);
  return Math.sqrt(maxXOffset ** 2 + maxYOffset ** 2);
};

const getElementCenterCoords = ($el) => {
  const rect = $el[0].getBoundingClientRect();

  return {
    x: rect.left + window.pageXOffset + rect.width / 2,
    y: rect.top + window.pageYOffset + rect.height / 2,
  };
};

const setMenuBgDimensions = ($el, $burger) => {
  const { x, y } = getElementCenterCoords($burger);
  const diagonal = getMaxScreenOffset(x, y);

  $el.css({
    width: `${diagonal * 2}px`,
    height: `${diagonal * 2}px`,
  });
};

const resetMenuBgDimensions = ($el) => $el.css({
  width: 0,
  height: 0,
});

const setMenuBgInitialState = ($el, $burger) => {
  const { x, y } = getElementCenterCoords($burger);

  resetMenuBgDimensions($el);
  $el.css({
    position: 'fixed',
    top: `${y}px`,
    left: `${x}px`,
    transform: 'translate(-50%, -50%)',
  });
};

const getSubmenu = async ($item, depth) => {
  const link = $item.children('a').attr('href');
  const text = $item.text();
  const children = $item.data('children');

  const backIcon = await svgSprite('angle-down', {
    transform: 'rotate(90deg)',
  }, 'menu__submenu-back-angle');

  const angleIcon = await svgSprite('angle-down', {
    transform: 'rotate(-90deg)',
  }, 'menu__item-angle');

  const childrenHTML = children.map((item) => {
    let html = '';
    if (item.children) {
      html = `
        <li class="menu__submenu-item js-menu-item"
          data-depth="${depth + 1}"
          data-children='${JSON.stringify(item.children)}'>
          <a href="${item.url}" class="menu__submenu-link">
            ${item.name}
            ${angleIcon}
          </a>
        </li>
      `;
    } else {
      html = `
        <li class="menu__submenu-item">
          <a href="${item.url}" class="menu__submenu-link">${item.name}</a>
        </li>
      `;
    }

    return html;
  }).reduce((html, item) => html + item, '');

  const $mainLink = $(`<a href="${link}" class="menu__submenu-main-link">${text}</a>`);

  const $result = $(`
    <div class="menu__submenu js-menu-submenu">
      <div class="menu__submenu-body">
        <ul class="menu__submenu-list">${childrenHTML}</ul>
      </div>
    </div>
  `);

  const $backButton = $(`
    <button type="button" class="menu__submenu-back js-menu-back">
      ${backIcon}
      Назад
    </button>
  `);

  if (depth > 0) {
    $result.prepend($mainLink).append($backButton);
  }

  return $result;
};

let menuStateActive = false;
let isTransitionPassed = true;

$(() => {
  const $burger = $('.js-menu-toggle');
  const $menu = $('.js-menu');
  const $menuBg = $menu.find('.js-menu-bg');
  const $submenuContainer = $menu.find('.js-menu-submenu-container');

  setMenuBgInitialState($menuBg, $burger);

  const toggleMenu = () => {
    if (!isTransitionPassed) {
      return;
    }

    $burger.toggleClass('burger_state_active');
    $menu.toggleClass('active');
    menuStateActive = !menuStateActive;
    const transitionDuration = cssTimeToMilliseconds($menuBg.css('transition-duration'));

    if (menuStateActive) {
      setMenuBgDimensions($menuBg, $burger);
    } else {
      resetMenuBgDimensions($menuBg);
    }

    toggleFixedBody();

    isTransitionPassed = false;
    setTimeout(() => {
      isTransitionPassed = true;
    }, transitionDuration);
  };

  $burger.click(toggleMenu);

  $menu.on('click', '.js-menu-back', () => {
    $menu.trigger('menu-submenu.back');
  });

  let prevState = null;
  const history = [];
  if (device === 'desktop') {
    const $additional = $menu.find('.js-menu-additional');

    const resetSubmenu = () => {
      const $existingSubmenus = $additional.find('.js-menu-submenu');
      $additional.removeClass('active');
      $existingSubmenus.removeClass('active');
      setTimeout(() => $existingSubmenus.remove(), 300);
    };

    const showSubmenu = ($submenu) => {
      if (prevState) {
        history.push(prevState);
      }

      prevState = $submenu;
      $submenuContainer.append($submenu);
      // eslint-disable-next-line no-unused-expressions
      $submenu[0].offsetHeight;
      $submenu.addClass('active');
      $additional.removeClass('active');
      $additional.addClass('active');
    };

    const handleShowSubmenu = async function (e) {
      e.preventDefault();
      const $this = $(this);
      const depth = $this.data('depth');
      const isParent = !!$this.data('children');

      if ($this.hasClass('active')) {
        return;
      }

      if (!isParent || depth === undefined) {
        resetSubmenu();
        $menu.find('.js-menu-item').removeClass('active');
        return;
      }

      resetSubmenu();
      if (depth === 0) {
        $menu.find('.js-menu-item').removeClass('active');
      }

      const $submenu = await getSubmenu($this, depth);

      // if root element - add class to it
      if (depth === 0) {
        $this.addClass('active');
      }

      showSubmenu($submenu);
    };

    $menu.on('mouseenter', '.js-menu-item[data-depth="0"], .js-menu-item:not([data-depth])', handleShowSubmenu);
    $menu.on('click', '.js-menu-item[data-depth]:not([data-depth="0"])', handleShowSubmenu);

    $menu.on('menu-submenu.back', () => {
      const $prevMenu = history.pop();
      resetSubmenu();
      showSubmenu($prevMenu);
    });
  } else {
    const $menuList = $menu.find('.js-menu-list');

    $menu.on('click', '.js-menu-item[data-children]', async function (e) {
      e.preventDefault();

      const currentState = $menuList.html();
      history.push(currentState);

      const $this = $(this);
      const $submenu = await getSubmenu($this, 1);

      prevState = $submenu;

      $menuList.html($submenu);
    });

    $menu.on('menu-submenu.back', () => {
      const $prevSubmenu = history.pop();
      $menuList.html($prevSubmenu);
    });
  }
});
