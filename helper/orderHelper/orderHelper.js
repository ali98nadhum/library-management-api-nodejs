
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