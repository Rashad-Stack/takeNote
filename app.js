'use strict';
const addBtn = document.getElementById('addBtn');
const addTitle = document.getElementById('addTitle');
const addTxt = document.getElementById('addTxt');
const noteContainer = document.getElementById('notes');
const modalBox = document.querySelector('.modal');
const closeModal = document.querySelector('#close');
const saveChange = document.querySelector('#save-change');
const modalInputTitle = document.querySelector('#modal_input-title');
const modalInputNote = document.querySelector('#modal_input-note');
const searchBtn = document.querySelector('.search');
const searchTxt = document.querySelector('#searchTxt');
const noteCards = document.getElementsByClassName('noteCard');
const alertTitle = document.querySelector('.title-alert');
const alertNote = document.querySelector('.note-alert');


// Making Html Element
let notesDataObj;
const showNotes = function () {
    const notesData = localStorage.getItem('data');
    if (notesData === null) {
        notesDataObj = [];
    } else {
        notesDataObj = JSON.parse(notesData);
    }
    let html = '';
    notesDataObj.forEach((note, index) => {
        html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
               <div class="card-body">
               <h5 class="card-title">${note.title}</h5>
                <p class="card-text">${note.text}</p>
                <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
                <button type="button" class="btn btn-success" onclick="editNote(this.id)" id="${index}">Edit</button>
               </div>
           </div>`;
    });
    noteContainer.innerHTML = html;
};
showNotes();

//Event Listener
addBtn.addEventListener('click', function (e) {
    if (addTitle.value === '' && addTxt.value === '') {
        alertTitle.style.display = 'block'
        alertNote.style.display = 'block'
    } else if (addTitle.value === '') {
        alertTitle.style.display = 'block'
    } else if (addTxt.value === '') {
        alertNote.style.display = 'block'
    } else {
        const notesData = localStorage.getItem('data');
        if (notesData === null) {
            notesDataObj = [];
        } else {
            notesDataObj = JSON.parse(notesData);
        }
        notesDataObj.push({ title: addTitle.value, text: addTxt.value });
        localStorage.setItem('data', JSON.stringify(notesDataObj));
        addTitle.value = addTxt.value = '';
        showNotes();
        alertTitle.style.display = 'none'
        alertNote.style.display = 'none'
    }

});


// Delete note
const deleteNote = function (index) {
    notesDataObj.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(notesDataObj));
    showNotes(notesDataObj);
};

// Edit Model show
let noteNumber;
const editNote = function (index) {
    noteNumber = index;
    modalBox.style.display = 'block';
    modalInputTitle.value = notesDataObj[index].title;
    modalInputNote.value = notesDataObj[index].text;

};

// Edit Model Hide
closeModal.addEventListener('click', function (e) {
    e.preventDefault();
    modalBox.style.display = 'none';
});

// Save And Change Note
saveChange.addEventListener('click', function (e) {
    e.preventDefault();
    if (modalInputTitle.value == '' && modalInputNote.value === '') {
        modalBox.style.display = 'none';
    } else {
        modalBox.style.display = 'none';
        const notesData = localStorage.getItem('data');
        if (notesData === null) {
            notesDataObj = [];
        } else {
            notesDataObj = JSON.parse(notesData);
        }
        notesDataObj[noteNumber].title = modalInputTitle.value;
        notesDataObj[noteNumber].text = modalInputNote.value;
        localStorage.setItem('data', JSON.stringify(notesDataObj));
        showNotes();
    }

});

//Search functionality
searchBtn.addEventListener('click', function (e) {
    e.preventDefault();
    Array.from(noteCards).forEach(element => {
        const cardTxt = element.getElementsByTagName("h5")[0].innerText;
        console.log(cardTxt);
        if (cardTxt.includes(searchTxt.value)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })

    searchTxt.value = '';
})