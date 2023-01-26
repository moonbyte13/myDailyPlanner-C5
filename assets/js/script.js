// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

const locale = {} // Your Day.js locale Object.

dayjs.locale(locale, null, true) // load locale for later use

let cDay = document.querySelector('#currentDay')
let cTime = document.querySelector('#currentTime')
let hour = document.querySelector('#hour')
let now = dayjs();
let currentHour = now.format('H')

/* // UpdateLocale adds .updateLocale API to update a locale's properties.
let updateLocale = require('dayjs/plugin/updateLocale')
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  months : String['']
}) */


$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time
  
  function refreshColor() {
    $('.time-block').each(function(){
      // console.log(this.id + ' :id = ' + currentHour)
      if (this.id == currentHour) {
        $(this).removeClass('past future').addClass('present');
      }else if (this.id < currentHour){
        $(this).addClass('past');
      }else {
        $(this).removeClass('past present').addClass('future');
      }
      
      if (currentHour > 17 || currentHour < 9) {
        $(this).removeClass('past present').addClass('future');
      }
    })
  }
  
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  setInterval(function () {
    cDay.textContent = dayjs().format('MMMM/DD/YYYY');
    cTime.textContent = dayjs().format('hh:mm:ss a');
    refreshColor()
  }, 1000);
});