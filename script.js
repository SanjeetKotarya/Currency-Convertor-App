const dropList = document.querySelectorAll("form select"),
    fromCurrency = document.querySelector(".from select"),
    fromInput = document.querySelector(".from input"),
    toInput = document.querySelector(".to input"),
    toCurrency = document.querySelector(".to select"),
    getButton = document.querySelector("form button");
    getunit = document.querySelector("form .unit");

for (let i = 0; i < dropList.length; i++) {
    for (let currency_code in country_list) {
        let selected = i == 0 ? currency_code == "USD" ? "selected" : "" : currency_code == "INR" ? "selected" : "";
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }

}


getButton.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
});

function getExchangeRate() {
    let fromInputVal = fromInput.value;
    if (fromInputVal == "" || fromInputVal == "0") {
        fromInput.value = "1";
        fromInputVal = 1;
    }
    toInput.value = "Wait...";
    let url = `https://v6.exchangerate-api.com/v6/14abb0b17e8749d3d5b12c0a/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result => {
       let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExRate = (fromInputVal * exchangeRate).toFixed(2);
        toInput.value = `${totalExRate}`;
        getunit.innerHTML = "1 " +`${fromCurrency.value}`+" = "+`${exchangeRate}`+`${toCurrency.value}`;
    });
}
