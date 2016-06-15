/**
 * [未使用享元模式优化版本]
 * @author wangzhipei
 * @date 2016/6/15/0015.
 */

var Book = function(id,title, author, genre, pageCount, publisherID,
                    ISBN, checkoutDate, checkoutMember, dueReturnDate,availability){

    this.id = id;
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pageCount = pageCount;
    this.publisherID = publisherID;
    this.ISBN = ISBN;
    this.checkoutDate = checkoutDate;
    this.checkoutMember = checkoutMember;
    this.dueReturnDate = dueReturnDate;
    this.availability = availability;
};

Book.prototype = {
    getTitle: function() {
        return this.title;
    },

    getAuthor: function() {
        return this.author;
    },

    getISBN: function() {
        return this.ISBN;
    },

    // 鉴于篇幅，其他属性就暂不列出了
    updateCheckoutStatus: function(bookID, newStatus, checkoutDate, checkoutMember, newReturnDate) {
        this.id = bookID;
        this.availability = newStatus;
        this.checkoutDate = checkoutDate;
        this.checkoutMember = checkoutMember;
        this.dueReturnDate = newReturnDate;
    },

    extendCheckoutPeriod: function(bookID, newReturnDate){
        this.id = bookID;
        this.dueReturnDate = newReturnDate;
    },

    isPastDue: function(bookID) {
        var currentDate = new Date();
        return currentDate.getTime() > Date.parse(this.dueReturnDate);
    }
};