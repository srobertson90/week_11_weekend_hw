var populateFields = function(input){
  var nameTag = document.querySelector('#itemName');
  nameTag.innerText = input.inventoryItem.itemName; 

  var titleTag = document.querySelector('#itemTitle');
  titleTag.innerText = input.inventoryItem.tierTypeName + ' ' + input.inventoryItem.itemTypeName;

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
  var api = new Api();
  request.open("GET", url);
  request.setRequestHeader("X-API-Key", api.key);
  request.onload = callback;
  request.send();
}

var handleButtonClick = function(itemId){
  var requestByItemID = function(){
    var url = "https://www.bungie.net/platform/Destiny/Manifest/InventoryItem/" + itemId + "/";
    console.log("Before request");
    makeRequest(url, itemRequestComplete);
    console.log("After Request");
  }
  return requestByItemID;
}

var app = function(){
  var gjallaButton = document.querySelector('#Gjallahorn');
  gjallaButton.onclick = handleButtonClick(1274330687);

  var thornButton = document.querySelector('#Thorn');
  thornButton.onclick = handleButtonClick(3164616404);

  var hawkButton = document.querySelector('#Hawkmoon');
  hawkButton.onclick = handleButtonClick(2447423792);


  var badjButton = document.querySelector('#Badjuju');
  badjButton.onclick = handleButtonClick(1177550374);
  

}

window.onload = app;