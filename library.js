let library = [];
const list = document.querySelector('.list');
const addBtn = document.querySelector('#addBook');
const addTitle = document.querySelector('#title');
const addAuth = document.querySelector('#author');
const addPages = document.querySelector('#pages');
const addRead = document.querySelector('#read');
let delBtn = [];
let readBtn = [];

class Book {
    constructor(title, auth, pages, read) {
    this.title = title;
    this.auth = auth;
    this.pages = pages;
    this.read = read;
    this.id = title + auth + pages;
    };
};

function listen() {
    delBtn.forEach(del => {
        del.addEventListener('click', delBook);
    });
    readBtn.forEach(read => {
        read.addEventListener('click', toggleRead);
    });
};

function display() {
    library = JSON.parse(localStorage.getItem('savedLib'));
    list.innerHTML = '';
    for(i=0; i<library.length; i++) {
        dispLib(i);
    };
    delBtn = [...document.querySelectorAll('.delete')];
    readBtn = [...document.querySelectorAll('.readbtn')];
    listen();
};

function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

function dispLib(i) {
    list.innerHTML = list.innerHTML + `
<div class="card">
    <div class="title unread">
        <div class="label lt">
            Title
        </div>
        <div class="tname">
            ${library[i].title}
        </div>
    </div>
    <div class="author col${library[i].read}" data-authId="${library[i].id}">
        <div class="label la">
            Author
        </div>
        <div class="tauth">
            ${library[i].auth}
        </div>
        <div class="label lp">
            Pages
        </div>
        <div class="pages">
            ${library[i].pages}
        </div>
        <input type="button" class="delete" data-bookbtn="${library[i].id}">
        <input type="button" class="readbtn" value="${library[i].read}" data-readbtn="${library[i].id}">
    </div>
</div>
`
};

function add() {
    readStat = '';
    chckDblT = findWithAttr(library, 'title', addTitle.value);
    chckDblA = findWithAttr(library, 'auth', addAuth.value);
    if (addRead.checked) {
        readStat = 'Read'
    } else {
        readStat = 'Unread'
    }
    if (addTitle.value === '' || addAuth.value === '' || addPages.value === ''){
        alert('Please fill in the info')
    } else if(chckDblT > -1 && chckDblA > -1) {
        alert('You have added this book')
    } else {
        library.push(new Book(addTitle.value, addAuth.value, addPages.value, readStat));
        localStorage.setItem('savedLib', JSON.stringify(library));
        display();
    };
};

function delBook() {
    libIndex = findWithAttr(library, 'id', this.dataset.bookbtn);
    if (libIndex > -1) {
        library.splice(libIndex, 1);
    };
    localStorage.setItem('savedLib', JSON.stringify(library));
    display();
};

function toggleRead() {
    libIndex = findWithAttr(library, 'id', this.dataset.readbtn);
    authDiv = document.querySelector(`[data-authId="${this.dataset.readbtn}"]`);
    if (libIndex > -1) {
        if (library[libIndex].read === 'Read') {
            library[libIndex].read = 'Unread';
        } else {
            library[libIndex].read = 'Read';
        }
    };
    authDiv.classList.toggle("colUnread");
    authDiv.classList.toggle("colRead");
    this.value = library[libIndex].read;
    localStorage.setItem('savedLib', JSON.stringify(library));
};

display();

addBtn.addEventListener('click', add);

delBtn.forEach(del => {
    del.addEventListener('click', delBook);
});

document.querySelector('.delete').addEventListener('click', delBook);
document.querySelector('.checkbox').addEventListener('click', toggleChck);

