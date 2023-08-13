
const arrowSlider = () => {

    document.addEventListener('click', e => {

        if (e.target.classList.value === 'fa fa-chevron-circle-left fa-5x') {
            const slider = e.target.parentNode.previousElementSibling;
            slider.classList.add('scroll-smooth');
            slider.scrollLeft += -290;
            slider.classList.remove('scroll-smooth');
            return;
        }

        if (e.target.classList.value === 'fa fa-chevron-circle-right fa-5x') {
            const slider = e.target.parentNode.previousElementSibling.previousElementSibling;
            slider.classList.add('scroll-smooth');
            slider.scrollLeft += 290;
            slider.classList.remove('scroll-smooth');
            return;
        }
    })
}

const cardSlider = () => {
    let isDown = false;
    let sliders = {};
    let startX;
    let scrollLeft;

    const end = () => {
        isDown = false;
        for (const slider of Object.values(sliders)) {
            slider.container.classList.remove('active', 'grab');
        }
    }

    const start = (e) => {
        isDown = true;
        const slider = e.target.closest('.cards-container');
        slider.classList.add('active');
        startX = e.pageX || e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        slider.classList.add('grab');
    }

    const move = (e) => {
        if (!isDown) return;
        const slider = e.target.closest('.cards-container');
        slider.classList.add('grab');
        e.preventDefault();
        const x = e.pageX || e.touches[0].pageX;
        const dist = (x - startX);
        slider.scrollLeft = scrollLeft - dist;
    }

    const containers = document.querySelectorAll('.cards-container');
    containers.forEach(container => {
        container.addEventListener('mousedown', start);
        container.addEventListener('touchstart', start);
        container.addEventListener('mousemove', move);
        container.addEventListener('touchmove', move);
        container.addEventListener('mouseleave', end);
        container.addEventListener('mouseup', end);
        container.addEventListener('touchend', end);
    });
}

export default {
    arrowSlider,
    cardSlider
}