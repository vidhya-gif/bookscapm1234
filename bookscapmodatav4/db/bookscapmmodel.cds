namespace bookscapmmodel.db;

entity GenderVH {
    key code : String;
    text : String;
}

entity AgeGroupVH{
    key code : String;
    text : String;
}
type allgenders : String enum{
    Male = 'M';
    Female = 'F';
}

type booksagegroup : String enum{
     KIDS = 'kids';
     ADULTS = 'Adults';
}

entity Books{
    key ID : UUID;
    title : String;
    author : String;
    price : Decimal(10,2);
    publishedDate : DateTime;
    gender : allgenders;
    ageGroup: booksagegroup;
    
   chapters : Composition of many Chapters on chapters.books = $self;
}

entity Chapters{
    key ID  : UUID;
    title : String;
    pages : Integer;

    books: Association to Books;
}