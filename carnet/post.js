    function send()
    {
var url = "https://prod-97.westus.logic.azure.com:443/workflows/66e7ba19b43645fba94fbae12fcf0020/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=g-6QYKjN7Q14i4p-Fvpf-B7qybqtZZZEsuk4P_oO8JQ";

var xhr = new XMLHttpRequest();
xhr.open("POST", url);

xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
   }};

const yfoto = document.getElementsByClassName('preview_image')[0];
var data = ('{"foto":"' + yfoto.src + '"'); 
 

xhr.send(data);
    }
