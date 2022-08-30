var addContact = document.getElementById('contact_list');
var form = document.getElementById('form');
var list = [];
window.onload = loadList;

function changeToActivate() {
    form.classList.add('activate');
    document.getElementById('application').style.backgroundColor = '#EEC364';
    document.getElementById('header').style.color = 'white';
    document.getElementById('toggle_button').innerHTML = 'X';
}

function changeToRemove() {
    form.classList.remove('activate');
    document.getElementById('header').innerHTML = 'All contacts'
    document.getElementById('application').style.backgroundColor = 'white';
    document.getElementById('header').style.color = 'black';
    document.getElementById('toggle_button').innerHTML = '+';
}

function activateToggle() {
    if (form.classList != 'add_new_contacts_form activate') {
        if (document.getElementById('add_new_contact_button') == null) {
            var b2 = document.getElementById('edit_button');
        var f2 = document.getElementById('form')
        b2.remove(f2)

        // add new button 
        var x2 = document.createElement('button');
        var y2 = document.createTextNode('Add new contact');
        x2.setAttribute('id', 'add_new_contact_button');
        x2.appendChild(y2);
        f2.appendChild(x2);

        }
        changeToActivate();
        document.getElementById('header').innerHTML = 'Add new contact'
    } else {
        changeToRemove();
        //clear input
        document.getElementById('firstname').value = '';
        document.getElementById('lastname').value = '';
        document.getElementById('phonenumber').value = '';

    }
}

var toggle = document.getElementById('toggle_button');
toggle.addEventListener('click', activateToggle);

//will load on refresh page
function loadList() {
    //check if there are any contacts
    if (localStorage.getItem('list') == null) return;

    let contacts = Array.from(JSON.parse(localStorage.getItem('list')));
    contacts.forEach(contact => {
        addContact.innerHTML += '<div class="contact_item">' + '<h3>'
            + contact.firstname + contact.lastname + '</h3>' + '<p>' +
            contact.phonenumber + '</p>' + '<button class="delete_button">'
            + 'delete' + '</button>' + '<button class="edit_button">'
            + 'edit' + '</button>' + '</div>';
    });

    var allDeleteButton = document.getElementsByClassName('delete_button')
    for (let index = 0; index < allDeleteButton.length; index++) {
        var deleteButton = allDeleteButton[index];
        deleteButton.addEventListener('click', deleteContact);
    }

    var allEditButton = document.getElementsByClassName('edit_button')
    for (let index = 0; index < allEditButton.length; index++) {
        var editButton = allEditButton[index];
        editButton.addEventListener('click', editContact);
    }
}

function addToList(event) {
    event.preventDefault();

    //save input 
    var firstNameValue = document.getElementById('firstname').value;
    var lastNameValue = document.getElementById('lastname').value;
    var phoneNumberValue = document.getElementById('phonenumber').value;

    var contact = {
        firstname: firstNameValue + " ",
        lastname: lastNameValue,
        phonenumber: phoneNumberValue,
    }

    // add contact to local storage
    localStorage.setItem('list', JSON.stringify([...JSON.parse(localStorage.getItem('list') || "[]"), contact]));

    // create contact and display it
    addContact.innerHTML += '<div class="contact_item">' + '<h3>' + contact.firstname +
        contact.lastname + '</h3>' + '<p>' + contact.phonenumber + '</p>' +
        '<button class="delete_button">' + 'delete' + '</button>' +
        '<button class="edit_button">' + 'edit' + '</button>' + '</div>';

    //clear input
    document.getElementById('firstname').value = '';
    document.getElementById('lastname').value = '';
    document.getElementById('phonenumber').value = '';

    changeToRemove();
    var allDeleteButton = document.getElementsByClassName('delete_button')
    for (let index = 0; index < allDeleteButton.length; index++) {
        var deleteButton = allDeleteButton[index];
        deleteButton.addEventListener('click', deleteContact);
    }

    var allEditButton = document.getElementsByClassName('edit_button')
    for (let index = 0; index < allEditButton.length; index++) {
        var editButton = allEditButton[index];
        editButton.addEventListener('click', editContact);
    }
}

var button = document.getElementById('add_new_contact_button');
    button.addEventListener('click', addToList);

function deleteContact(event) {
    let contacts = Array.from(JSON.parse(localStorage.getItem('list')));
    contacts.forEach(contact => {
        if (event.target.parentElement.children[0].innerHTML == contact.firstname + contact.lastname) {
            contacts.splice(contacts.indexOf(contact), 1);
        }
        localStorage.setItem('list', JSON.stringify(contacts));
        event.target.parentElement.remove();
    });
}

function editContact(event) {
    changeToActivate();
    document.getElementById('header').innerHTML = 'Edit contact'

    //reach button and which contact it is connected to
    var changeContact = event.target.parentElement;

    // reach the contacts name and number
    var n = changeContact.querySelectorAll('h3')[0].innerText
    var p = changeContact.querySelectorAll('p')[0].innerText

    // split the name into first and last
    var spl = n.split(" ", 2);
    var firstn = spl[0];
    var lastn = spl[1];

    // write the previous info from contact into the input form  
    document.getElementById('firstname').value = firstn;
    document.getElementById('lastname').value = lastn;
    document.getElementById('phonenumber').value = p;

    //remove button 
    var b = document.getElementById('add_new_contact_button');
    var f = document.getElementById('form')
    b.remove(f)

    // add new button 
    var x = document.createElement('button');
    var y = document.createTextNode('Edit Contact');
    x.setAttribute('id', 'edit_button');
    x.appendChild(y);
    f.appendChild(x)

    var e = document.getElementById('edit_button');
    e.addEventListener('click', change);

    function change() {
        let contacts = Array.from(JSON.parse(localStorage.getItem('list')));
        contacts.forEach(contact => {
            if (firstn + ' ' == contact.firstname && lastn == contact.lastname && p == contact.phonenumber) {
                contact.firstname = document.getElementById('firstname').value + ' ';
                contact.lastname = document.getElementById('lastname').value;
                contact.phonenumber = document.getElementById('phonenumber').value;
                event.target.parentElement.querySelectorAll('h3')[0].innerText = contact.firstname + contact.lastname;
                event.target.parentElement.querySelectorAll('p')[0].innerText = contact.phonenumber;
            }
            localStorage.setItem('list', JSON.stringify(contacts));
        })
        //change button again
        //remove button 
        var b2 = document.getElementById('edit_button');
        var f2 = document.getElementById('form')
        b2.remove(f2)

        // add new button 
        var x2 = document.createElement('button');
        var y2 = document.createTextNode('Add new contact');
        x2.setAttribute('id', 'add_new_contact_button');
        x2.appendChild(y2);
        f2.appendChild(x2);

        //clear input
        document.getElementById('firstname').value = '';
        document.getElementById('lastname').value = '';
        document.getElementById('phonenumber').value = '';
        changeToRemove()

        var button = document.getElementById('add_new_contact_button');
    button.addEventListener('click', addToList);

    }
}


