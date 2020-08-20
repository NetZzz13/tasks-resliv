addEventListener("DOMContentLoaded", function () {
  // Cсылка на div на странице, которая отображает текст сообщения.
  let messageEle = document.getElementById("message");

  // Функция обработки сообщений, полученных в окне.
  function receiveMessage(e) {
    // Проверка домена
    if (e.origin !== "http://domain.one") return;

    messageEle.innerHTML = "Message:" + e.data;

    if (e.data.action === "send") localSend(e.data);
    if (e.data.action === "remove") localRemove(e.data);
    if (e.data.action === "read") localRead(e.data);
  }

  function localSend(data) {
    localStorage.setItem(data.key, data.val);
    console.log("written");
    console.log(data.callb);
    eval(data.callb);
  }

  function localRemove(data) {
    localStorage.removeItem(data.key);
    console.log("removed");
  }

  function localRead(data) {
    let text = localStorage.getItem(data.key);
    console.log(text);
  }

  // Настройка прослушивателя событий, который вызывает метод receiveMessage(), когда окно получает новый MessageEvent.

  window.addEventListener("message", receiveMessage);
});
