let hourElement = []; // timing block
let containerFluid = document.getElementsByClassName("container-fluid"); // calendar
let timer;
let currentHour = dayjs().hour(); // remembers current hour


$(function () {

  $('#currentDay').text(dayjs().format('dddd, MMMM D')); // adds the date to the header block
  document.getElementsByTagName("body")[0].classList.add("border", "border-dark", "rounded", "m-4"); // adds border
  document.getElementsByTagName("header")[0].classList.add("text-center"); // centers the text
  containerFluid[0].classList.add("border-top", "border-5", "border-dark"); // add border


  for (let i = 0; i < 24; i++) { // create and append div element for every hour
    hourElement[i] = document.createElement("div");
    hourElement[i].classList.add("row", "time-block");
    if (dayjs().hour() === i) { //current hour
      hourElement[i].classList.add("row", "time-block", "present");
    }
    else if (dayjs().hour() > i) { // past
      hourElement[i].classList.add("row", "time-block", "past");
    } else { // future
      hourElement[i].classList.add("row", "time-block", "future");
    }

    hourElement[i].setAttribute("id", "hour-" + i);

    let col2Element = document.createElement("div"); // define timeblock style
    col2Element.classList.add("col-2", "col-md-1", "hour", "text-center", "py-3");
    if (i < 12) { col2Element.textContent = i + "AM"; } // formatting AM/PM style of lables
    else { 
      let j = i - 12;
      if (j === 0) {j = 12;} 
      col2Element.textContent = j + "PM"; }

    hourElement[i].appendChild(col2Element);
    let col8Element = document.createElement("textarea");
    col8Element.classList.add("col-8", "col-md-10", "description");
    col8Element.rows = 3;
    col8Element.setAttribute("id", "t" + i); // set id for local storage
    if (localStorage.getItem("textInput" + i) === undefined) { //initialize local storage
      localStorage.setItem("textInput" + i, "");
    }
    col8Element.value = localStorage.getItem("textInput" + i); // sync with the screen input 

    hourElement[i].appendChild(col8Element); // add into HTML

    let btn = document.createElement("button"); // add button for each block
    btn.classList.add("btn", "saveBtn", "col-2", "col-md-1");
    btn.setAttribute("id", "h" + i); // set id for the event listener
    btn.ariaLabel = "save";

    let iElement = document.createElement("i"); // option for the button
    iElement.classList.add("fas", "fa-save");
    iElement.ariaHidden = "true";
    btn.appendChild(iElement);
    hourElement[i].appendChild(btn);

    containerFluid[0].appendChild(hourElement[i]);

  }


  for (let i = 0; i < 24; i++) { // add event listener for each hour button
    document.getElementById("h" + i).addEventListener("click", function (event) {
      // save button clicked - update browser local storage
      event.preventDefault();
      localStorage.setItem("textInput" + i, document.getElementById("t" + i).value); //write the text to the localstorage
    });
  }

  timer = setInterval(function(){ // manage the event when the hour changes
    if (currentHour !== dayjs().hour()) { // change the block color if the time passed
      hourElement[currentHour].classList.remove("present");
      hourElement[currentHour].classList.add("past");
      currentHour = dayjs().hour();
      hourElement[currentHour].classList.remove("future");
      hourElement[currentHour].classList.add("present");
    }
  },60000); // calls timer every one minute
  

});
