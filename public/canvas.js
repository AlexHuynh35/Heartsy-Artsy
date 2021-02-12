// Install paper.js on this page
paper.install(window);
var saveAsSVG;

var t;
var penSize = 5;
var penColor = 'black';

var colorIndex = 0;
var colors = [
  'blue',
  'black',
  'white',
  'red',
  'green',
  'yellow',
  'pink',
  'purple'
];

var sizeIndex = 0;
var sizes = [ 5, 10, 20 ];

function setButtonColor(color) {
  var colorButton = $('#colorwheel');
  if (color == 'black') {
    colorButton.css('color', 'white');
  } else {
    colorButton.css('color', 'black');
  }
  colorButton.css('background-color', color);
}

function registerClickHandlers() {
  $(".links").hide();
  $("#shareArt").click(function(){
    $(".links").slideToggle();
  });
  
    // Click Handlers
  $("#pen-sizes").click(function(){
    sizeIndex++;
    sizeIndex = sizeIndex % 3;
    penSize = sizes[sizeIndex];
    
    $('#pen-size').text(penSize);
  });
  
  $('#colorwheel').click(function(){
    colorIndex++;
    colorIndex = colorIndex % colors.length;
    
    var color = colors[colorIndex];
    penColor = color;
    setButtonColor(color);
  });
  
  $('#eraser').click(function() {
    penColor = 'white';
  });
  
  $('#clear').click(function() {
    if (confirm("Your art will be lost forever! Are you sure?")) { 
      paper.project.clear();
    }
  });
  
  $('#save').click(function() {
    var fileName = "your_drawing.svg"
    var url = "data:image/svg+xml;utf8," + encodeURIComponent(paper.project.exportSVG({asString:true}));
    var link = document.getElementById("downloadFile");
    link.download = fileName;
    link.href = url;
    link.click();
  });
}
    
window.onload = function() {
  // Set up our canvas here  
  var canvas = document.getElementById('myCanvas');
  paper.setup(canvas);
  t = new Tool();
  t.minDistance = 1;
  
  registerClickHandlers();

  t.onMouseDrag = function(event) {
    var radius = penSize;
    var circle = new Path.Circle(
      event.middlePoint,radius);
    circle.fillColor= penColor;
  }
}
//$("#HeartsyArtsy").click(function(){
  //var link = window.location.href;
  //var user = 
  //to do later. get value of image location to pass into link variable
  //$(".exampleWork").append("<div class='imgSize'><img src='" + link + "'></div>");
  //$(".imgSize").css("width","20%");
  //$(".exampleText").append("<div class='textSize'><p>" + user + "</p>");
  //$(".textSize").css("'width','20%'","'justify-content','center'","'margin','5px'");
//});