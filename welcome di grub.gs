var token = "5s";
var telegramUrl = "https://api.telegram.org/bot" + token;
var webAppUrl = "hec";



function setWebhook() {
var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
var response = UrlFetchApp.fetch(url);
}


function sendMessage(Id, text, keyBoard) {
    var data = {
      method: "post",
      payload: {
        method: "sendMessage",
        chat_id: String(Id),
        text: text,
        parse_mode: "HTML",
        reply_markup: JSON.stringify(keyBoard)
      }
    };
  UrlFetchApp.fetch("https://api.telegram.org/bot" + token + '/', data);
}


function doPost(e) {
var contents = JSON.parse(e.postData.contents);
var ssId = "1k6LG6k";
var sheet = SpreadsheetApp.openById(ssId).getSheetByName("Grace Master");
var updates = JSON.parse(stringJson);
  
  if (updates.callback_query){
  } else if(updates.message){
    
    if(updates.message.new_chat_participant){
      sendText(updates.message.chat.id, "selamat datang" +updates.message.new_chat_participant.first_name+" id anda adalah : "+updates.message.new_chat_participant.id);
    } else if(updates.message.left_chat_participant){
      sendText(updates.message.left_chat_participant.firts_name+" telah keluar dari grub");
    } else if(updates.message.photo){
    }else if(updates.message.text){
      if(updates.message.text[0]=="/"){
      } else {
      }
    }
        
  
  
  
  
  
  if (contents.callback_query) {
  var Id = contents.callback_query.from.id;
  var data = contents.callback_query.data;
  
    
  if (data == "START") {
  var START = sheet.getDataRange().getCell(1,2).getValue();
  return sendMessage(Id, START);
  } else if (data == "HELP") {
  var HELP = sheet.getDataRange().getCell(2, 2).getValue();
  return sendMessage(Id, HELP);
  } else if (data == "PING") {
  var PING = sheet.getDataRange().getCell(3,2).getValue();
  return sendMessage(Id, PING);
  } else if (data == "JOJO") {
  var JOJO = sheet.getDataRange().getCell(4, 2).getValue();
  return sendMessage(Id, JOJO);
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

}          
