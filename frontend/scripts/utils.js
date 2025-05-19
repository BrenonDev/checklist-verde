export function init() {
    console.log('utils.js inicializado');

    const buttons = document.getElementsByClassName('under-construction');

    for (const button of buttons) {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            window.location.href = '../pages/coming-soon.html';
        });
    }

//======================================================================\\

    const toggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.nav-menu');
    const text = document.querySelectorAll('.nav-menu span');
    let hasInteracted = false;

    toggle.addEventListener('change', () => {
        if (!hasInteracted) hasInteracted = true;

        if (hasInteracted) {
            menu.classList.remove('slideCloseMenu', 'slideOpenMenu');
            menu.classList.add(toggle.checked ? 'slideOpenMenu' : 'slideCloseMenu');
            text.forEach(el => {
                el.classList.remove('appear', 'disappear');
                el.classList.add(toggle.checked ? 'appear' : 'disappear')
            });
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