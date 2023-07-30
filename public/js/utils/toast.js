function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function showToast(message, type, color, location) {
    const toastContainer = document.getElementById('toast-container');
    const toastElement = document.createElement('div');
    const toastId = generateId();
    toastElement.className = 'toast ' + location;
    toastElement.innerHTML = `
<div class="toast-content">
    <div class="toast-icon">
        <i class="fa fa-${getIconForType(type)} fa-lg"></i>
    </div>
    <div class="toast-text">${message}</div>
    <div class="toast-close">
        <i class="fa fa-times fa-lg"></i>
    </div>
</div>`;

    toastElement.style.backgroundColor = color;
    toastElement.setAttribute('id', toastId);

    const closeButton = toastElement.querySelector('.toast-close');
    closeButton.onclick = () => {
        const toastToRemove = document.getElementById(toastId);
        if (toastToRemove) {
            toastToRemove.classList.remove('show');
            setTimeout(() => {
                toastContainer.removeChild(toastToRemove);
            }, 300);
        }
    };

    toastContainer.appendChild(toastElement);

    setTimeout(() => {
        toastElement.classList.add('show');
    }, 100);

    setTimeout(() => {
        const toastToRemove = document.getElementById(toastId);
        if (toastToRemove) {
            toastToRemove.classList.remove('show');
            setTimeout(() => {
                toastContainer.removeChild(toastToRemove);
            }, 300);
        }
    }, 3000);
}

function getIconForType(type) {
    switch (type) {
        case 'warning':
            return 'exclamation-triangle';
        case 'error':
            return 'times-circle';
        case 'success':
            return 'check-circle';
        default:
            return 'info-circle';
    }
}