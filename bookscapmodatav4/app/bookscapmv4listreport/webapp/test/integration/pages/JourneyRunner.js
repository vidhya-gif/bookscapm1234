sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"bookscapmv4listreport/test/integration/pages/BooksSetList",
	"bookscapmv4listreport/test/integration/pages/BooksSetObjectPage",
	"bookscapmv4listreport/test/integration/pages/ChapterSetObjectPage"
], function (JourneyRunner, BooksSetList, BooksSetObjectPage, ChapterSetObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('bookscapmv4listreport') + '/test/flpSandbox.html#bookscapmv4listreport-tile',
        pages: {
			onTheBooksSetList: BooksSetList,
			onTheBooksSetObjectPage: BooksSetObjectPage,
			onTheChapterSetObjectPage: ChapterSetObjectPage
        },
        async: true
    });

    return runner;
});

