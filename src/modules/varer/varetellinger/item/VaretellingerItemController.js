import Immutable from 'immutable'

import {getInventoryItems, fillBuyPrice, fillSellPrice} from '../../inventoryItems/service'
import {getService as VaretellingerService} from '../VaretellingerService'
import {getService as VaretellingVareService} from '../item/VaretellingVareService'

import * as VarerHelper from '../../common/VarerHelper'

export default function ($rootScope, $filter, $scope, $stateParams) {
  "ngInject"
  var self = this

  this.raavarer = null

  this.vis_options = {
    ALT: 'Show all raw materials',
    TELLING: 'Show only raw materials counted',
    GRUPPER: 'Show only groups'
  }
  this.vis_varer = 'ALL'

  this.newitem_place = null
  this.newitems = {}
  this.newitemscount = 0

  var newItem = function (raavare) {
    var item = this
    this.remove = function () {
      self.newitems[raavare.id] = self.newitems[raavare.id].filter(function (row) {
        return item != row
      })
      if (self.newitems[raavare.id].length == 0) {
        delete self.newitems[raavare.id]
      }
      self.newitemscount--
      $scope.$digest() // FIXME: some strange bug here, seems like digest is called on first call but not the next ones
    }
    this.store = function (data) {
      data.raavare = raavare.id
      data.varetelling = self.data.id
      self.newitem_place = data.sted

      var x = new (VaretellingVareService())(data)
      x.$save(function (res) {
        raavare.tellinger.push(res)
        addTellingSummer(raavare, res)
        $('#frisok').focus()
        item.remove()
      }, function (err) {
        alert(err.data.detail)
      })
      console.log("store request", x)
    }
  }

  this.newItem = function (raavare) {
    self.newitemscount++
    self.newitems[raavare.id] = self.newitems[raavare.id] || []
    self.newitems[raavare.id].push(new newItem(raavare))
    $scope.$digest() // FIXME: some strange bug here, seems like digest is called on first call but not the next ones
  }

  this.varefilter = {
    'text': $stateParams['q'],
    'group': $stateParams['group']
  }
  var filter = VarerHelper.createFilter(
    $scope,
    self.varefilter,
    'ctrl.varefilter',
    'innkjopskonto',
    function () {
      return self.raavarer
    },
    function (res) {
      self.raavarerfiltered = res
    }
  )

  var addTellingSummer = function (raavare, telling) {
    telling.summer = raavare.innkjopskonto.summer.new()
    if (raavare.innpris) {
      telling.summer.add(
        telling.antall,
        raavare.innpris.pris * telling.antall,
        raavare.innpris.pant * (telling.antallpant || Math.ceil(telling.antall))
      )
    }
  }

  var parseData = function () {
    self.summer = new (VaretellingerService()).makeSummer()
    self.raavarer = []

    var kontoer = {}
    raw_raavarer.forEach(function (raavare) {
      // sørg for at samme innkjøpskontoer peker på samme objekt
      var konto = kontoer[raavare.innkjopskonto.id]
      if (!konto) {
        konto = kontoer[raavare.innkjopskonto.id] = Object.create(raavare.innkjopskonto)
        konto.summer = self.summer.new()
      }
      raavare.innkjopskonto = konto

      // koble sammen tellinger med råvarene
      raavare.tellinger = raw_tellinger[raavare.id] || []
      raavare.tellinger.forEach(function (telling) {
        addTellingSummer(raavare, telling)
      })

      self.raavarer.push(raavare)
    })

    self.groups = VarerHelper.extractGroups(self.raavarer, 'innkjopskonto')
    filter()
  }

  var raw_raavarer
  var raw_tellinger

  VaretellingerService().get({id: $stateParams['id']}, function (res) {
    self.data = res

    raw_tellinger = {}
    res.varer.forEach(function (item) {
      raw_tellinger[item.raavare] = raw_tellinger[item.raavare] || []
      raw_tellinger[item.raavare].push(item)
    })

    console.log(raw_tellinger)

    // TODO: should not do any pagination here, it might corrupt the result
    getInventoryItems(1).then(res => {
      let date = self.data.tid ? new Date(self.data.tid) : null
      raw_raavarer = Immutable.fromJS(res.results)
        .map(item => fillBuyPrice(item, date))
        .map(item => fillSellPrice(item, date))
        .sort(VarerHelper.getSorterImmutable('innkjopskonto', true)).toJS()
      parseData()
      $scope.$apply()
    })

    $scope.$apply()
  })
}
