const resultNode = document.querySelector('.result');
const btnNode = document.querySelector('#btn_request');
const pageNumber = document.querySelector("#pagenum");
const picLimit = document.querySelector("#limit");
let currentMessage = '';

const dataValidate = (input1, input2) => {

  if (input1.value <= 10 && input1.value >= 1 && input2.value <= 10 && input2.value >= 1) {
    console.log(`both values passed validation`);
    return currentMessage = 'Success!';

  } else if (input2.value <= 10 && input2.value >= 1) {
    console.log(`input1 value out of range`);
    return currentMessage = `Page No. is out of range (1 to 10)!`;


  } else if (input1.value <= 10 && input1.value >= 1) {
    console.log(`input2 value out of range`);
    return currentMessage = `Limit is out of range (1 to 10)!`;
  }

  else {
    console.log(`input1 & input2 values out of range`);
    return currentMessage = `Page No. and limit are out of range (1 to 10)!`;
  }
}

function addTextMessage() {
  let message = currentMessage;
  let textElem = document.createElement("p");
  let msgText = document.createTextNode(`${message}`);

  textElem.classList = "result-text";
  if (message !== 'Success!') {
    textElem.style.color = "red"; 
  }
  resultNode.replaceChildren(textElem);
  textElem.appendChild(msgText);
}

function addImage(data) {

  resultNode.replaceChildren();

  data.forEach(image => {

    let imageElem = document.createElement("div");
    let imageCard = document.createElement("div");
    let imageCaption = document.createElement("p");
    let captionText = document.createTextNode(`${image.author}`);
  
    imageElem.classList = "card";
    imageCard.classList = "card-image";
    imageCaption.classList = "card-text";
    imageCard.style.backgroundImage = `url('${image.download_url}')`;

    resultNode.appendChild(imageElem);
    imageElem.appendChild(imageCard);
    imageElem.appendChild(imageCaption);
    imageCaption.appendChild(captionText);

  });
}

function initButton() {

  btnNode.addEventListener('click', () => {

    dataValidate(pageNumber, picLimit);
    addTextMessage();
    if (currentMessage === 'Success!') {
      fetch(`https://picsum.photos/v2/list?page=${pageNumber.value}&limit=${picLimit.value}`)
        
        .then((response) => {
          console.log('Fetch response', response);
          return response.json();
        })

        .then((data) => {
          console.log('JSON data', data);
          localStorage.setItem('dataCache', JSON.stringify(data));
          addImage(data);
        })

        .catch(() => {
          console.error(`Fetch error!`)
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {

  if (localStorage.getItem('dataCache')) {
      addImage(JSON.parse(localStorage.getItem('dataCache')));
  }

  initButton();
  
});