import '../scss/app.scss';
import './includes/areasMap';
import './includes/container';
import './includes/menu';
import './utils/svgSprite';
import './includes/price-table';
import './includes/footer';
import './includes/popup';
import './includes/select';

// import all svg from svg-sprite folder
const importAll = (r) => r.keys().map(r);
importAll(require.context('../images/svg-sprite', false, /\.svg$/));
