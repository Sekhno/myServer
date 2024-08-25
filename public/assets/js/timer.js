/*=====================
  timer js
 ==========================*/


// "use strict";
// $(document).ready(function () {

//     //    Set the date we're counting down to
//     var countDownDate = new Date("march 1, 2024 15:37:25").getTime();

//     //    Update the count down every 1 second
//     var x = setInterval(function () {

//         // Get todays date and time
//         var now = new Date().getTime();

//         // Find the distance between now an the count down date
//         var distance = countDownDate - now;

//         // Time calculations for days, hours, minutes and seconds
//         var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//         var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//         var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//         var seconds = Math.floor((distance % (1000 * 60)) / 1000);

//         // Output the result in an element with id="demo"
//         document.getElementById("demo").innerHTML = "<span>" + days + "<span class='padding-l'>:</span><span class='timer-cal'>Days</span></span>" + "<span>" + hours + "<span class='padding-l'>:</span><span class='timer-cal'>Hrs</span></span>" +
//             "<span>" + minutes + "<span class='padding-l'>:</span><span class='timer-cal'>Min</span></span>" + "<span>" + seconds + "<span class='timer-cal'>Sec</span></span> ";

//         // If the count down is over, write some text
//         if (distance < 0) {
//             clearInterval(x);
//             document.getElementById("demo").innerHTML = "EXPIRED";
//         }
//     }, 1000);


// });


$(document).ready(function () {

    // Function to get the next day's countdown date
    function getNextDayCountDownDate() {
        var currentDate = new Date();
        var tomorrow = new Date(currentDate);
        tomorrow.setDate(currentDate.getDate() + 1);
        tomorrow.setHours(15); // Set the desired time (e.g., 15:37:25)
        tomorrow.setMinutes(37);
        tomorrow.setSeconds(25);
        return tomorrow.getTime();
    }

    // Set the initial countdown date
    var countDownDate = getNextDayCountDownDate();

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes, and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        document.getElementById("demo").innerHTML = "<span>" + days + "<span class='padding-l'>:</span><span class='timer-cal'>Days</span></span>" + "<span>" + hours + "<span class='padding-l'>:</span><span class='timer-cal'>Hrs</span></span>" +
            "<span>" + minutes + "<span class='padding-l'>:</span><span class='timer-cal'>Min</span></span>" + "<span>" + seconds + "<span class='timer-cal'>Sec</span></span> ";

        // If the count down is over, reset for the next day
        if (distance < 0) {
            countDownDate = getNextDayCountDownDate();
        }
    }, 1000);
});