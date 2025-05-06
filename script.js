let todayLists = JSON.parse(localStorage.getItem("listItems")) || [];

const btn = document.getElementById("addItemBtn");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  let itemName = document.getElementById("itemName").value.trim();
  let deadline = document.getElementById("deadline").value;
  // console.log("deadlin eis", deadline);
  let prio = document.getElementById("priority").value;

  // Input validation
  if (!itemName || !deadline || prio === "Priority") {
    alert("Please fill in all fields correctly.");
    return;
  }

  let status;

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let todayDate = `${year}-${String(month).padStart(2, "0")}-${String(
    day
  ).padStart(2, "0")}`;
  console.log("today date is :", todayDate);
  if (deadline === todayDate) {
    status = "today";
  } else {
    status = "future";
  }

  let itemObj = {
    id: Date.now(),
    itemName: itemName,
    deadline: deadline,
    priority: prio,
    status: status,
  };
  todayLists.push(itemObj);
  console.log(itemObj);
  console.log(todayLists);
  // let previousItemList = localStorage.getItem("listItems");//string

  localStorage.setItem("listItems", JSON.stringify(todayLists));
  updateItems();
  document.getElementById("my-form").reset();
});

function renderItem(item) {
  const completeClass = item.status === "completed" ? "complete" : "";
  const markIcon =
    item.status !== "completed" ? (
      `<i class="bi bi-check2 icon" onclick="markCompleted(${item.id})"></i>`
    ) : (
      ""
    );
  return `<div class="item-div dark ${completeClass}">
        <div class="item-name">${item.itemName}</div>
        <div class="item-deadline">${item.deadline}</div>
        <div class="item-priority">${item.priority}</div>
        <div class="dlt-icon">
        ${markIcon}
        <i class="bi bi-trash3 icon" onclick="deleteItem(${item.id})"></i></div>
      </div>`;
}

function updateItems() {
  let savedItems = JSON.parse(localStorage.getItem("listItems"));
  console.log("saved list: ", savedItems);
  let todayItemContainer = document.getElementById("today-list");
  let futureItemContainer = document.getElementById("future-list");
  let completedItemContainer = document.getElementById("completed-list");
  // console.log("todayItemContainer", todayItemContainer);

  let todayHtml = "";
  let futureHtml = "";
  let completedHtml = "";
  for (item of savedItems) {
    if (item.status == "today") {
      let itemHtml = renderItem(item);
      todayHtml += itemHtml;
    } else if (item.status == "completed") {
      let itemHtml = renderItem(item);
      completedHtml += itemHtml;
    } else if (item.status == "future") {
      let itemHtml = renderItem(item);
      futureHtml += itemHtml;
    }
  }
  todayItemContainer.innerHTML = todayHtml;
  futureItemContainer.innerHTML = futureHtml;
  completedItemContainer.innerHTML = completedHtml;
}

function markCompleted(item) {
  let items = JSON.parse(localStorage.getItem("listItems")) || [];
  items = items.map((i) => {
    if (i.itemName === item.itemName && i.deadline === item.deadline) {
      i.status = "completed";
    }
    return i;
  });
  localStorage.setItem("listItems", JSON.stringify(items));
  updateItems();
  // console.log("mark completed icon clicked");
  // console.log(itemDetails);
  // item.status = "completed";
}

function deleteItem(itemId) {
  let items = JSON.parse(localStorage.getItem("listItems")) || [];
  items = items.filter((i) => i.id !== itemId);
  localStorage.setItem("listItems", JSON.stringify(items));
  updateItems();
}

function markCompleted(itemId) {
  let items = JSON.parse(localStorage.getItem("listItems")) || [];
  items = items.map((i) => {
    if (i.id === itemId) {
      i.status = "completed";
    }
    return i;
  });
  localStorage.setItem("listItems", JSON.stringify(items));
  updateItems();
}

updateItems();
