document.addEventListener("DOMContentLoaded", function () {
 
    const submitForm = document.getElementById("inputBook");
 
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }
});

document.addEventListener('DOMContentLoaded', function (){
    const inputMinLengthOnLoad = document.getElementById("inputBookTitle").minLength;
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
 });
 document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
 });
 
// Notif Minimal Input
 document.getElementById("inputBookTitle").addEventListener("input", function(){
    const min = document.getElementById("inputBookTitle").minLength;
    const diketik = document.getElementById("inputBookTitle").value.length;
    console.log(diketik, min);
    const Update = 0 + diketik;
    document.getElementById("inputminimal").innerText = Update;
    if (Update == 4 ){
        document.getElementById("inputminimal").innerText = "Syarat Terpenuhi";
    } else if(Update <= 3){
        document.getElementById("textmin").style.color = "#b3b300";
    } else{
        document.getElementById("textmin").style.color = "black";
    }
});

function makeBook(title,author,year, isCompleted) {
    const textTitle = document.createElement("h3");
    textTitle.innerText = title;

    const textAuthor = document.createElement("p");
    textAuthor.innerHTML = `Author: <span id="author">` + author + `</span>`;
 
    const textYear = document.createElement("h5");
    textYear.innerHTML = `Tahun Keluar: <span id="year">` + year + `</span>`;
 
    const textContainer = document.createElement("article");
    textContainer.classList.add("book_item");
    textContainer.classList.add("item", "shadow");
    textContainer.append(textTitle,textAuthor, textYear);
 
    const container = document.createElement("div");
    container.classList.add("book_item");
    container.append(textContainer);
    
    if(isCompleted){
        container.append(
            kembalikanButton(),
            hapusButton()
        );}else{
            container.append(ceklisButton(),hapusButton());
        }
    
    return container;
    
}

function createButton(buttonTypeClass , eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function addTaskToCompleted(taskElement) {
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const taskTitle = taskElement.querySelector(".book_item > h3").innerText;
    const taskAuthor = taskElement.querySelector("span#author").innerHTML;
	const year = taskElement.querySelector("span#year").innerHTML;
 
    const newBook = makeBook(taskTitle,taskAuthor, year, true);

    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;
  
    listCompleted.append(newBook);
    taskElement.remove();
    updateDataToStorage();
}

function undoTaskFromCompleted(taskElement){
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const taskTitle = taskElement.querySelector(".book_item > h3").innerText;
    const taskAuthor = taskElement.querySelector("span#author").innerHTML;
	const year = taskElement.querySelector("span#year").innerHTML;
 
 
    const newBook = makeBook(taskTitle,taskAuthor, year, false);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;
 
    listUncompleted.append(newBook);
    taskElement.remove();
    updateDataToStorage();
}

function refreshDataFromBooks() {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    let listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
  
  
    for(book of books){
        const newBook = makeBook(book.task,book.author, book.year, book.isCompleted);
        newBook[BOOK_ITEMID] = book.id;
      
      
        if(book.isCompleted){
            listCompleted.append(newBook);
        } else {
            listUncompleted.append(newBook);
        }
     }
 }

function removeTaskFromCompleted(taskElement) {
    
    var yakin = confirm("Apakah kamu yakin akan menghapus data ini ?");

    if (yakin) {
        const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
        books.splice(bookPosition, 1);
        taskElement.remove();
        updateDataToStorage();
        alert("Data Berhasil Di Hapus");
    } else {
        alert("Data Tidak Terhapus");
    }   

}

function filter() {
    var value,name,profile,i;
    value = document.getElementById("searchSubmit").value.toUpperCase();
    profile = document.getElementsByClassName("book_item");
    for(i=0;i<profile.length;i++){
      name = profile[i].getElementsByTagName("h3");
      if (name[0].innerHTML.toUpperCase().indexOf(value) > -1) {
        profile[i].style.display = "";
      }else{
        profile[i].style.display = "none";
      }
    }
  }

function kembalikanButton() {
    return createButton("undo-button", function(event){
        undoTaskFromCompleted(event.target.parentElement);
    });
}

function hapusButton() {
    return createButton("trash-button", function(event){
        removeTaskFromCompleted(event.target.parentElement);
    });
}

function ceklisButton() {
    return createButton("check-button", function(event){
         addTaskToCompleted(event.target.parentElement);
    });
}