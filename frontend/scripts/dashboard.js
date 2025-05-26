export function init() {
    console.log('dashboard.js inicializado');
    const currentPercent = 75;
    const circle = document.querySelector('.progress-circle');
    const text = document.querySelector('.percentage');
    const wrapper = document.getElementById('circleWrapper');

    const radius = 85;
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = circumference;

    function setProgress(percent) {
        const offset = circumference - (percent / 100) * circumference;
        circle.style.strokeDashoffset = offset;
        text.textContent = `${percent}%`;

        const hue = percent * 1.2;
        circle.style.stroke = `hsl(${hue}, 100%, 50%)`;
    }

    requestAnimationFrame(() => {
        circle.classList.remove('no-transition');
        wrapper.classList.add('visible');

        // Aplica o valor inicial com transição após a visibilidade
        setTimeout(() => {
        setProgress(currentPercent); // Transição suave até 75%
        }, 100);
    });
}