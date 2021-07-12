'use strict';
var QRCodes = [
    "data:image/gif;base64,R0lGODlhAQABAIAAAP7//wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
    "", "", "", "", ""
];
var defaultTexts = ["ВАШ\nТЕКСТ", "РОССИЯ\nБУДЕТ\nЗДОРОВОЙ", "Я\nПРИВИТ"];
var emojis = [new Image(), new Image(), new Image()];
for (var i = 0; i < 3; i++) {
    emojis[i].src = QRCodes[0];
}
var currentEmojiIndex = 0;
var currentQRCode = QRCodes[0];

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

var emojiLayer = new Konva.Layer({});
var emojiNode1 = new Konva.Image({
    image: emojis[0],
    x: stage.width() / 8 * 5,
    y: stage.height() / 4,
    width: stage.width() / 32 * 3,
    height: stage.width() / 32 * 3,
    offsetX: stage.width() / 64 * 3,
    offsetY: stage.width() / 64 * 3
});
var emojiNode2 = new Konva.Image({
    image: emojis[1],
    x: stage.width() / 8 * 6,
    y: stage.height() / 4,
    width: stage.width() / 32 * 3,
    height: stage.width() / 32 * 3,
    offsetX: stage.width() / 64 * 3,
    offsetY: stage.width() / 64 * 3
});
var emojiNode3 = new Konva.Image({
    image: emojis[2],
    x: stage.width() / 8 * 7,
    y: stage.height() / 4,
    width: stage.width() / 32 * 3,
    height: stage.width() / 32 * 3,
    offsetX: stage.width() / 64 * 3,
    offsetY: stage.width() / 64 * 3
});
emojiLayer.add(emojiNode1);
emojiLayer.add(emojiNode2);
emojiLayer.add(emojiNode3);

var QRLayer = new Konva.Layer({});
var QRRect = new Konva.Rect({
    fill: '#ffffff',
    cornerRadius: stage.width() / 64 * 3,
    x: stage.width() / 4 * 3,
    y: stage.height() / 8 * 5,
    width: stage.width() / 32 * 9,
    height: stage.width() / 32 * 9,
    offsetX: stage.width() / 64 * 9,
    offsetY: stage.width() / 64 * 9
});
var qr_img = new Image();
qr_img.src = currentQRCode;
var QRImage = new Konva.Image({
    image: qr_img,
    x: stage.width() / 4 * 3,
    y: stage.height() / 8 * 5,
    width: stage.width() / 4,
    height: stage.width() / 4,
    offsetX: stage.width() / 8,
    offsetY: stage.width() / 8
});
QRLayer.add(QRRect);
QRLayer.add(QRImage);

var textLayer = new Konva.Layer({});
var textNode = new Konva.Text({
    fontFamily: 'sans-serif',
    fontSize: 60,
    fontStyle: 'normal',
    text: defaultTexts[0],
    height: stage.height(),
    width: stage.width() / 32 * 14,
    x: stage.width() / 32 * 1,
    y: 0,
    align: 'center',
    verticalAlign: 'middle',
    fill: '#ffffff'
});
textLayer.add(textNode);

stage.add(passportTemplateLayer);
stage.add(emojiLayer);
stage.add(QRLayer);
stage.add(textLayer);

function updateText(text, style, size) {
    textNode.setAttrs({
        text: text,
        fontStyle: style,
        fontSize: size
    });
    textNode.draw();
}

function submitTextHandler() {
    updateText(
        $('#textInput').val(),
        $('#textStyle').val(),
        Number($('#textSize').val())
    );
}

function updateQRCodes() {
    for (const index in [...Array(6).keys()]) {
        $(`#QR${Number(index) + 1}`).attr('src', QRCodes[Number(index)]);
    }
}

function addListenersToQRVariants() {
    for (const index in [...Array(6).keys()]) {
        $(`#QR${Number(index) + 1}`).click(QRCodeSelected);
    }
}

function QRCodeSelected() {
    qr_img.src = $(this).attr('src');
    document.querySelector('#canvasContainer').scrollIntoView({
        behavior: 'smooth'
    });
}

function QRGeneratorCallback(data) {
    if (data.error) {
        alert(data.error);
        return null;
    }
    for (const index in [...Array(6).keys()]) {
        QRCodes[Number(index)] = data[`image_${Number(index) + 1}`];
    }
    updateQRCodes();
    $('.qr-variants-holder').css('max-height', '3000px');
}

function onCertificateFormSubmit(event) {
    event.preventDefault();
    var form = new FormData();
    form.append('link', $('#certificateLink').val());

    $.ajax({
        type: 'POST',
        dataType: "json",
        processData: false,
        contentType: false,
        url: '/api/v1/qr/',
        data: form,
        success: QRGeneratorCallback
    });
}

function createModalOpenerCallback(index) {
    return () => {
        currentEmojiIndex = index;
        $('#emojiModal').modal('show');
    }
}

function selectEmoji() {
    emojis[currentEmojiIndex].src = $(this).attr('src');
    $('#emojiModal').modal('hide');
}

function randomText() {
    var text = defaultTexts[Math.floor(Math.random()*defaultTexts.length)];
    $('#textInput').val(text);
    submitTextHandler();
}

function randomEmojis() {
    for (var i = 0; i < 3; i++) {
        emojis[i].src = emojiList[Math.floor(Math.random()*emojiList.length)];
    }
}

emojiNode1.on('click', createModalOpenerCallback(0));
emojiNode2.on('click', createModalOpenerCallback(1));
emojiNode3.on('click', createModalOpenerCallback(2));

putEmojisIntoModal(selectEmoji);
addListenersToQRVariants();
$('#submitText').click(submitTextHandler);
$('#certificateLinkForm').submit(onCertificateFormSubmit);
$('#randomTextButton').click(randomText);
$('#randomEmojiButton').click(randomEmojis);
randomEmojis();