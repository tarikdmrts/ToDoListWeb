$('.add-btn').on('click', () => {
    const whenInputValue = $.trim($('#todo-when-input').val());
    const nameInputValue = $.trim($('#todo-name-input').val());

    if (whenInputValue === "" || nameInputValue === "") {
        alert("Please fill in both fields.");
    } else {
        const tableBody = $('.todo-table tbody');
        const deleteBtn = $('<div class="delete-btn">Delete</div>');

        const newRow = $(`
            <tr>
                <td>${whenInputValue}</td>
                <td>${nameInputValue}</td>
                <td>${deleteBtn[0].outerHTML}</td>
            </tr>
        `);

        setStorageObject(nameInputValue,whenInputValue,false);
        tableBody.append(newRow);
    }
});

$('.todo-table').on('click', '.delete-btn', function() {
    const row = $(this).closest('tr');
    const nameValue = row.find('td').eq(1).text();
    removeStorageObject(nameValue)
    $(this).closest('tr').remove();
});

$('.todo-table tbody').on('click', 'tr', function() {
    const row = $(this).closest('tr');
    const nameValue = row.find('td').eq(1).text();
    setDoneStorageObject(nameValue)
    $(this).toggleClass('strike-through');
});

$('#todo-filter-search').on('keyup',function() {
    let searchTerm = $(this).val().toLowerCase();

    $('.todo-table tbody tr').each(function() {
      let rowText = $(this).text().toLowerCase();
      if (rowText.indexOf(searchTerm) !== -1) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
})

const setStorageObject = (name,time,isDone) => {

    let objectArray = JSON.parse(localStorage.getItem('storage')) || [];

    const object = {
        name:name,
        time:time,
        done:isDone
    }

    objectArray.push(object)
    localStorage.setItem('storage',JSON.stringify(objectArray))
}

const removeStorageObject = (nameToRemove) => {

    let objectArray = JSON.parse(localStorage.getItem('storage'));

    objectArray = objectArray.filter(object => object.name !== nameToRemove);

    localStorage.setItem('storage', JSON.stringify(objectArray));
};

const setDoneStorageObject = (nameToSetDone) => {
    const objectArray = JSON.parse(localStorage.getItem('storage'));
    const object = objectArray.find(object => object.name === nameToSetDone);

    object.done = !object.done;
    localStorage.setItem('storage', JSON.stringify(objectArray));
}

const loadTableFromLocalStorage = () => {
    const storedData = JSON.parse(localStorage.getItem('storage')) || [];

    const tableBody = $('.todo-table tbody');
    const deleteBtn = $('<div class="delete-btn">Delete</div>');

    tableBody.empty();

    storedData.forEach(item => {
        const newRow = $(`
            <tr class="${item.done ? 'strike-through' : ''}">
                <td>${item.time}</td>
                <td>${item.name}</td>
                <td>${deleteBtn[0].outerHTML}</td>
            </tr>
        `);

        tableBody.append(newRow);
    });
};

$(document).ready(() => {
    loadTableFromLocalStorage();
});



