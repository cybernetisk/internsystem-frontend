import '../../../../angular_common/ParamsHelper'
import {getService as VaretellingerService} from '../VaretellingerService'

export default function ($scope, ParamsHelper) {
  let helper = ParamsHelper.track($scope,
    ['page'],
    {'salgskalkyler.pagination.page': 'page'},
      params => {
      this.items = null

      VaretellingerService().query(params, res => {
        this.items = res.results
        this.pagination = res.pagination
        $scope.$apply()
      })
    }
  )

  helper.run()
}
