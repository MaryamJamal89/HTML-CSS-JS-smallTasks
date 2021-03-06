import {
  complexCellTextWithImage,
  generateTableComponent,
  sortTable,
  tableSave,
} from "./table.js";

var sorted = false;

function applicationStandardTable() {
  return generateTableComponent(
    "TH",
    complexCellTextWithImage("id"),
    complexCellTextWithImage("name"),
    complexCellTextWithImage("username"),
    complexCellTextWithImage("email"),
    `Delete`,
    `Update`
  );
}

function applicationLogic(container, table, dataSource) {
  container.addEventListener("click", function (e) {
    switch (e.target.className) {
      case "image":
        //standalone logic
        var type = e.target.parentNode.innerText.toString().split(" ")[0];
        switch (type) {
          case "id":
            if (sorted === false) {
              var sortedTable = sortTable(
                dataSource,
                table,
                function (obj1, obj2) {
                  return obj2.id - obj1.id;
                }
              );
              table = sortedTable;
              container.appendChild(table);
              sorted = true;
            } else {
              var sortedTable = sortTable(
                dataSource,
                table,
                function (obj1, obj2) {
                  return obj1.id - obj2.id;
                }
              );
              table = sortedTable;
              container.appendChild(table);
              sorted = false;
            }
            break;
          case "name":
            if (sorted === false) {
              var sortedTable = sortTable(
                dataSource,
                table,
                function (obj1, obj2) {
                  if (obj1.name < obj2.name) {
                    return -1;
                  }
                  if (obj1.name > obj2.name) {
                    return 1;
                  }
                  return 0;
                }
              );
              table = sortedTable;
              container.appendChild(table);
              sorted = true;
            } else {
              var sortedTable = sortTable(
                dataSource,
                table,
                function (obj1, obj2) {
                  if (obj2.name < obj1.name) {
                    return -1;
                  }
                  if (obj2.name > obj1.name) {
                    return 1;
                  }
                  return 0;
                }
              );
              table = sortedTable;
              container.appendChild(table);
              sorted = false;
            }
            console.log("id name logic here");
            break;
          case "email":
            if (sorted === false) {
              var sortedTable = sortTable(
                dataSource,
                table,
                function (obj1, obj2) {
                  if (obj2.email < obj1.email) {
                    return -1;
                  }
                  if (obj2.email > obj1.email) {
                    return 1;
                  }
                  return 0;
                }
              );
              table = sortedTable;
              container.appendChild(table);
              sorted = true;
            } else {
              var sortedTable = sortTable(
                dataSource,
                table,
                function (obj1, obj2) {
                  if (obj1.email < obj2.email) {
                    return -1;
                  }
                  if (obj1.email > obj2.email) {
                    return 1;
                  }
                  return 0;
                }
              );
              table = sortedTable;
              container.appendChild(table);
              sorted = false;
            }
            break;
          default:
            break;
        }
        break;
      case "delete":
        let rowRef = e.target.parentNode.parentNode;
        if (window.confirm("are you sure ?")) {
          table.removeChild(rowRef);
          tableSave(dataSource, rowRef, 0);
        } else {
          // nothing
        }
        ////debugger;
        break;
      case "update":
        // debugger;
        if (e.target.parentNode.parentNode === rowBuffer.parentNode) {
          let updateText = prompt("Enter the update Value");
          if (updateText) {
            rowBuffer.innerText = updateText;
            ////debugger;
            tableSave(dataSource, e.target.parentNode.parentNode, 1);
          } else {
            // nothing
          }
        } else {
          window.alert("you can update only the row where u selected !");
        }

        break;
      default:
        e.target.addEventListener("dblclick", function () {
          rowBuffer = e.target;
        });
        break;
    }
  });

  container.appendChild(table); //EVERY THING REPEAT ITSELF
}

export { applicationLogic, applicationStandardTable };
