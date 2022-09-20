//////////////////////////////
//                          //
//      Form processing     //
//                          //
//////////////////////////////

// Regex validations. all constants starts with rx
// rxContactName, rxEmail and rxMessage refers to Contact form

let miniumLength = "";
let maxiumLength = "";
const regexStrings = {
        rxName : "^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-]{5,30}$",
        rxPrice : "^[0-9,]*$", 
        rxVendor : "^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-]{5,40}$",
        rxStock : "^-?[0-9]*$", 
        rxCategory : "^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-]{5,50}$",
        rxShortDescription : "^.{5,80}$",
        rxLongDescription : "^.{5,2000}$",
        rxFreeShipping : "", 
        rxAgeFrom : "^[0-9]*$", 
        rxAgeTo : "^[0-9]*$", 
        rxPhotos : "",
        rxContactName : "^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9 .,\"\'\s\/_-]{4,30}$",
        rxEmail : "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$",
        rxPhone : "^[0-9]*$", //only numbers by now
        rxMessage : "^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-]{5,3000}$",
    }

const rxName = true
const rxPrice = true
const rxVendor = true
const rxStock = true
const rxCategory = true
const rxShortDescription = true
const rxLongDescription = 'verificar';
const rxFreeShipping = ''; 
const rxAgeFrom = true
const rxAgeTo = true
const rxPhotos = '';
const rxContactName = '^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-]{4,30}$';
const rxEmail = '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$';
const rxMessage = '^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-]{5,3000}$';

let textarea = document.querySelector('textarea');
let form = document.getElementById('form');
let inputsText = document.querySelectorAll('input'); // Required to form processing
let error = document.querySelector('.input-group__error')
console.log(inputsText);
inputsText.forEach((input) => {
    input.addEventListener('input', function () {
/* 
        this.classList.toggle('input-group__input--error');
        var val = this.value;
        console.log(this.id);
         */
        var val = this.value;
        // Text treatment to match Regex const names
        let inputTextCheck = this.id;
        let txtArr = inputTextCheck.split('-');
        for (var i = 0; i < txtArr.length; i++) {
            txtArr[i] = txtArr[i].charAt(0).toUpperCase() + txtArr[i].slice(1);
        }
        inputTextCheck = txtArr.join('');
        inputTextCheck = inputTextCheck.replace('Product', '');
        inputTextCheck = 'rx' + inputTextCheck;
        console.log("inputTextCheck",inputTextCheck);
        var reg = new RegExp(regexStrings[inputTextCheck]);
        console.log("reg" , reg)
        console.log("regexStrings.inputTextCheck", regexStrings[inputTextCheck])
        let testInput = reg.test(val);

        console.log("test", testInput);

        if (!testInput) {
            this.style.border = 'solid 1px #ff0000';
            var dsds = this.nextElementSibling 
            console.log("sib", dsds)
            dsds.classList.toggle('input-group__error--show');
        } else {
            this.style.border = 'solid 1px #2ecc71';
        }
    });
});

textarea.addEventListener('input', function () {
    /* 
            this.classList.toggle('input-group__input--error');
            var val = this.value;
            console.log(this.id);
             */
            var val = this.value;
            // Text treatment to match Regex const names
            let inputTextCheck = this.id;
            let txtArr = inputTextCheck.split('-');
            for (var i = 0; i < txtArr.length; i++) {
                txtArr[i] = txtArr[i].charAt(0).toUpperCase() + txtArr[i].slice(1);
            }
            inputTextCheck = txtArr.join('');
            inputTextCheck = inputTextCheck.replace('Product', '');
            inputTextCheck = 'rx' + inputTextCheck;
            console.log("inputTextCheck",inputTextCheck);
            var reg = new RegExp(regexStrings[inputTextCheck]);
            console.log("reg" , reg)
            console.log("regexStrings.inputTextCheck", regexStrings[inputTextCheck])
            let testInput = reg.test(val);
    
            console.log("test", testInput);
    
            if (!testInput) {
                this.style.border = 'solid 1px #ff0000';
                var dsds = this.nextElementSibling 
                console.log("sib", dsds)
                dsds.classList.toggle('input-group__error--show');
            } else {
                this.style.border = 'solid 1px #2ecc71';
            }
        });
   



// Listener for "submit" button
form.addEventListener('submit', function(e) {
    e.preventDefault();

    console.log(e.target.innerHTML);
});



