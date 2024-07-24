document.addEventListener('DOMContentLoaded', () => {
    function toggleDropdown(buttonClass, dropdownClass) {
        const button = document.querySelector(buttonClass);
        const dropdownItems = document.querySelectorAll(dropdownClass);

        button.addEventListener('click', () => {
            dropdownItems.forEach(item => {
                if (item.style.display === 'block') {
                    item.style.display = 'none';
                } else {
                    item.style.display = 'block';
                  
                }
            });
        });
    }

    toggleDropdown('.dropdownbtn1', '.dropdown1');
    toggleDropdown('.dropdownbtn2', '.dropdown2');
    toggleDropdown('.dropdownbtn3', '.dropdown3');
});





document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://dummyjson.com/users';


    function createTableRow(user) {
        const row = document.createElement('tr');

        const fullNameCell = document.createElement('td');
        fullNameCell.textContent = `${user.firstName} ${user.lastName}`;
        row.appendChild(fullNameCell);

        const usernameCell = document.createElement('td');
        usernameCell.textContent = user.username;
        row.appendChild(usernameCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = user.email;
        row.appendChild(emailCell);

        const actionsCell = document.createElement('td');

        const editButton = document.createElement('button');
        editButton.innerHTML = ' <span><i class="fa-solid fa-file-pen"></i> Edit </span>';
        editButton.classList.add('edit');
        editButton.addEventListener('click', () => {
            editRow(row, user);
        });
        actionsCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = ' <span><i class="fa-solid fa-trash"></i> Delete </span>';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => {

            row.remove();
        });
        actionsCell.appendChild(deleteButton);

        row.appendChild(actionsCell);

        return row;
    }

    // Fetch 
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(` status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {

            if (!Array.isArray(data.users)) {
                throw new Error('API response does not contain an array of users');
            }

            const tableBody = document.querySelector('#userTable tbody');
            data.users.forEach(user => {
                const row = createTableRow(user);
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            alert('An error occurred , check the console for details.');
        });
});




function editRow(row, user) {
    // Remove the current row
    row.remove();

    // your own data is added at the end of the table
    const newRow = document.createElement('tr');

    const fullNameCell = document.createElement('td');
    fullNameCell.textContent = prompt('Enter new full name', user.fullName);
    newRow.appendChild(fullNameCell);

    const usernameCell = document.createElement('td');
    usernameCell.textContent = prompt('Enter new username', user.username);
    newRow.appendChild(usernameCell);

    const emailCell = document.createElement('td');
    emailCell.textContent = prompt('Enter new email', user.email);
    newRow.appendChild(emailCell);

    const actionsCell = document.createElement('td');

    const editButton = document.createElement('button');
    editButton.innerHTML = ' <span><i class="fa-solid fa-file-pen"></i> Edit </span>';
    editButton.classList.add('edit');
    editButton.addEventListener('click', () => {
        editRow(newRow, user);
    });
    actionsCell.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = ' <span><i class="fa-solid fa-trash"></i> Delete </span>';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', () => {
        deleteRow(newRow, user.id);
    });
    actionsCell.appendChild(deleteButton);

    newRow.appendChild(actionsCell);

    document.querySelector('#userTable tbody').appendChild(newRow);
}
