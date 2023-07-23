/* Этап 1. Подготовка данных */

// Создание экземпляра класса DOMParser
const parser = new DOMParser();

// XML, который мы будем парсить
const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

/* Этап 2. Получение данных */

// Парсинг XML
const xmlDOM = parser.parseFromString(xmlString, "text/xml");

// Получение DOM-нод
const listNode = xmlDOM.querySelector("list");
const studentNodes = listNode.querySelectorAll("student");

/* Этап 3. Запись данных в результирующий объект */

const result1 = {
  "list": []
}

studentNodes.forEach((obj) => {

  let student = new Object();
  student.name = `${obj.querySelector("first").textContent} ${obj.querySelector("second").textContent}`;
  student.age = +obj.querySelector("age").textContent,
  student.prof = obj.querySelector("prof").textContent,
  student.lang = obj.querySelector("name").getAttribute("lang"),

  result1.list.push(student);

});

console.log(result1);

/* Альтернативное решение с помощь Array.from: */

const studentArr = Array.from(studentNodes).map((node) => {

  const nameNode = node.querySelector("name");
  const langAttr = nameNode.getAttribute("lang");
  const firstNameNode = nameNode.querySelector("first");
  const secondNameNode = nameNode.querySelector("second");
  const age = node.querySelector("age");
  const prof = node.querySelector("prof");
  
  return {
  name: `${firstNameNode.textContent} ${secondNameNode.textContent}`,
  age: +age.textContent,
  prof: prof.textContent,
  lang: langAttr,
  };
});

const result2 = { 
  list: studentArr 
};

console.log(result2);