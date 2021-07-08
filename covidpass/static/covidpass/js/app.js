'use strict';
var QRCodes = [];
var defaultTexts = ["РОССИЯ\nБУДЕТ\nЗДОРОВОЙ", ""];
var textStyles = ["normal", "bold", "italic", "italic bold"];
var textFonts = ["sans-serif"];
var textAlignments = [];
var emojiSet = [];

var currentEmojis = [];
var currentQRCode = null;
var currentText = defaultTexts[0];
//var currentBackgroundColorIndex = 0;
var currentFont = textFonts[0];
var currentTextSize = 20;
var currentTextStyle = textStyles[0];
var currentTextAlignment = ["center", "center"];

var canvasContainer = $('#canvasContainer');
canvasContainer.height(canvasContainer.width() / 372 * 263);

var stage = new Konva.Stage({
    container: 'canvasContainer',
    width: canvasContainer.width(),
    height: canvasContainer.height()
});

var passportTemplateLayer = new Konva.Layer({
    height: stage.height(),
    width: stage.width(),
    x: 0,
    y: 0
});

let template = new Image();
template.src = "static/covidpass/images/passport_template.png";

var passportTemplateImage = new Konva.Image({
    image: template,
    x: 0,
    y: 0,
    width: stage.width(),
    height: stage.height()
});

passportTemplateLayer.add(passportTemplateImage);

var textLayer = new Konva.Layer({});

var emojiLayer = new Konva.Layer({});

var QRLayer = new Konva.Layer({});

var textNode = new Konva.Text({
    fontFamily: currentFont,
    fontSize: currentTextSize,
    fontStyle: currentTextStyle,
    text: currentText,
    height: stage.height(),
    width: stage.width() / 2,
    x: 0,
    y: 0,
    align: 'center',
    verticalAlign: 'middle',
    fill: '#ffffff'
});

textLayer.add(textNode);
stage.add(passportTemplateLayer);
stage.add(textLayer);

function updateText(text) {
    textNode.setAttr('text', text);
    textNode.draw();
}

function submitTextHandler(event) {
    updateText($('#textInput').val());
}

$('#submitText').click(submitTextHandler);