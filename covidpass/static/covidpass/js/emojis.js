"use strict";
const emojiList = [
    "static/covidpass/images/emojis/clapping-hands.png",
    "static/covidpass/images/emojis/clown-face.png",
    "static/covidpass/images/emojis/confused-face.png",
    "static/covidpass/images/emojis/dizzy.png",
    "static/covidpass/images/emojis/expressionless-face.png",
    "static/covidpass/images/emojis/face-with-rolling-eyes.png",
    "static/covidpass/images/emojis/face-with-symbols-on-mouth.png",
    "static/covidpass/images/emojis/flag-russia.png",
    "static/covidpass/images/emojis/hot-face.png",
    "static/covidpass/images/emojis/kiss-mark.png",
    "static/covidpass/images/emojis/kitchen-knife.png",
    "static/covidpass/images/emojis/middle-finger.png",
    "static/covidpass/images/emojis/nauseated-face.png",
    "static/covidpass/images/emojis/ok-hand.png",
    "static/covidpass/images/emojis/pig-nose.png",
    "static/covidpass/images/emojis/pile-of-poo.png",
    "static/covidpass/images/emojis/pill.png",
    "static/covidpass/images/emojis/pirate-flag.png",
    "static/covidpass/images/emojis/polar-bear.png",
    "static/covidpass/images/emojis/rainbow-flag.png",
    "static/covidpass/images/emojis/slightly-smiling-face.png",
    "static/covidpass/images/emojis/smiling-face-with-hearts.png",
    "static/covidpass/images/emojis/sweat-droplets.png",
    "static/covidpass/images/emojis/syringe.png",
    "static/covidpass/images/emojis/thermometer.png",
    "static/covidpass/images/emojis/victory-hand.png",
    "static/covidpass/images/emojis/woozy-face.png",
    "static/covidpass/images/emojis/zany-face.png",
];

const emojiInRow = 7;
const emojiInColumn = 4;

function putEmojisIntoModal(clickHandler) {
    var emojiContainer = $('#emojiModalBody');
    for (var i = 0; i < emojiInColumn; i += 1) {
        emojiContainer.append(`<div class="row" id="emojiRow${i}"></div>`);
        var currentRow = $(`#emojiRow${i}`);
        for (var j = 0; j < emojiInRow; j += 1) {
            var link_index = i * emojiInRow + j;
            var link = emojiList[link_index];
            currentRow.append(`<div class="col"><img class="emojiSelectionBtn img-fluid" src="${link}"/></div>`);
        }
    }
    $('.emojiSelectionBtn').click(clickHandler);
}