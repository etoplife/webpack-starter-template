const isDesktop = document.documentElement.clientWidth > 1199;
const isMobile = document.documentElement.clientWidth < 768;
const isTablet = !isDesktop && !isMobile;

const device = isDesktop ? 'desktop' : (isTablet ? 'tablet' : 'mobile');

export default device;
