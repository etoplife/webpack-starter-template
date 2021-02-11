import '../scss/app.scss';

// import all svg from svg-sprite folder
const importAll = (r) => r.keys().map(r);
importAll(require.context('../images/svg-sprite', false, /\.svg$/));

/* Your JS Code goes here */

console.log('Hello World!');
