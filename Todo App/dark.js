const toggeleSwitch = document.querySelector('input[type="checkbox"]');
const body = document.querySelector('.body');
const toggleIcon = document.querySelector('.toggle-icon');
const iconSvg = document.querySelector('.icon');

const svgMode = color => {
  iconSvg.src = `images/icon-${color}.svg`;
};

const toggleLightandDarkMode = isDark => {
  body.style.background = isDark ? 'light' : 'dark';

  isDark ? svgMode('dark') : svgMode('light');
};

const switchTheme = e => {
  e.preventDefault();
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    toggleLightandDarkMode(true);
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    toggleLightandDarkMode(false);
  }
};
toggeleSwitch.addEventListener('change', switchTheme);

const current = localStorage.getItem('theme');
const currentTheme = () => {
  if (current) {
    document.documentElement.setAttribute('data-theme', current);
    if (current === 'light') {
      toggeleSwitch.checked = true;
      toggleLightandDarkMode(true);
    }
  }
};

currentTheme();