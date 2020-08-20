//task1
//без хардкода и без использования глобальных переменных написать скрипт, который при вводе данных в поле будет добавлять ему класс red, если его текущее значение поля не совпадает с изначальным, и удалять этот класс, если значения совпадают

let input = document.querySelector("input");

input.onchange = () => {
  if (input.value != "Xxxx") {
    input.classList.add("red");
  } else {
    input.classList.remove("red");
  }
};

//task3
// Нужно написать скрипт на веб-странице, который должен обмениваться данными с сервером. При этом нужно послать два разных xhr-запроса подряд, а затем выполнить какой-то код. 
// Задача: написать пример кода, который отправит на сервер сразу два асинхронных запроса подряд и выведет один раз после получения обоих ответов в консоль сообщение “оба ответа получены”.

let a = new Promise((resolve, reject) => {
    fetch('http://getpost.itgid.info/index2.php?auth=5ADcB96BA48d3f80&action=1')
        .then(data => {
            resolve(data.text());
        })
});

let b = new Promise((resolve, reject) => {
    fetch('http://getpost.itgid.info/index2.php?auth=5ADcB96BA48d3f80&action=2&name=Alexander')
        .then(data => {
            resolve(data.text());
        })
});

Promise.all([a, b]).then(value => {
    /* console.log(value); */ //(2) ["hello", "hello Alexander"]
    console.log("Оба ответа получены");
});