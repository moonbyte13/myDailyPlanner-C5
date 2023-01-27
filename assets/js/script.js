/* Wraped all code that interacts with the DOM in a call to jQuery to ensure that
the code isn't run until the browser has finished rendering all the elements
in the html. */

// Defining day.js locale obj
const locale = {}; // Your Day.js locale Object.
dayjs.locale(locale, null, true); // load locale for later use

// My variables
let cDay = document.querySelector('#currentDay');
let cTime = document.querySelector('#currentTime');
let hour = document.querySelector('#hour');
let now = dayjs();
let currentHour = now.format('H');
let saveBtn = $('.saveBtn');

// Function called after page loads
$(function () {
  refreshColor();
  displayText();

  // displayText function to display the text from the localStorage
  function displayText() {
    let blockObj = JSON.parse(localStorage.getItem('plannerNotes')) || {}
    let textKeys = Object.keys(blockObj)
    for (let i = 0; i < textKeys.length; i++) {
      $(`#text-${textKeys[i]}`).val(blockObj[textKeys[i]])
    }
  }

  // jquery event listener on click to call this function to grab the sibling text and store it in an object
  $(saveBtn).click(function(){
    let id = $(this).parent().attr("id")
    console.log($(this).siblings('.description'))
    console.log(id)
    let blockId = $(this).parent().attr('id')
    let blockText = $(this).siblings('.description').val()
    
    //blockObj['blockText'] = blockText
    let blockObj = JSON.parse(localStorage.getItem('plannerNotes')) || {}
    blockObj[blockId] = blockText
    localStorage.setItem('plannerNotes', JSON.stringify(blockObj))
  })

  // refreshColor function to refresh the color of the time blocks by comparing 'this' time
  function refreshColor() {
    $('.time-block').each(function(){
      // console.log(this.id + ' :id = ' + currentHour)
      if (this.id == currentHour) {
        $(this).removeClass('past future').addClass('present');
      }else if (this.id < currentHour){
        $(this).removeClass('future present').addClass('past');
      }else {
        $(this).removeClass('past present').addClass('future');
      }
      
      if (currentHour > 17 || currentHour < 9) {
        $(this).removeClass('past present').addClass('future');
      }
    })
  }

  // setInterval function to set the time and date and update it every second
  setInterval(function () {
    cDay.textContent = dayjs().format('MMMM/DD/YYYY');
    cTime.textContent = dayjs().format('hh:mm:ss a');
    // I tried calling refreshColor in here but when I waited to see if it would update without refreshing I did not see any change
    refreshColor()
  }, 1000);
});