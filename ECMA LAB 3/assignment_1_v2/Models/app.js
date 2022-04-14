import { arrOfPerson, Person, fetchPersonsHandler } from "./Person.js";
import {
  applicationLogic,
  applicationStandardTable,
} from "./applicationLogic.js";
import {
  complexCellTextWithImage,
  generateTableComponent,
  sortTable,
  tableSave,
} from "./table.js";

var main = document.querySelector(".main");
var sorted = false;

//main IIFE
(async function () {
  //if the locale has data we won't ask to come up with data from the internet
  let latestBrowserTableState = window.localStorage.getItem("latestTableState");
  console.log(latestBrowserTableState);
  if (latestBrowserTableState) {
    // build table
    console.log("table found in the locale storage loading ....");
    var table = applicationStandardTable();

    //FROM RAM TO DOC TABLE
    var storageTableState = JSON.parse(latestBrowserTableState);
    storageTableState.forEach((obj) => {
      Object.setPrototypeOf(obj, Person.prototype);
    });
    console.log(storageTableState);
    storageTableState.forEach(function (person) {
      console.log(person.getAll());
      var tr = generateTableComponent("tr", ...person.getAll());
      table.append(tr);
    });
    applicationLogic(main, table, storageTableState);
  } else {
    await fetchPersonsHandler(); // data coming from the server
    var table = applicationStandardTable();
    //FROM RAM TO DOC TABLE
    console.log(arrOfPerson);
    arrOfPerson.forEach(function (person) {
      console.log(person.getAll());
      var tr = generateTableComponent("tr", ...person.getAll());
      table.append(tr);
    });

    applicationLogic(main, table, arrOfPerson);
  }
})();
