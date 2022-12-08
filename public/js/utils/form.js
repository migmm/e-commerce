class Form {

    static emptyForm(fields) {
        const msgGlobalError = document.getElementsByClassName('input-group__error-form')[0];
        const msgGlobalOK = document.getElementsByClassName('input-group__ok-form')[0];
        fields.forEach(field => {
            field.value = ''
            field.classList.remove('input-group__input--ok');
        });
        setTimeout(function () {
            msgGlobalOK.classList.remove( 'input-group__ok-form--show');
            msgGlobalError.classList.remove('input-group__error--show');
        }, 5000);
    }

    static async init () {
        console.log('Form.init()');
    }
}

export default Form;