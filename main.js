
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
        newCell.innerHTML = "<span name='clanSpan' " + temp + ">" + enemyClan[enemyClanCount - 1] + "<span>";
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
        table.rows[i].cells[j + 1].innerHTML = "<input type='number' name='playerScore' class='scoreInput' id='playerScore" + i + "_" + (j + 1) + "' value='0' min='0' max='25' step='1' oninput='this.value = Math.max(0, Math.min(25, this.value))'>";
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
        table.rows[i].insertCell(j+1);
        table.rows[i].cells[j + 1].innerHTML = "<input type='number' name='playerScore' class='scoreInput' id='playerScore" + i + "_" + (j) + "' value='0' min='0' max='25' step='1' oninput='this.value = Math.max(0, Math.min(25, this.value))'>";
    }
    updateColSpan();
}

function addTotalKillField() {
    let table = document.getElementById("resultTable");
    let i = table.rows.length - 2;
    let j = enemyClanCount;
    table.rows[i].insertCell(-1);
    table.rows[i].cells[j + 2].innerHTML = "<input type='number' name='playerScore' class='scoreInput' id='playerTotalKill" + i + "' value='0' min='0' max='25' step='1' oninput='this.value = Math.max(0, Math.min(25, this.value))'>";

    updateColSpan();
}


//---------------------------------- Atualization ColSpan----------------------------------
function updateColSpan() {
    document.getElementById("killCountTable").colSpan = enemyClanCount + 1;
}