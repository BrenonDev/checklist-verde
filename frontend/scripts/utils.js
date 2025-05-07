export function init() {
    console.log('utils.js inicializado');

    const buttons = document.getElementsByClassName('coming-soon');

    for (const button of buttons) {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            window.location.href = '../pages/coming-soon.html';
        });
    }
}