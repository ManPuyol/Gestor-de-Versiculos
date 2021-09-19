const PRESENTATION_ID = "1mVlBKbGLYS0Xx0RpMSzddLvOy9HPnbI6wdaZjN7xp4Q";//https://docs.google.com/presentation/d/1mVlBKbGLYS0Xx0RpMSzddLvOy9HPnbI6wdaZjN7xp4Q/edit#slide=id.SLIDES_API1843975876_10
const SPREADSHEET_ID = "1sz666ekjj3Ji-MFFSDC4qLXx-hRiYg7KMzwBoR9-ZQw"//https://docs.google.com/spreadsheets/d/1sz666ekjj3Ji-MFFSDC4qLXx-hRiYg7KMzwBoR9-ZQw/edit#gid=985148309
const API = "https://api.biblia.com/v1/bible/content/rvr60.txt?passage=";
const API_TITLE = "https://api.biblia.com/v1/bible/parse?passage=";
const API_KEY = "&key=6370cdb6edc9b04fe9d55b714ebbefc3";
//let passage = "2 Kings3.16-19";
let slideNumber = 1;
let slides

function automation() {

  let sheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let versiculosRVR = getDataFromSheets(sheet);
  // Prints 3 values from the first column, starting from row 1.
  for (var row in versiculosRVR) {
    for (var col in versiculosRVR[row]) {

      Logger.log(versiculosRVR[row][col]);
      
    let title = getTitle(versiculosRVR[row][col]);
    let data = getData(versiculosRVR[row][col]);
    
    slides = getSlides();
    writeDataToSlides(slides,data,title);
    slideNumber++
    }
  }
}

function getDataFromSheets(sheet) {

var sheet = sheet.getSheets()[0];
Logger.log(sheet.getLastRow() )
  
var range = sheet.getRange(2, 5, sheet.getLastRow());
var values = range.getValues();
Logger.log(values)

  values = values.filter(function(value, index, arr){ 
       if(value[0].length>0) return value;
    });

Logger.log(values)


return values;
}

function getSlides() {
  let presentation = SlidesApp.openById(PRESENTATION_ID);
  let slides = presentation.getSlides();
  return slides;
  
}

function  getData(passage){
  let data = UrlFetchApp.fetch(API+passage+API_KEY);
  Logger.log(data.getContentText());
  return data;
}

function  getTitle(passage){
  let title = UrlFetchApp.fetch(API_TITLE+passage+API_KEY);
  title = JSON.parse(title);
  Logger.log(title.passage);
  return title.passage;
}

function writeDataToSlides(slides,data,title) {
  let slidePlayers = slides[slideNumber];
  slidePlayers.duplicate();
  slidePlayers.replaceAllText('Title', LanguageApp.translate(title , 'en', 'es'));
  slidePlayers.replaceAllText('content', LanguageApp.translate(data.getContentText() , 'en', 'es') );
}
