export const backToTop = elementID => {
  document.getElementById(elementID)?.scrollIntoView({ behavior: 'smooth' });
};
