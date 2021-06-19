const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList"; 
const BOOK_ITEMID = "itemId";

const checkbox = document.getElementById("inputBookIsComplete");
let check = false;
checkbox.addEventListener("change", function(){
    if(checkbox.checked){
        check = true
        document.getElementById("check").innerText = "Selesai dibaca"
    }else {
        check = false
        document.getElementById("check").innerText = "Belum selesai dibaca"
    }

})
 
function addBook() {
    
    const textBook = document.getElementById("inputBookTitle").value;
    const textAuthor = document.getElementById("inputBookAuthor").value;
    const year = document.getElementById("inputBookYear").value;
    

    if(check == true){
        const completedBOOKList = document.getElementById(COMPLETED_LIST_BOOK_ID );
        const book = makeBook(textBook, textAuthor, year, true);
        const bookObject = composeBookObject(textBook, textAuthor, year, true);

        book[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);
      
        completedBOOKList.append(book);
        updateDataToStorage();
    }else {
    const uncompletedBOOKList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID );
    const book = makeBook(textBook, textAuthor, year, false);
    const bookObject = composeBookObject(textBook, textAuthor, year, false);
   
    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);
  
    uncompletedBOOKList.append(book);
    updateDataToStorage();
    }
}

