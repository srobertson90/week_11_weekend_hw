var populateFields = function(input){
  var nameTag = document.querySelector('#itemName');
  nameTag.innerText = input.inventoryItem.itemName; //Gjallarhorn

  var descTag = document.querySelector('#itemDesc');
  descTag.innerText = input.inventoryItem.itemDescription;

  var imgTag = document.querySelector('#itemIcon');
  imgTag.src = "http://www.bungie.net" + input.inventoryItem.icon;
}

var itemRequestComplete = function(){
  console.log(this.status);
  console.log("Request complete");
  if (this.status !== 200) return;
  var json = JSON.parse(this.responseText);
  console.log(json.Response.data); //Gjallarhorn
  var object = json.Response.data;
  populateFields(object);
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  var myApi = new Api();
  var apiKey = myApi.key;
  request.open("GET", url);
  request.setRequestHeader("X-API-Key", apiKey);
  request.onload = callback;
  request.send();
}

var handleGjallaClick = function(){
  var url = "https://www.bungie.net/platform/Destiny/Manifest/InventoryItem/1274330687/";
  console.log("Before request");
  makeRequest(url, itemRequestComplete);
  console.log("After Request");
}

var app = function(){
  var button = document.querySelector('#Gjallahorn');
  button.onclick = handleGjallaClick;

}

window.onload = app;