'use strict'

var gQuests = [
    { id: 1, opts: ['Apple', 'Banna', 'Orange'], correctOptIndex: 1 },
    { id: 2, opts: ['Kiwi', 'Lemon', 'Apple'], correctOptIndex: 0 },
    { id: 3, opts: ['Banna', 'Strawberry', 'Cherry'], correctOptIndex: 2 },
    { id: 4, opts: ['Melon', 'Orange', 'Leomon'], correctOptIndex: 1 },
    { id: 5, opts: ['Orange', 'Melon', 'Apple'], correctOptIndex: 2 },
    { id: 6, opts: ['Cherry', 'Banna', 'Pineapple'], correctOptIndex: 2 },
    { id: 7, opts: ['Pomegranate', 'Cherry', 'Strawberry'], correctOptIndex: 0 },
    { id: 8, opts: ['Strawberry', 'Cherry', 'Kiwi'], correctOptIndex: 0 },
]
var worngClick = 0
var gCurrQuestIdx = 0
var gElContainer = document.querySelector('.q-container')

function onInitGame() {
    gCurrQuestIdx = 0
    worngClick = 0
    renderQuest()

}

function renderQuest() {
    var strHtml = ''
    gElContainer.style.backgroundImage = `url('pic/${gCurrQuestIdx + 1}.jpg')`
    for (var i = 0; i < gQuests[gCurrQuestIdx].opts.length; i++) {
        var currOpts = gQuests[gCurrQuestIdx].opts[i]
        var leftValue = 2 + i * 33
        var elQuestsStr = `<div id="${i}" class="btn answer" style="left:${leftValue}%;" onclick="onOptClick(${i})" >${currOpts}</div>`
        strHtml += elQuestsStr
    }

    gElContainer.innerHTML = strHtml
}


function onOptClick(optIdx) {
    var correctOptIndex = gQuests[gCurrQuestIdx].correctOptIndex
    var elChooseDiv = document.getElementById(optIdx)

    if (optIdx === correctOptIndex) {
        console.log('Yeaa!');
        elChooseDiv.style.backgroundColor = 'green'
        if (gCurrQuestIdx === gQuests.length - 1) {
            endGame()
            return
        }
        setTimeout(function () {
            elChooseDiv.style.backgroundColor = ''
            gCurrQuestIdx++
            renderQuest()
        }, 700)

    } else {
        worngClick++
        elChooseDiv.style.backgroundColor = 'red'
        setTimeout(function () {
            elChooseDiv.style.backgroundColor = ''
        }, 700)
    }
}

function endGame() {
    var sound = new Audio('/pic/claps.wav')
    sound.play()
    gElContainer.setAttribute("style", "background-image:url('pic/conf.gif');")
    var msg = worngClick > 3 ? 'You can do Better!' : 'You did Great!'
    var strHtml = `<h1>Congrats you finished the game!</h1>
    <h2>You have ${worngClick} mistakes</h2>
    <p>${msg}</p>
    <div class="btn" onclick="onInitGame()">
      Play Again
        </div>`

    gElContainer.innerHTML = strHtml

}