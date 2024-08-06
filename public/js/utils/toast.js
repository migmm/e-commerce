import fetchLanguageData from '../utils/langFunctions.js';

class ToastComponent {
    /*
    * Generates a unique identifier.
    * @returns {string} - The generated unique identifier.
    */
    generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    /*
    * Generates the HTML content for the toast.
    * @param {string} translationKey - The translation key for the toast text.
    * @param {string} type - The type of toast (warning, error, success, info).
    * @returns {string} - The HTML content for the toast.
    */
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

    /*
    * Creates a toast element.
    * @param {string} translationKey - The translation key for the toast text.
    * @param {string} type - The type of toast (warning, error, success, info).
    * @param {string} color - The background color of the toast.
    * @param {string} location - The location of the toast (e.g., top-right, bottom-left).
    * @returns {HTMLElement} - The created toast element.
    */
    createToastElement(translationKey, type, color, location) {
        const toastId = this.generateId();
        const toastElement = document.createElement('div');
        toastElement.className = `toast ${location}`;
        toastElement.innerHTML = this.getToastHTML(translationKey, type);
        toastElement.style.backgroundColor = color;
        toastElement.setAttribute('id', toastId);
        return toastElement;
    }

    /*
    * Attaches a close event to the toast's close button.
    * @param {HTMLElement} toastElement - The toast element.
    * @param {string} toastId - The toast identifier.
    * @param {HTMLElement} toastContainer - The toast container.
    */
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
