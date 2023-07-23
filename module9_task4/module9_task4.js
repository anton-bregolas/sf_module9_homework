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

btnNode.addEventListener('click', () => {

  let picWidth = input1.value;
  let picHeight = input2.value;

  if (dataValidate(picWidth) && dataValidate(picHeight)) {
    fetch(`https://picsum.photos/${picWidth}/${picHeight}`)

      .then((response) => {
        console.log('Fetch response', response);
        return response;
      })
      .then((data) => {
        resultNode.innerHTML = `<p class="result-text">Success!</p>`;
        resultNode.innerHTML += `<img src=${data.url}>`;
      })

      .catch(() => { console.log('Error!') });
  } else {
    resultNode.innerHTML = `<p style="color: red" class="result-text">One of the values is out of range!</p>`;
  }
});
