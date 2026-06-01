
// =========================
// 1. EXCHANGE RATES
// =========================
const rates = {
    USD_RWF: 1468,
    EUR_RWF: 1400,
    GBP_RWF: 1600,
    KES_RWF: 10,
    UGX_RWF: 0.35,
    TZS_RWF: 0.5,

    RWF_USD: 1 / 1468,
    RWF_EUR: 1 / 1400,
    RWF_GBP: 1 / 1600,
    RWF_KES: 1 / 10,
    RWF_UGX: 1 / 0.35,
    RWF_TZS: 1 / 0.5
}
// =========================
// CONVERT FUNCTION (FIXED)
// =========================
function convert() {

    // get amount
    let amount = parseFloat(document.getElementById("amount").value);

    // get selected conversion type
    let type = document.getElementById("currency").value;

    // result box
    let resultDiv = document.getElementById("result");

    // validate amount
    if (isNaN(amount) || amount <= 0) {
        resultDiv.innerHTML = "❌ Please enter valid amount";
        return;
    }

    // split conversion type
    let parts = type.split("_");

    // validate currency format
    if (parts.length !== 2) {
        resultDiv.innerHTML = "❌ Invalid currency format";
        return;
    }

    let from = parts[0];
    let to = parts[1];

    // simple rates system
    const rates = {
        USD: 1468,
        EUR: 1400,
        GBP: 1600,
        KES: 10,
        UGX: 0.35,
        TZS: 0.5,
        RWF: 1
    };

    // check supported currencies
    if (!rates[from] || !rates[to]) {
        resultDiv.innerHTML = "❌ Unsupported currency";
        return;
    }

    // convert to RWF first
    let amountInRWF = amount * rates[from];

    // convert to target currency
    let result = amountInRWF / rates[to];

    // show result
    resultDiv.innerHTML =
        "✅ Result: " +
        result.toLocaleString(undefined, {
            maximumFractionDigits: 2
        }) +
        " " +
        to;

    // save history
    addToHistory({
        amount: amount,
        from: from,
        to: to,
        result: result.toFixed(2),
        date: new Date().toLocaleString()
    });
}

// =========================
// 3. HISTORY SYSTEM (ONE ONLY)
// =========================
function getHistory() {
    return JSON.parse(localStorage.getItem("history")) || [];
}

function saveHistory(data) {
    localStorage.setItem("history", JSON.stringify(data));
}

function addToHistory(record) {
    let history = getHistory();
    history.push(record);
    saveHistory(history);
}



// =========================
// 4. LOAD HISTORY (ALL PAGES)
// =========================
function loadHistory() {

    let history = getHistory();
    let list = document.getElementById("historyList");

    if (!list) return;

    list.innerHTML = "";

    if (history.length === 0) {
        list.innerHTML = "<p>No history yet</p>";
        return;
    }

    history.slice().reverse().forEach(item => {

        let div = document.createElement("div");
        div.className = "history-item";

        div.innerHTML = `
            <p><b>${item.amount} ${item.from}</b> → ${item.result} ${item.to}</p>
            <small>${item.date}</small>
        `;

        list.appendChild(div);
    });
}



// =========================
// 5. CLEAR HISTORY
// =========================
function clearHistory() {
    localStorage.removeItem("history");
    loadHistory();
    alert("History cleared!");
}



// =========================
// THEME SYSTEM
// =========================

// Apply saved theme on page load
function applyTheme() {

    let theme = localStorage.getItem("theme");

    // Default = light
    if (!theme) {
        theme = "light";
    }

    if (theme === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}

// Toggle between dark and light
function toggleTheme() {

    // toggle class
    document.body.classList.toggle("dark-mode");

    // save theme
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

// Load theme automatically
document.addEventListener("DOMContentLoaded", () => {

    applyTheme();

});

// =========================
// 7. SETTINGS SYSTEM
// =========================
function saveCurrency() {
    let currency = document.getElementById("defaultCurrency").value;
    localStorage.setItem("defaultCurrency", currency);
}

function saveLanguage() {
    let lang = document.getElementById("language").value;
    localStorage.setItem("language", lang);
}

function loadSettings() {

    let currency = localStorage.getItem("defaultCurrency");
    let lang = localStorage.getItem("language");

    if (currency && document.getElementById("defaultCurrency")) {
        document.getElementById("defaultCurrency").value = currency;
    }

    if (lang && document.getElementById("language")) {
        document.getElementById("language").value = lang;
    }
}



// =========================
// 8. PAGE LOADER (IMPORTANT FIX)
// =========================
document.addEventListener("DOMContentLoaded", () => {

    applyTheme();
    loadSettings();
    loadHistory();

});