import { PaginatedUsersT } from "./types";
import { fetchUsers } from "./api";

// appRoot container
let appContainer;

//List of the fetched users data by page
// each object key represent a  page num
// each value repressent the users for that page
let fetchedUsers: PaginatedUsersT = {};

//Proxy to watch when page changes and perform the neccessary operations.
// Page value should only be changed using currentPage.value
const currentPage = new Proxy(
  { value: 0 },
  {
    set(target, prop, val) {
      target.value = val;
      pageChangeOperations(val);
      return true;
    },
  }
);

export function initApp(appRoot) {
  appContainer = appRoot;
  currentPage.value = 1;
}

async function pageChangeOperations(pageNum) {
  const pageData = fetchedUsers[pageNum];
  if (pageData) {
    renderPage(pageNum, pageData);
  } else {
    let response = await fetchUsers(pageNum);
    let users = response.results[0];
    fetchedUsers = {
      ...fetchedUsers,
      ...users,
    };
    pageChangeOperations(pageNum);
  }
}

function renderPage(page, pageData) {
  appContainer.innerHTML = ` <table>
        <caption>paginated random data of app users</caption>
        <thead>
            <tr>
                <td># No.</td>
                <td>Gender</td>
                <td>Age</td>
            </tr>
        </thead>
        <tbody data-sink>
           ${buildRows(pageData)}
        </tbody>
    </table>

    <div class="btn-group">
        <button ${
          page === 1 && "disabled"
        } id="backButton" data-prevbtn>Previous</button>
        
         <button  id="nextButton" data-nextbtn>Next</button>
    
        <label data-pageview>Page Num: ${page}</label>
    </div>`;

  // add event listerners for both ops
  document.querySelector("#backButton").addEventListener("click", goPrev);
  document.querySelector("#nextButton").addEventListener("click", goNext);
}
function buildRows(data) {
  let builtRows = "";
  data.forEach((user) => {
    builtRows += `<tr data-entryid="${user.id}">
                <td>${user.row}</td>
                  <td>${user.gender.toUpperCase()}</td>
                     <td>${user.age}</td>
            </tr>`;
  });

  return builtRows;
}
function goNext() {
  currentPage.value = currentPage.value + 1;
}
function goPrev() {
  currentPage.value = currentPage.value - 1;
}
