sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'bookscapmv4listreport',
            componentId: 'BooksSetList',
            contextPath: '/BooksSet'
        },
        CustomPageDefinitions
    );
});