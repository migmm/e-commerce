////////////////////////////////
//                            //
//    //Pseudo hero slider    //
//                            //
////////////////////////////////
 //-Need improvements-
var slideIndex = 0;
carousel();

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");

    console.log(x)
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    
    slideIndex++;
    if (slideIndex > x.length) {slideIndex = 1}
    x[slideIndex-1].style.display = "block";
    setTimeout(carousel, 2000);
    x= false // Change image every 2 seconds
}