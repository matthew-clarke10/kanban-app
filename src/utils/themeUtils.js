export const updateTheme = () => {
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  document.documentElement.classList.toggle('dark', prefersDarkScheme.matches);
  prefersDarkScheme.addEventListener('change', handleThemeChange);
  return () => {
    prefersDarkScheme.removeEventListener('change', handleThemeChange);
  };
};

const handleThemeChange = (e) => {
  document.documentElement.classList.toggle('dark', e.matches);
};