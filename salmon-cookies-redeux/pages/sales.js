import { useEffect } from "react";
import styles from "../styles/Home.module.css";

useEffect = () => {
  //console.log('Yo');
  let myContainer = document.getElementById("container");
  let myTable = document.createElement("table");
  myContainer.appendChild(myTable);
  let tfoot = document.createElement("tfoot");

  const hours = [
    "6am",
    "7am",
    "8am",
    "9am",
    "10am",
    "11am",
    "12pm",
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm",
    "6pm",
    "7pm",
  ];
  const allCities = [];
  let myForm = document.querySelector("form");
  // console.log(myForm);

  let img = document.createElement("img");
  img.src = "img/lab6SalmonCookie.png";
  img.title = "Two Tasty Salmon Cookies";
  img.className = "salmon-cookie";
  myContainer.appendChild(img);

  // myContainer.append(img);
  function CookieCity(name, minCustomers, maxCustomers, avgCookiesSold) {
    this.name = name;
    this.minCustomerEachHour = minCustomers;
    this.maxCustomerEachHour = maxCustomers;
    this.avgCookieSoldPerCustomer = avgCookiesSold;
    this.cookiesSoldPerCustomerArry = [];
    this.dailyStoreTotal = 0;
    allCities.push(this);
  }

  CookieCity.prototype.randomCustomerEachHour = function () {
    // console.log('at randomCustomerEachHour works');
    return Math.round(
      Math.random() *
        (this.maxCustomerEachHour - this.minCustomerEachHour + 1) +
        this.minCustomerEachHour
    );
  };
  //method to cal and populate # of cookies sold per hour
  CookieCity.prototype.calcCookiesSoldEachHour = function () {
    // console.log(randomCookiesSoldPerHour);
    for (let i = 0; i < hours.length; i++) {
      let randomCookiesSoldPerHour = this.randomCustomerEachHour();
      let hourlyTotal = Math.ceil(
        randomCookiesSoldPerHour * this.avgCookieSoldPerCustomer
      );
      this.cookiesSoldPerCustomerArry.push(hourlyTotal);
      this.dailyStoreTotal += hourlyTotal;
    }
  };

  CookieCity.prototype.render = function () {
    this.calcCookiesSoldEachHour();
    // console.log('I am in the render method');
    // console.log(myContainer);

    let tr = document.createElement("tr");
    let th = document.createElement("th");
    th.innerHTML = this.name;
    tr.append(th);
    for (let i = 0; i < hours.length; i++) {
      let td = document.createElement("td");

      td.innerHTML = this.cookiesSoldPerCustomerArry[i];

      tr.append(td);
    }
    let td = document.createElement("td");

    td.innerHTML = this.dailyStoreTotal;

    tr.append(td);
    myTable.append(tr);
  };

  function renderHeader() {
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    th.innerHTML = " ";
    tr.append(th);
    for (let i = 0; i < hours.length; i++) {
      let td = document.createElement("td");
      td.innerHTML = hours[i];
      tr.append(td);
    }
    let td = document.createElement("td");
    td.innerHTML = "Daily Store Total";
    tr.append(td);
    myTable.append(tr);
  }

  function renderFooter() {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.innerHTML = "Grand Totals";
    tr.append(td);
    for (let i = 0; i < hours.length; i++) {
      let total = 0;
      for (let j = 0; j < allCities.length; j++) {
        total += allCities[j].cookiesSoldPerCustomerArry[i];
      }
      td = document.createElement("td");
      td.innerHTML = total;
      tr.append(td);
    }

    let total = 0;
    for (let j = 0; j < allCities.length; j++) {
      total += allCities[j].dailyStoreTotal;
    }
    td = document.createElement("td");
    td.innerHTML = total;
    tr.append(td);

    tfoot.append(tr);
    myTable.append(tfoot);
  }

  function handleSubmit(event) {
    event.preventDefault();

    let cityName = event.target.cityname.value;
    let min = +event.target.min.value;
    let max = +event.target.max.value;
    let avg = +event.target.avg.value;

    let newCity = new CookieCity(cityName, min, max, avg);
    newCity.render();
    tfoot.innerHTML = "";
    renderFooter();
  }

  new CookieCity("Seattle", 23, 65, 6.3);
  new CookieCity("Tokyo", 3, 24, 1.2);
  new CookieCity("Dubai", 11, 38, 3.7);
  new CookieCity("Paris", 20, 38, 2.3);
  new CookieCity("Lima", 2, 16, 4.6);

  function renderTable() {
    renderHeader();
    for (let i = 0; i < allCities.length; i++) {
      allCities[i].render();
    }
  }
  
  renderTable();
  renderFooter();
  myForm.addEventListener("submit", handleSubmit);
};

export default function sales() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <nav>
          <div className={styles.navWrapper}>
            <div className={styles.logoWrapper}>
              <img src="/salmon.png" alt="salmon" width={145} height={55} />
              <h2 style={{ marginLeft: 15, fontSize: 40 }}>Salmon Cookies</h2>
            </div>

            <a>Home</a>
          </div>
        </nav>

        <h1>Salmon Cookie Sales</h1>
        <form id="formContainer">
          <fieldset>
            <legend>Add Cookie City</legend>

            <label>
              City Name
              <input type="text" name="cityname" placeholder="city*" required />
            </label>

            <label>
              Min Cookies Per Hour
              <input
                type="number"
                name="min"
                placeholder="number*"
                step="any"
                required
              />
            </label>
            <label>
              Max Cookies Per Hour
              <input
                type="number"
                name="max"
                placeholder="number*"
                step="any"
                required
              />
            </label>
            <label>
              Avg Cookies Per Customer
              <input
                type="number"
                name="avg"
                placeholder="number*"
                step="any"
                required
              />
            </label>

            <button type="submit">Send</button>
          </fieldset>
        </form>
        <div id="container"></div>
      </main>
    </div>
  );
}
