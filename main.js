
let players = [];
let enemyClan = [];
let playerViews = [];
let victoryStatus = [];
let playerCount = 0;
let enemyClanCount = 0;
let playerViewCount = 0;

function addPlayerName() {
    let player = document.getElementById("playerName").value;
    if (player == "") {
        alert("プレイヤー名を入力してください!");
    }
    else {
        players[playerCount] = player;
        playerCount++;
        document.querySelector('#playerName').value = '';
    }
}

function addEnemyClan() {
    let clanName = document.getElementById("clanName").value;
    let flag = document.getElementById("statusWin").value;
    if(clanName == ""){
        alert("クラン名を入力してください!");
    }
    else{
        enemyClan[enemyClanCount] = clanName;
        victoryStatus[enemyClanCount] = flag == "on" ? "Win" : "Lose";
        enemyClanCount++;
        document.querySelector('#clanName').value = '';
        addItemPlayerView("clanColun", 0);
    }
}

function addPlayerView() {
    let playerView = document.getElementById("playerNameView").value;
    if (playerView == "") {
        alert("プレイヤー名を入力してください!");
    }
    else {
        playerViews[playerViewCount] = playerView;
        playerViewCount++;
        document.querySelector('#playerNameView').value = '';
        addItemPlayerView("playerViewName", 1);
    }
}

function addItemRow(){

}

function addItemPlayerView(elementID, op){
    let rowTable = document.getElementById(elementID);
    let newCell = rowTable.insertCell();
    if(op == 0){
        newCell.innerHTML = "<span name='clanSpan'>"+enemyClan[enemyClanCount-1]+"<span>";
    }
    else{
        newCell.innerHTML = "<span name='playerViewSpan'>"+playerViews[playerViewCount-1]+"<span>";
    }
}