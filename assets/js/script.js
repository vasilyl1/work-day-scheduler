let hourElement = []; // timing block
let containerFluid = document.getElementsByClassName("container-fluid"); // calendar



// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

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
    if (i < 12) { col2Element.textContent = i + "AM"; } else { col2Element.textContent = i + "PM"; }
    hourElement[i].appendChild(col2Element);
    let col8Element = document.createElement("textarea");
    col8Element.classList.add("col-8", "col-md-10", "description");
    col8Element.rows = 3;
    hourElement[i].appendChild(col8Element);

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


  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  for (let i = 0; i < 24; i++) { // add event listener for each hour button
    document.getElementById("h" + i).addEventListener("click", function (event) {
      // save button clicked - update browser local storage
      event.preventDefault();
      localStorage.setItem("hourElement" + i, JSON.stringify(hourElement[i]));
      console.log(JSON.stringify(hourElement[i]));
    });
  }

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?






  //
  // TODO: Add code to display the current date in the header of the page.
});
