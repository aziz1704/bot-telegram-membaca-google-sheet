var token = "512454Bnm_Kcs";
var telegramUrl = "https://api.telegram.org/bot" + token;
var webAppUrl = "https://script.google.com/macros/s

//set fungsi webhook
function setWebhook() {
var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
var response = UrlFetchApp.fetch(url);
}


//cek fungsi sendMessage
function sendMessage(id, text) {
var url = telegramUrl + "/sendMessage?chat_id=" + id + "&text=" + text;
var response = UrlFetchApp.fetch(url);
}


//cek fungsi doPost
function doPost(e) {
var contents = JSON.parse(e.postData.contents)
var id = contents.message.from.id;
  
sendMessage(id, "Confirmeed, received. Well done");
  
 }
 
 
 cewe
