'use strict';
var gNums;
var gShuffeled;
var gNum;
var isOn;
var gCellAmount = 16;
var gGameTimer;
var gSecond;

function init(){
    isOn = false;
    gGameTimer = 0;
    gNums = createNums(gCellAmount);
    gShuffeled = shuffle(gNums);
    gNum = 1;
    gSecond = 0;
    renderBoard(Math.sqrt(gNums.length));
}


function renderBoard(size) {
    var strHTML = '';
    for (var i = 0; i < size; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < size; j++) {
            var num = gShuffeled.pop();
            strHTML += `<td data-id="${num}" onclick="cellClicked(${num})">${num}</td>`;
        }
        strHTML += '</tr>';
    }
    document.querySelector('.board').innerHTML = strHTML;
}

function createNums(maxNum) {
    var nums = [];
    for (var i = 1; i <= maxNum; i++) {
        nums.push(i);
    }
    return nums;
}

function changeDiff(amount) {
    gCellAmount = amount;
    init();
}

function cellClicked(clickedNum){
    isVictory();
    isOn = true;
    if (clickedNum !== gNum) return;
    if (clickedNum === 1) gGameTimer = setInterval(countTime, 1000);
    gNum++;
    var elCell = document.querySelector(`[data-id="${clickedNum}"]`);
    elCell.style.backgroundColor = 'gray';
}

function isVictory(){
    if (gNum === gCellAmount) {
        console.log('victory');
        clearInterval(gGameTimer);
    }
}

function countTime() {
    var display = '';
    gSecond++;
    if (gSecond > 60) {
        const seconds = ((gSecond % 60) < 10) ? '0' + gSecond % 60 : gSecond % 60;
        display = parseInt(gSecond / 60) + ' : ' + seconds;
    } else display = gSecond;
    document.querySelector('.timer span').innerText = display;
}

function shuffle(numbers) {
    var randIdx, keep, i;
    for (i = numbers.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, numbers.length - 1);

        keep = numbers[i];
        numbers[i] = numbers[randIdx];
        numbers[randIdx] = keep;
    }
    return numbers;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}