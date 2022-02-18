var token = "5124s";
var telegramUrl = "http" + token;
var webAppUrl = "htt";


function setWebhook() {
var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
var response = UrlFetchApp.fetch(url);
}


function sendMessage(id, text, keyBoard) {
    var data = {
      method: "post",
      payload: {
        method: "sendMessage",
        chat_id: String(id),
        text: text,
        parse_mode: "HTML",
        reply_markup: JSON.stringify(keyBoard)
      }
    };
  UrlFetchApp.fetch("https://api.telegram.org/bot" + token + '/', data);
}


function doPost(e) {
var contents = JSON.parse(e.postData.contents);
var ssId = "1k6LG6E4SQ66t9CgACEjBhC62NN8Y36aQub6APnfJ-Vk";
var sheet = SpreadsheetApp.openById(ssId).getSheetByName("Grace Master");
  
  if (contents.callback_query) {
  var id = contents.callback_query.from.id;
  var data = contents.callback_query.data;
    
  if (data == "START") {
  var START = sheet.getDataRange().getCell(1,2).getValue();
  return sendMessage(id, START);
  } else if (data == "HELP") {
  var HELP = sheet.getDataRange().getCell(2, 2).getValue();
  return sendMessage(id, HELP);
  } else if (data == "PING") {
  var PING = sheet.getDataRange().getCell(3,2).getValue();
  return sendMessage(id, PING);
  } else if (data == "JOJO") {
  var JOJO = sheet.getDataRange().getCell(4, 2).getValue();
  return sendMessage(id, JOJO);
  } 
  
  } 
  
  else if (contents.message) {
    var id = contents.message.from.id;
    var text = contents.message.text; //ubah pesan teks atau id pengirim
    
    if (text.indexOf("-") !== -1) {
      
    var dateNow = new Date;
    var item = text.split("-");
    sheet.appendRow([dateNow,item[0],item[1]])
    return sendMessage(id, "Ok,added to your spreadsheet");
      
    } 
    
    else {
        var keyBoard = {
          "inline_keyboard": [
            [{
              "text": "START",
              "callback_data" : "START"
            }],
            [{
              "text": "HELP",
              "callback_data" : "HELP"
            }],
            [{
              "text": "PING",
              "callback_data" : "PING"
            }],
            [{
              "text": "JOJO",
              "callback_data" : "JOJO"
            }],
          ]
      }       
     return sendMessage(id, "PENULISAN SALAH, kirim dengan format: [nama]-[nomor]", keyBoard)
            
    }
    
  }
  
}

