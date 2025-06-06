
const { BookModel } = require("../../models/BookModel");


exports.checkBookAvailability = async (bookCounts) => {
    const bookIds = Object.keys(bookCounts);
    const foundBooks = await BookModel.find({ _id: { $in: bookIds } });

    if (foundBooks.length !== bookIds.length) {
        const missingBooks = bookIds.filter(id => 
            !foundBooks.some(book => book._id.toString() === id)
        );
        throw { status: 404, message: "بعض الكتب غير متوفرة", missingBooks };
    }
    return foundBooks;
};



exports.checkStock = (foundBooks, bookCounts) => {
    const insufficientBooks = foundBooks.filter(book => book.quantity < bookCounts[book._id.toString()]);
    if (insufficientBooks.length > 0) {
        throw { 
            status: 400, 
            message: "الكمية غير كافية لبعض الكتب", 
            insufficientQuantityBooks: insufficientBooks.map(book => ({
                bookId: book._id,
                title: book.title,
                availableQuantity: book.quantity,
                requestedQuantity: bookCounts[book._id.toString()]
            }))
        };
    }
};


exports.calculateTotalPrice = (foundBooks, bookCounts) => {
    return foundBooks.reduce((total, book) => total + book.price * bookCounts[book._id.toString()], 0);
};



exports.updateStock = async (foundBooks, bookCounts) => {
    await Promise.all(foundBooks.map(async (book) => {
        book.quantity -= bookCounts[book._id.toString()];
        book.available = book.quantity > 0;
        await book.save();
    }));
};