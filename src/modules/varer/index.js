import './app.scss'

module.exports = 'cyb.varer';

(function() {
    'use strict';

    require('ngReact');

    var module = angular.module('cyb.varer', [
        require('ui.router'),
        require('angular-resource'),
        'react'
    ]);

    require('./index/VarerIndexController');
    require('./common/CompileDirective');
    require('./common/prisdato.directive.js');
    require('./common/components/PrisDato');
    require('./common/prismargin.directive.js');
    require('./common/components/PrisMargin');
    require('./common/components/VareMengde');
    require('./common/VarerHelper');

    require('./kontoer/KontoerController');
    require('./kontoer/KontoerItemController');
    require('./kontoer/KontoerService');

    require('./leverandører/LeverandørerController');
    require('./leverandører/LeverandørerService');

    require('./råvarer/RåvarerController');
    require('./råvarer/RåvarerEditController');
    require('./råvarer/RåvarerIndexListView');
    require('./råvarer/RåvarerItemController');
    require('./råvarer/RåvarerService');

    require('./salgskalkyler/SalgskalkylerController');
    require('./salgskalkyler/SalgskalkylerService');

    require('./salgsvarer/SalgsvarerController');
    require('./salgsvarer/SalgsvarerIndexListView');
    require('./salgsvarer/SalgsvarerService');

    require('./varetellinger/VaretellingerController');
    require('./varetellinger/VaretellingerItemController');
    require('./varetellinger/VaretellingerItemListView');
    require('./varetellinger/VaretellingerItemNewVare');
    require('./varetellinger/VaretellingerService');
    require('./varetellinger/VaretellingVareService');

})();
