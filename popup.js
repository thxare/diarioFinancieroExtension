document.addEventListener("DOMContentLoaded", function () {
  const boton = document.getElementById("change-message");

  function injectScript() {
    const arr = Array.from(document.querySelectorAll("p"));
    const resultado = arr.map((article) => article.textContent).join("\n");
    return resultado;
  }

  boton.addEventListener("click", function () {
    // Obtén la pestaña actual
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentTab = tabs[0]; // la pestaña actual

      chrome.scripting.executeScript(
        {
          target: { tabId: currentTab.id },
          function: injectScript,
        },
        function (results) {
          const resultadoDiv = document.getElementById("resultado");
          resultadoDiv.textContent = results[0].result; // Aquí se debe usar results[0].result
        }
      );
    });
  });
});