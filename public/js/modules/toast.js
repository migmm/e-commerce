class ToastComponent  {

    toastNotification(msg) {

        let toastNotifications = document.getElementById("toast-notification");

        if (toastNotifications.childElementCount < 2) {

            let alertBox = document.createElement("div");
            alertBox.classList.add("alert-msg", "slide-in");
            let alertMsg = document.createTextNode(msg);
            alertBox.appendChild(alertMsg);

            toastNotifications.insertBefore(alertBox, toastNotifications.childNodes[0]);

          /*   if (toastNotifications.childElementCount > 0 ) {
                console.log("hay mas de uno")
                toastNotifications.childNodes[1].classList.add("slide-out")
                //toastNotifications.removeChild(toastNotifications.lastChild);
            } */
            toastNotifications.childNodes[1].classList.add("slide-out")

            setTimeout(function () {
                toastNotifications.removeChild(toastNotifications.lastChild);
                
                setTimeout(function () {
                    toastNotifications.removeChild(toastNotifications.lastChild);
                }, 2900);
                
            }, 2900);
        }
    }

    static async init () {
        console.log('Modulefgdgdggf.init()');
    }
}
const toastComponent = new ToastComponent();
export default toastComponent;