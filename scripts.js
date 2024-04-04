// Create one card from item data.

function createCardElement(item) {
  return `
      <li class="card">
          <img src="https:${item.image}" alt="">
          <div class="card-content">
              <p class="subheader">
                  ${item.subtitle}
              </p>
              <h3 class="header">
                  ${item.title}
              </h3>
          </div>
      </li>
    `;
}

// Create multiple cards from array of item data.

function createCardElements(data) {
  return data.map(createCardElement).join("");
}

// Fetch weather info.

async function fetchFullWeatherList() {
  try {
    const response = await fetch(
      "http://api.weatherapi.com/v1/forecast.json?key=bfc506191127437082c191036242803&q=Calgary&days=1&aqi=yes&alerts=no"
    );
    const data = await response.json();
    return data.results;
    //Error handling
  } catch (error) {
    console.log(error);
  }
}

// Fetch weather details.

async function fetchWeatherDetails(url) {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
    //Error handling
  } catch (error) {
    console.log(error);
  }
}


// Option 1: Selection dropdown
 
function renderOption1Results(data) {
  const card = createCardElement({
    title: data.current.temp_c,
    subtitle: data.current.condition.text,
    image: data.current.condition.icon
  });
  document.getElementById("option-1-results").innerHTML = card;
}

async function option1DropdownClickHandler(event) {
  const select = document.getElementById("dropdown");
  const url = select.options[select.selectedIndex].value;
  const data = await fetchWeatherDetails(url);
  if (data) {
    renderOption1Results(data);
  }
}

// Attach an event listener to the submit button for the Option 1 dropdown list.

const option1SubmitButton = document.getElementById("submit-button");
option1SubmitButton.addEventListener("click", option1DropdownClickHandler);