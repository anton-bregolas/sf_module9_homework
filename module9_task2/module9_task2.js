/* Этап 1. Подготовка данных */

// JSON, который мы будем парсить
const jsonString = `
{
  "list": [
   {
    "name": "Petr",
    "age": "20",
    "prof": "mechanic"
   },
   {
    "name": "Vova",
    "age": "60",
    "prof": "pilot"
   }
  ]
 }
`;

/* Этап 2. Получение данных + 
Запись данных в результирующий объект 
(JSON.parse сам по себе создаёт объект). 
NB: значения age придётся использовать с "+" */

const result = JSON.parse(jsonString);

console.log(result);

/* Альтернативное решение 
(создание копии для дальнейшей работы, 
приведение типа данных age из string в int).

Этап 3. Запись данных в результирующий объект */

// const list = result.list;

const listArr = result.list.map(obj => ({
name: obj.name,
age: +obj.age,
prof: obj.prof
}));

const result2 = {
  list: listArr
}

console.log(result2);
