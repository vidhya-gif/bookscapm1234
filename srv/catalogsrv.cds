using {db.books as mybook } from '../db/booksdatamodel';

service LibrarySrv {

entity BooksSet as projection on mybook.Books;
    

}
