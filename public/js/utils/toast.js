import fetchLanguageData from '../utils/langFunctions.js';

class ToastComponent {
    generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    getToastHTML(translationKey, type) {
        return `
            <div class="toast-content">
                <div class="toast-icon">
                    <i class="fa fa-${this.getIconForType(type)} fa-lg"></i>
                </div>
                <div class="toast-text" data-lang="${translationKey}">${translationKey}</div>
                <div class="toast-close">
                    <i class="fa fa-times fa-lg"></i>
                </div>
            </div>`;
    }

    createToastElement(translationKey, type, color, location) {
        const toastId = this.generateId();
        const toastElement = document.createElement('div');
        toastElement.className = `toast ${location}`;
        toastElement.innerHTML = this.getToastHTML(translationKey, type);
        toastElement.style.backgroundColor = color;
        toastElement.setAttribute('id', toastId);
        return toastElement;
    }

    attachCloseEvent(toastElement, toastId, toastContainer) {
        const closeButton = toastElement.querySelector('.toast-close');
        closeButton.onclick = () => {
            this.removeToast(toastId, toastContainer);
        };
    }

    removeToast(toastId, toastContainer) {
        const toastToRemove = document.getElementById(toastId);
        if (toastToRemove) {
            toastToRemove.classList.remove('show');
            setTimeout(() => {
                toastContainer.removeChild(toastToRemove);
            }, 300);
        }
    }

    showToast(toastElement) {
        setTimeout(() => {
            toastElement.classList.add('show');
        }, 100);

        setTimeout(() => {
            this.removeToast(toastElement.id, toastElement.parentElement);
        }, 3000);
    }

    toastNotification(translationKey, type, color, location) {
        const toastContainer = document.getElementById('toast-container');
        const toastElement = this.createToastElement(translationKey, type, color, location);
        const toastId = toastElement.id;

        this.attachCloseEvent(toastElement, toastId, toastContainer);
        toastContainer.appendChild(toastElement);
        fetchLanguageData.fetchLanguageData();
        this.showToast(toastElement);
    }

    getIconForType(type) {
        const icons = {
            'warning': 'exclamation-triangle',
            'error': 'times-circle',
            'success': 'check-circle',
            'info': 'info-circle'
        };
        return icons[type] || icons['info'];
    }

    static async init() {
        console.log('Module Toast.init()');
    }
}

const toastComponent = new ToastComponent();
export default toastComponent;
