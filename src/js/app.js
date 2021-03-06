import '../scss/app.scss';
import './includes/maps/areasMap';
import './includes/maps/SwitchMap';
import './includes/container';
import './includes/menu';
import './includes/main-banner';
import './utils/svgSprite';
import './includes/tables/price-table';
import './includes/tables/service-price-table';
import './includes/footer';
import './includes/popup';
import './includes/select';
import './includes/phone-mask';
import './includes/lazy-image';
import './includes/article';
import './includes/share-buttons';
import './includes/anchor';
import './includes/gallery-grid';
import './includes/tabs';

// import all svg from svg-sprite folder
const importAll = (r) => r.keys().map(r);
importAll(require.context('../images/svg-sprite', false, /\.svg$/));
