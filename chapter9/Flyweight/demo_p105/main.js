/**
 * [使用享元模式优化版本]
 * @author wangzhipei
 * @date 2016/6/15/0015.
 */

var Book = function (title, author, genre, pageCount, publisherID, ISBN) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pageCount = pageCount;
    this.publisherID = publisherID;
    this.ISBN = ISBN;
};

// 书籍工厂单例
var BookFactory = (function () {
    var existingBooks = {}, existingBook;
    return {
        createBook: function (title, author, genre, pageCount, publisherID, ISBN) {
            // 如果书籍之前已经创建，则找出并返回它
            // !! 强制返回布尔值
            existingBook = existingBooks[ISBN];
            if (!!existingBook) {
                return existingBook;
            } else {
                // 如果没有找到，则创建一个该书的新实力，并保存
                var book = new Book(title, author, genre, pageCount, publisherID, ISBN);
                existingBooks[ISBN] = book;
                return book;
            }
        }
    };
});


// 书籍记录管理单例
var BookRecordManager = (function () {
    var bookRecordDatabase = {};
    return {
        // 添加新书到图书馆系统
        addBookRecord: function (id, title, author, genre, pageCount, publisherID, ISBN, checkoutDate,
                                 checkoutMember, dueReturnDate, availability) {
            var book = bookFactory.createBook(title, author, genre, pageCount, publisherID, ISBN);
            bookRecordDatabase[id] = {
                checkoutMember: checkoutMember,
                checkoutDate: checkoutDate,
                dueReturnDate: dueReturnDate,
                availability: availability,
                book: book
            };
        },
        updateCheckoutStatus: function(bookID, newStatus, checkoutDate, checkoutMember, newReturnDate){
            var record = bookRecordDatabase[bookID];
            record.availability = newStatus;
            record.checkoutDate = checkoutDate;
            record.checkoutMember = checkoutMember;
            record.dueReturnDate = newReturnDate;
        },

        extendCheckoutPeriod: function(bookID, newReturnDate) {
            bookRecordDatabase[bookID].dueReturnDate = newReturnDate;
        },

        isPastDue: function(bookID){
            var currentDate = new Date();
            return currentDate.getTime() > Date.parse(bookRecordDatabase[bookID].dueReturnDate);
        }
    }
});
