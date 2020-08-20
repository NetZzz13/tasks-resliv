// для реальной страницы let url = window.location.href;

let url = "http://mydomain.com/filter?size=M&color=1,2&manufacturer=aaa,ddd";
let newUrlArr = ""; // сбор неизменных частей url
let size = url.match(/\?size\=\S+?&/i); // есть ли в url значения size
/* console.log(size); */
let color = url.match(/color\=\S+?&/i);
let manufacturer = url.match(/manufacturer\=\S+?$/i);
let formElements = document.forms.form;
let sizeElements = formElements.elements.size;
let colorElements = formElements.elements.color;
let manufacturerElements = formElements.elements.manufacturer.querySelectorAll(
  "option"
);

// заполняем форму size
if (size) {
  size = size[0].slice(6, -1);
  newUrlArr = url.split(size).join("<separator>"); // '<separator>' - будущий разделитель строки
  for (let i = 0; i < sizeElements.length; i++) {
    if (sizeElements[i].value == size) {
      sizeElements[i].checked = true;
    }
  }
}
// заполняем форму color
if (color) {
  color = color[0].slice(6, -1).split(",");
  newUrlArr = newUrlArr.split(color).join("<separator>"); // '<separator>' - будущий разделитель строки
  for (let i = 0; i < colorElements.length; i++) {
    if (color.indexOf(colorElements[i].value) > -1) {
      colorElements[i].checked = true;
    }
  }
}
// заполняем форму manufacturer
if (manufacturer) {
  manufacturer = manufacturer[0].slice(13).split(",");
  newUrlArr = newUrlArr.slice(0, -(manufacturer.join("").length + 1)); // вырежем хвост
  for (let i = 0; i < manufacturerElements.length; i++) {
    if (manufacturer.indexOf(manufacturerElements[i].value) > -1) {
      manufacturerElements[i].selected = true;
    }
  }
}
newUrlArr = newUrlArr.split("<separator>"); // массив неизменных частей url

//по событию 'change' на форме будем следить за изменениями
formElements.addEventListener("change", findChanges);

function findChanges(e) {
  let target = e.target;
  // игнорируем клики по sale
  if (target.name == "sale") return;

  switch (target.name) {
    case "size":
      size = ""; // перезапишем переменную для нового url
      for (let i = 0; i < sizeElements.length; i++) {
        if (sizeElements[i].checked) {
          size = sizeElements[i].value;
          break;
        }
      }
      break;
    case "color":
      color = []; // перезапишем переменную для нового url
      for (let i = 0; i < colorElements.length; i++) {
        if (colorElements[i].checked) {
          color.push(colorElements[i].value);
        }
      }
      break;
    case "manufacturer":
      manufacturer = []; // перезапишем переменную для нового url
      for (let i = 0; i < manufacturerElements.length; i++) {
        if (manufacturerElements[i].selected) {
          manufacturer.push(manufacturerElements[i].value);
        }
      }
  }
  // новый url соберем из неизменных частей url и измененных
  url =
    newUrlArr[0] +
    size +
    newUrlArr[1] +
    color.join(",") +
    newUrlArr[2] +
    manufacturer.join(",");
  console.log(url);
}
