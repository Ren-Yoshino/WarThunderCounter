
let players = [];
let enemyClan = [];
let playerViews = [];
let victoryStatus = [];
let playerCount = 0;
let enemyClanCount = 0;
let playerViewCount = 0;
//---------------------------------- Add Player and Enemy Clan ----------------------------------
function addPlayerName() {
    let player = document.getElementById("playerName").value;
    if (player == "") {
        alert("プレイヤー名を入力してください!");
    }
    else {
        players[playerCount] = player;
        playerCount++;
        document.querySelector('#playerName').value = '';
        addItemPlayer();
        if (enemyClanCount > 0) {
            addNumberFieldRow();
        }
        addTotalKillField();
    }
}

function addEnemyClan() {
    let clanName = document.getElementById("clanName").value;
    let flag = document.getElementById("statusWin");
    if (clanName == "") {
        alert("クラン名を入力してください!");
    }
    else {
        enemyClan[enemyClanCount] = clanName;
        victoryStatus[enemyClanCount] = flag.checked ? "Win" : "Lose";
        enemyClanCount++;
        document.querySelector('#clanName').value = '';
        addItemPlayerView("clanColun", 0, flag);
        if (playerCount > 0) {
            addNumberFieldCol();
        }
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
        addItemPlayerView("playerViewName", 1, null);
    }
}


///------------------------------------------------Add Content in Table --------------------------------------------
function addItemPlayer() {
    let table = document.getElementById("resultTable");
    let newRow = table.insertRow(table.rows.length - 1);
    let newCol = document.createElement("th");
    newRow.appendChild(newCol);

    var content = newRow.insertCell(0);

    content.innerHTML = "<span name='playerName'>" + players[playerCount - 1] + "<span>"
}

function addItemPlayerView(elementID, op, flag) {
    let rowTable = document.getElementById(elementID);
    let newCell = rowTable.insertCell();
    if (op == 0) {
        let temp = flag.checked ? "style='color: green'" : "style='color: red'";
        newCell.innerHTML = "<span name='clanSpan' " + temp + " id='clanSpan"+(enemyClanCount-1)+"' onclick=ChangeStatusWin("+(enemyClanCount-1)+")>" + enemyClan[enemyClanCount - 1] + "<span>";
    }
    else {
        newCell.innerHTML = "<span name='playerViewSpan'>" + playerViews[playerViewCount - 1] + "<span>";
    }
}

///------------------------- Add Number Field in Cell -------------------------------------------

function addNumberFieldRow() {
    let table = document.getElementById("resultTable");
    let i = table.rows.length - 2;
    let j;
    for (j = 0; j < enemyClanCount; j++) {
        //let newCol = document.createElement("td");
        table.rows[i].insertCell(-1);
        table.rows[i].cells[j + 1].innerHTML = "<input type='number' name='playerScore' class='scoreInput' id='playerScore" + i + "_" + (j) + "' value='0' min='0' max='25' step='1' oninput='this.value = Math.max(0, Math.min(25, this.value))' onblur='calcTotalKills(" + i + ")'>";
    }
    /*table.rows[i].insertCell(-1);
    table.rows[i].cells[j+2].innerHTML = "<input type='number' name='playerScore' class='scoreInput' id='playerTotalKill"+i+"' value='0' min='0' max='25' step='1' oninput='this.value = Math.max(0, Math.min(25, this.value))'>";
*/
    updateColSpan();
}

function addNumberFieldCol() {
    let table = document.getElementById("resultTable");
    let j = enemyClanCount - 1;
    for (let i = 1; i < table.rows.length - 1; i++) {
        //let newCol = document.createElement("td");
        table.rows[i].insertCell(j + 1);
        table.rows[i].cells[j + 1].innerHTML = "<input type='number' name='playerScore' class='scoreInput' id='playerScore" + i + "_" + (j) + "' value='0' min='0' max='25' step='1' oninput='this.value = Math.max(0, Math.min(25, this.value))' onblur='calcTotalKills(" + i + ")'>";
    }
    updateColSpan();
}

function addTotalKillField() {
    let table = document.getElementById("resultTable");
    let i = table.rows.length - 2;
    let j = enemyClanCount;
    table.rows[i].insertCell(-1);
    table.rows[i].cells[j + 2].innerHTML = "<input type='number' name='playerScore' class='scoreInput' id='playerTotalKill" + i + "' value='0' min='0' readonly>";

    updateColSpan();
}

//-----------------------------------------------------------------------------------------

//---------------------------------- Atualization ColSpan----------------------------------
function updateColSpan() {
    document.getElementById("killCountTable").colSpan = enemyClanCount + 1;
}

//-----------------------------------------------------------------------------------------

//------------------------------- Calculate Total Kill -----------------------------------
function calcTotalKills(rowPosition) {
    let table = document.getElementById("resultTable");
    let totalKill = 0;
    let j = 0;
    for (let i = 1; i < enemyClanCount + 1; i++, j++) {
        let score = document.getElementById("playerScore" + rowPosition + "_" + j).value;
        totalKill += parseInt(score);
    }
    document.getElementById("playerTotalKill" + rowPosition).value = totalKill;

}

//----------------------------------------------------------------------------------------

//------------------------------- End Result -----------------------------------
function endResult() {
    let table = document.getElementById("resultTable");
    let result = "結果<br/>";
    for (let i = 0; i < playerCount; i++) {
        result += "<span style='font-weight: bold;'>" + players[i] + "</span><br>";
        for (let j = 0; j < enemyClanCount; j++) {
            let score = document.getElementById("playerScore" + (i + 1) + "_" + j).value;
            result += enemyClan[j] + ": " + score + "\n";
        }
        let totalKill = document.getElementById("playerTotalKill" + (i + 1)).value;
        result += "<span style='font-weight: bold;'>合計キル:</span> " + totalKill + "<br>";
    }
    document.getElementById("Result1").innerHTML = result; // Insert result in Result1;

    const result2 = orderResult(); // Call orderResult function to get the ranking
    document.getElementById("Result2").innerHTML = result2; // Insert result in Result2;
    document.getElementById("Result3").innerHTML = orderResults(); // Insert result in Result3;
}

function orderResult() { //playerTotalKill1
    let playerTotalKill = [];
    let localPlayers = players.slice(); // Create a copy of the players array
    let result = "順位：<br/>";
    let position = 1;
    let killValue = 0;
    for (let i = 0; i < playerCount; i++) { // get Totatal Kill
        playerTotalKill[i] = (document.getElementById("playerTotalKill" + (i + 1)).value * 1);
    }
    //-------------------------- Ordentae Result - using Buble Sort --------------------------
    for (let outer = 0; outer < playerTotalKill.length-1; outer++) {
        for (let i = playerTotalKill.length - 1; i > outer; i--) {
            if (playerTotalKill[i] > playerTotalKill[i - 1]) {
                let tmp = playerTotalKill[i]; //using for playerTotalKill
                playerTotalKill[i] = playerTotalKill[i - 1];
                playerTotalKill[i - 1] = tmp;

                let tmpPlayer = localPlayers[i]; // using for players
                localPlayers[i] = localPlayers[i - 1];
                localPlayers[i - 1] = tmpPlayer;
            }
        }
    }
    //-------------------------------End Buble Sort------------------------------
    for (let i = 0; i < playerCount; i++) {
        if (i == 0) {
            result += position + "位: " + localPlayers[i] + " - " + playerTotalKill[i] + "<br>";
            killValue = playerTotalKill[i];
        }
        else {
            if (playerTotalKill[i] != killValue) {
                position++;
                killValue = playerTotalKill[i];
            }
            result += position + "位: " + localPlayers[i] + " - " + playerTotalKill[i] + "<br>";
        }
    }
    return result; // Return the result string to be displayed in Result2
}

function orderResults(){
    let result = "<span style='font-weight: bold;'> 観戦プレイヤー:</sapn><br/>";
    if(playerViewCount == 0){
        result += "<span>観戦プレイヤーがいません！</span><br/>";
    }
    else{
        for(let i = 0; i < playerViewCount; i++){
            if(i+1 < playerViewCount){
                result += playerViews[i] + ",";
            }
            else{
                result += playerViews[i] + ";<br/>";
            }
        }
    }
    result += "<span style='font-weight: bold;'> 戦闘結果:</span><br/>" + (checkVictoryStatus());
    return result;
}

function checkVictoryStatus(){
    let victoryCount = 0, defeatCount = 0;
    for(let i = 0; i < victoryStatus.length; i++){
        if(victoryStatus[i] == "Win"){
            victoryCount++;
        }
        else{
            defeatCount++;
        }
    }   
    return (victoryCount + defeatCount) + "戦中： <span style='color: green'>" +victoryCount + "勝</span> <span style='color: red'> " + defeatCount + " 敗</sapn> <br/>";
}
//----------------------------------------Change status win-------------------------------------------------
function ChangeStatusWin(p) { //let victoryStatus = [];
    let flag = document.getElementById("clanSpan"+p);
    if(victoryStatus[p] == "Win"){
        victoryStatus[p] = "Lose";
        flag.style.color = "red";
    }
    else{
        victoryStatus[p] = "Win";
        flag.style.color = "green";
    }   
}
//---------------------------------------------------------------------------------------------------

function enterEventOP(op){
    if(event.keyCode == 13){
        switch(op){
            case 1:
                addPlayerName();
                break;
            case 2:
                addEnemyClan();
                break;
            case 3:
                addPlayerView();
                break;
            default:
                break;
        }
    }
}
