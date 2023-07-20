// Wrapper function making an XHR request using an URL and 
// then executing a callback function if onload is successful:

function getPics(url, callback) {

  var xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);
  
  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Status code: ', xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    }
  };
  
  xhr.onerror = function() {
    console.log('Error! Status code: ', xhr.status);
  };
  
  xhr.send();
};

// Create div(s) with img and text description using fetched apiData:

const resultNode = document.querySelector('.result');
const btnNode = document.querySelector('.btn');

function displayResult(apiData) {

  let cards = '';

  apiData.forEach(item => {

    // const cardBlock = `
    //   <div class="card">
    //     <img
    //       src="${item.download_url}"
    //       class="card-image"
    //     />
    //     <p class="card-text">${item.author}</p>
    //   </div>
    // `;

    const cardBlock = `
    <div class="card">
      <div class="card-image" style="background-image: url('${item.download_url}')"></div>
      <p class="card-text">${item.author}</p>
    </div>
  `;

    cards = cards + cardBlock;
  });

  resultNode.innerHTML = cards;
}

// Prevent "e", "+", "-", ".", "," from being inputted and copy-pasted:

const inputBox = document.querySelector("#num");

const invalidChars = [
  "-", "+", "e", "E"
];

inputBox.addEventListener("input", () =>
  inputBox.value = inputBox.value.replace(/[e\+\-\,\.]/gi, ""));

inputBox.addEventListener("keydown", (e) => {
  if (invalidChars.includes(e.key)) {
    e.preventDefault();
  }
});

// Add event listener to our button to display the result (or an error) on click:

btnNode.addEventListener('click', () => {
  let inputValue = document.querySelector("#num").value;
  if (inputValue <= 10 && inputValue >= 1) {
    resultNode.innerHTML = `<p style="margin: 0 auto">Success!</p>`
    getPics(`https://picsum.photos/v2/list/?limit=${inputValue}`, displayResult);
  } else {
    resultNode.innerHTML = `<p style="color: red; margin: 0 auto">Number is out of range!</p>`
  }
})