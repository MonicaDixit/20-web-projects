const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");

let count = document.getElementById("count");
let total = document.getElementById("total");

const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;

//update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatCount = selectedSeats.length;
  count.innerText = selectedSeatCount;
  total.innerText = selectedSeatCount * ticketPrice;
}
// its smart to put the event listener on the parent, to enable event bubbling
container.addEventListener("click", e => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
  }

  updateSelectedCount();
});

//when we have a select box we listen for the change event
movieSelect.addEventListener("change", e => {
  ticketPrice = e.target.value;
  updateSelectedCount();
});
