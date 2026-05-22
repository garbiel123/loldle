let champions = [];
let secretChampion;

async function loadChampions() {

    const response = await fetch("champions.json");

    champions = await response.json();

    secretChampion = randomChampion();

    console.log("Wylosowany champion:", secretChampion.name);
}

function randomChampion() {
    return champions[Math.floor(Math.random() * champions.length)];
}
function getColor(correct, guess) {

    if(correct === guess)
        return "correct";

    return "wrong";
}
function getYearDisplay(secret, guess) {

    // DOBRY ROK
    if(secret === guess) {

        return `
            <td class="correct">
                ${guess}
            </td>
        `;
    }

    // POPRAWNY CHAMPION JEST Nowszy
    if(secret > guess) {

        return `
            <td class="wrong">
                ${guess} ↑
            </td>
        `;
    }

    // POPRAWNY CHAMPION JEST STARSZY
    return `
        <td class="wrong">
            ${guess} ↓
        </td>
    `;
}

function checkGuess() {

    const input = document.getElementById("guessInput").value.trim();

    const guessedChampion = champions.find(
        c => c.name.toLowerCase() === input.toLowerCase()
    );

    if(!guessedChampion) {

        const existingMessage = document.getElementById("errorMessage");
    
        if(existingMessage)
            existingMessage.remove();
    
        const error = document.createElement("p");
    
        error.id = "errorMessage";
        error.innerText = "Taka postać nie istnieje!";
        error.style.color = "#ef4444";
        error.style.marginTop = "15px";
        error.style.fontWeight = "bold";
    
        document.querySelector(".game-container").appendChild(error);
    
        return;
    }

    const table = document.getElementById("resultTable");
    const existingMessage = document.getElementById("errorMessage");

if(existingMessage)
    existingMessage.remove();

    const row = document.createElement("tr");

    row.innerHTML = `
        <td class="${getColor(secretChampion.name, guessedChampion.name)}">
            ${guessedChampion.name}
        </td>

        <td class="${getColor(secretChampion.gender, guessedChampion.gender)}">
            ${guessedChampion.gender}
        </td>

        <td class="${getColor(secretChampion.lane, guessedChampion.lane)}">
            ${guessedChampion.lane}
        </td>

        <td class="${getColor(secretChampion.region, guessedChampion.region)}">
            ${guessedChampion.region}
        </td>

        <td class="${getColor(secretChampion.resource, guessedChampion.resource)}">
            ${guessedChampion.resource}
        </td>
        ${getYearDisplay(secretChampion.year, guessedChampion.year)}
        
    `;

    table.appendChild(row);

    if(guessedChampion.name === secretChampion.name) {

        document.getElementById("winScreen").style.display = "block";
    }

    document.getElementById("guessInput").value = "";
}

function restartGame() {

    secretChampion = randomChampion();

    const table = document.getElementById("resultTable");

    table.innerHTML = `
        <tr class="header-row">
            <td>Name</td>
            <td>Gender</td>
            <td>Lane</td>
            <td>Region</td>
            <td>Resource</td>
            <td>Year</td>
        </tr>
    `;

    document.getElementById("winScreen").style.display = "none";
}

loadChampions();