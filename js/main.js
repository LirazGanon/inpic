'use strict'

var gQuests = []
var worngClick = 0
var gCurrQuestIdx = 0
var gElContainer = document.querySelector('.q-container')

function onInitGame() {
    gCurrQuestIdx = 0
    worngClick = 0
    gElContainer.classList.remove("hide")
    var elFinishDiv = document.querySelector('.finish')
    elFinishDiv.classList.add("hide")
    gQuests = createQuests()
    renderQuest()

}

function createQuests() {
    return [
        { id: 1, opts: ['תַּפּוּחַ', 'בָּנָנָה', 'תַּפּוּז'], correctOptIndex: 1 },
        { id: 2, opts: ['קִיוִי', 'לִימוֹן', 'תַּפּוּחַ'], correctOptIndex: 0 },
        { id: 3, opts: ['בָּנָנָה', 'תּוּת', 'דֻּבְדְּבָן'], correctOptIndex: 2 },
        { id: 4, opts: ['מְלוֹן', 'תַּפּוּז', 'לִימוֹן'], correctOptIndex: 1 },
        { id: 5, opts: ['תַּפּוּז', 'מְלוֹן', 'תַּפּוּחַ'], correctOptIndex: 2 },
        { id: 6, opts: ['דֻּבְדְּבָן', 'בָּנָנָה', 'אָנָנָס'], correctOptIndex: 2 },
        { id: 7, opts: ['רִימּוֹן', 'דֻּבְדְּבָן', 'תּוּת'], correctOptIndex: 0 },
        { id: 8, opts: ['תּוּת', 'דֻּבְדְּבָן', 'קִיוִי'], correctOptIndex: 0 }
    ]
}

function renderQuest() {
    var strHtml = ''
    gElContainer.style.backgroundImage = `url('pic/${gCurrQuestIdx + 1}.jpg')`
    for (var i = 0; i < gQuests[gCurrQuestIdx].opts.length; i++) {
        var currOpts = gQuests[gCurrQuestIdx].opts[i]
        var leftValue = 2.8 + i * 33
        var elQuestsStr = `<div id="${i}" class="btn answer" style="left:${leftValue}%;" onclick="onOptClick(${i})" >${currOpts}</div>`
        strHtml += elQuestsStr
    }

    gElContainer.innerHTML = strHtml
}


function onOptClick(optIdx) {
    var correctOptIndex = gQuests[gCurrQuestIdx].correctOptIndex
    var elChooseDiv = document.getElementById(optIdx)

    if (optIdx === correctOptIndex) {
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
    gElContainer.classList.add('hide')
    var elMistakeSpan = document.querySelector('.mistakes')
    elMistakeSpan.innerText = worngClick
    var msg = worngClick > 3 ? 'You can do Better!' : 'You did Great!'
    var elMsg = document.querySelector('.msg')
    elMsg.innerText = msg
    var elFinishDiv = document.querySelector('.finish')
    elFinishDiv.classList.remove("hide")
}