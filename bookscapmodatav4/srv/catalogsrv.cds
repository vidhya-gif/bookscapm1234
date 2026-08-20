using {bookscapmmodel.db as b} from '../db/bookscapmmodel';

service BooksLibSrv{
     //@odata.draft.enabled
    entity BooksSet as projection on b.Books;
   
   entity GenderVHSet as projection on b.GenderVH;
   entity AgeGroupVHSet as projection on b.AgeGroupVH; 
   entity ChapterSet as projection on b.Chapters;

}

annotate BooksLibSrv.BooksSet with @(
    UI:{
        LineItem : [
            {Value : title, Label : 'Title'},
            {Value : author, Label: 'Author'},
            {Value : price, Label : 'Price'},
            {Value : publishedDate, Label : ' Publication Date'},
            {Value :gender,Label:'Gender'},
            {Value : ageGroup, Label: 'Age Group'},

        ],
        SelectionFields : [
            title,author,price,gender,ageGroup,publishedDate
        ],
        HeaderInfo: {
            $Type : 'UI.HeaderInfoType',
            TypeName : 'Books',
            Title : {Value: title},
            Description : {Value: author}
        },
        Facets : [
            {
                $Type : 'UI.ReferenceFacet',
                Label : 'General Information',
                Target : '@UI.FieldGroup#General'
            },
            {
                $Type : 'UI.ReferenceFacet',
                Label : 'Publication Details',
                Target : '@UI.FieldGroup#Publication'
            },
            {
                $Type : 'UI.ReferenceFacet',
                Label : 'Pricing',
                Target : '@UI.FieldGroup#Pricing'
            }
  
        ],
        FieldGroup #General :{
            Data : [
                {Value: title},
                {Value : author},
                {Value : gender},
                {Value : ageGroup}
            ]
        },
        FieldGroup #Publication: {
            Data:[
                {Value:publishedDate}
            ]
        },
        FieldGroup #Pricing: {
            Data: [
                {Value: price}
            ]
        }
    }
); 

annotate BooksLibSrv.BooksSet with {
    gender @(
        Common.ValueList : {           
            CollectionPath : 'GenderVHSet',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : gender,
                    ValueListProperty : 'code',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'text'
                }
            ]
        }
    );
   ageGroup @(
       Common.ValueList : {
        CollectionPath : 'AgeGroupVHSet',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : ageGroup,
                ValueListProperty : 'code',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'text'
            }
        ]
      
     }
   ) 

};