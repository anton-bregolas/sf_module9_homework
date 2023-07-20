const resultNode = document.querySelector('.result');
const btnNode = document.querySelector('.btn');

let input1 = document.querySelector("#num1");
let input2 = document.querySelector("#num2");

const dataValidate = (input) => {
  if (input <= 300 && input >= 100) {
    console.log(`Value ${input} passed validation!`)
    return input;
  } else {
    console.log(`Value ${input} failed validation!`)
  }
}

function displayResult(apiData) {

  const cardBlock = `
      <div class="card">
        <img
          src="${apiData.url}"
          class="card-image"
        />
      </div>
    `;

  resultNode.innerHTML = cardBlock;
}

btnNode.addEventListener('click', () => {

  let picWidth = input1.value;
  let picHeight = input2.value;

  if (dataValidate(picWidth) && dataValidate(picHeight)) {
    fetch(`https://picsum.photos/${picWidth}/${picHeight}`)

      .then((response) => {
        // Объект ответа на запрос
        console.log('Fetch response', response);
        // Превращаем объект в JSON. Мы не можем его сразу прочитать,
        // надо отдать в следующий then
        // const result = response.json();
        // console.log('Fetch result', result);
        return response;
      })
      .then((data) => {
        // Объект результата в формате JSON
        displayResult(data);
      })

      .catch(() => { console.log('Error!') });
  } else {
    resultNode.innerHTML = `<p style="color: red; margin: 0 auto">One of the values is out of range!</p>`
  }
});


// Prevent "e", "+", "-", ".", "," from being inputted and copy-pasted:

// const inputBox = document.querySelector("#num");

// const invalidChars = [
//   "-", "+", "e", "E"
// ];

// inputBox.addEventListener("input", () =>
//   inputBox.value = inputBox.value.replace(/[e\+\-\,\.]/gi, ""));

// inputBox.addEventListener("keydown", (e) => {
//   if (invalidChars.includes(e.key)) {
//     e.preventDefault();
//   }
// });