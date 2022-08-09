import { PaginatedUsersT, UsersT } from "./types";
import { fetchUsers } from "./api";

/**
 * Container where the app mounts
 */
let appContainer;

/**
 * List of the fetched user's data by page.
 * Each object key represent a page number.
 * Each value represents the users in that page
 */
let fetchedUsers: PaginatedUsersT = {};

/**
 * Proxy to watch when page changes.
 * Triggers the page change operations so the page data can be displayed.
 * N:B: Page value should only be changed using currentPage.value
 */
const currentPage = new Proxy(
  { value: 0 },
  {
    set(target, prop, val) {
      target[prop] = val;
      pageChangeOperations(val);
      return true;
    },
  }
);

/**
 * Initialise the app.
 * Mount it to the provided element.
 * Set the page to 1
 * @param {HTMLElement} appRoot
 */
export function initApp(appRoot: HTMLElement) {
  appContainer = appRoot;
  currentPage.value = 1;
}

/**
 * Check if there is a data for the requested page.
 * Calls renderer to render the page data if data exist.
 * Fetch data from endpoint if page data doesn't exist yet, then calls self
 * @param {Number} pageNum page to check
 */
async function pageChangeOperations(pageNum: number) {
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

/**
 * The UI renderer.
 * Compose a template literal with the current state of variables.
 * Set the content of the root node to the newly generated template.
 * Add click event listeners to the buttons
 * @param {Number} page current page number
 * @param {Array} pageData the users in the page
 */
function renderPage(page: number, pageData: UsersT[]) {
  appContainer.innerHTML = `<table>
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
        <button ${page === 1 && "disabled"} data-prevbtn>Previous</button>
        
         <button data-nextbtn>Next</button>
    
        <label data-pageview>Page Num: ${page}</label>
    </div>`;

  // add event listeners for previous and next buttons
  document.querySelector("[data-prevbtn]").addEventListener("click", goPrev);
  document.querySelector("[data-nextbtn]").addEventListener("click", goNext);
}

/**
 * Build the rows of the table using the provided users array
 * @param {Array} users array of users to list
 * @returns template literal of the rows
 */
function buildRows(users: UsersT[]) {
  let builtRows = "";
  users.forEach((user) => {
    builtRows += `<tr data-entryid="${user.id}">
                <td>${user.row}</td>
                  <td>${user.gender.toUpperCase()}</td>
                     <td>${user.age}</td>
            </tr>`;
  });

  return builtRows;
}

/**
 * move to next page
 */
function goNext() {
  currentPage.value = currentPage.value + 1;
}

/**
 * move to previous page
 */
function goPrev() {
  currentPage.value = currentPage.value - 1;
}
