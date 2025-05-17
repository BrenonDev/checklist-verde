export function init() {
    console.log('utils.js inicializado');

    const buttons = document.getElementsByClassName('coming-soon');

    for (const button of buttons) {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            window.location.href = '../pages/coming-soon.html';
        });
    }

//======================================================================\\

    const toggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.nav-menu');
    let hasInteracted = false;

    toggle.addEventListener('change', () => {
        if (!hasInteracted) hasInteracted = true;

        if (hasInteracted) {
            menu.classList.remove('slideCloseMenu', 'slideOpenMenu');
            menu.classList.add(toggle.checked ? 'slideOpenMenu' : 'slideCloseMenu');
            toggle.classList.add('transition-enabled');
        }
    });

    document.addEventListener('click', function (e) {
        const isClickInsideMenu = menu.contains(e.target);
        const isClickOnToggle = toggle.contains(e.target);

        if (!isClickInsideMenu && !isClickOnToggle && toggle.checked) {
            toggle.checked = false;
            toggle.dispatchEvent(new Event('change'));
        }
    });

//======================================================================\\

    const animation = document.querySelector('.menu-toggle');

    const enterFrames = [
        '../assets/icons/menu-app-fill.svg',
        '../assets/icons/menu-app-fill.svg',
        '../assets/icons/menu-app-fill.svg',
        '../assets/icons/menu-app-fill.svg',
        '../assets/icons/menu-app-fill.svg',
        '../assets/icons/menu-app-fill.svg',
        '../assets/icons/menu-app-fill.svg',
        '../assets/icons/menu-button-fill.svg',
        '../assets/icons/menu-button-fill.svg',
        '../assets/icons/menu-button-wide-fill.svg',
        '../assets/icons/menu-button-wide-fill.svg',
        '../assets/icons/menu-button-wide.svg',
    ];

    const returnFrames = [
        '../assets/icons/menu-app.svg',
        '../assets/icons/menu-app-fill.svg',
        '../assets/icons/menu-app-fill.svg',
        '../assets/icons/menu-app-fill.svg',
        '../assets/icons/menu-app-fill.svg',
        '../assets/icons/menu-app-fill.svg',
        '../assets/icons/menu-app-fill.svg',
        '../assets/icons/menu-app-fill.svg',
        '../assets/icons/menu-app-fill.svg',
        '../assets/icons/menu-app-fill.svg',
        '../assets/icons/menu-app-fill.svg',
        '../assets/icons/menu-app-fill.svg',
        '../assets/icons/menu-app-fill.svg',
        '../assets/icons/menu-button-fill.svg',
        '../assets/icons/menu-button-fill.svg',
        '../assets/icons/menu-button-wide-fill.svg',
        '../assets/icons/menu-button-wide-fill.svg',
    ];

    let frameIndex = 0;
    let animInterval = null;

    animation.addEventListener('change', () => {
        clearInterval(animInterval);

        if (animation.checked) {
            frameIndex = 0;
            animInterval = setInterval(() => {
                animation.style.backgroundImage = `url(${enterFrames[frameIndex]})`;
                frameIndex++;
                if (frameIndex >= enterFrames.length) {
                clearInterval(animInterval);
                }
            }, 70);
        } else {
            frameIndex = returnFrames.length - 1;
            animInterval = setInterval(() => {
                animation.style.backgroundImage = `url(${returnFrames[frameIndex]})`;
                frameIndex--;
                if (frameIndex < 0) {
                clearInterval(animInterval);
                }
            }, 70);
        }
    });
}