import {price} from '../../../services/FormatService'

import PrisMargin from '../common/components/PrisMargin'

export function renderInternalPrice(item) {
  return renderPrice(item, 'pris_intern', 'See normal')
}

export function renderNormalPrice(item) {
  return renderPrice(item, 'pris_ekstern', 'No sales')
}

function renderPrice(item, pricePropertyName, noPriceText) {
  if (!item.get('salgspris') || !item.get('salgspris').get(pricePropertyName)) {
    return noPriceText
  }

  return (
    <span>
      {price(item.get('salgspris').get(pricePropertyName), 0)}
      {renderMargin(item, item.get('salgspris').get(pricePropertyName))}
    </span>
  )
}

function renderMargin(item, price) {
  if (item.get('innpris')) {
    return [
      <br/>,
      <PrisMargin innPris={item.get('innpris')}
        utPris={price}
        utMva={item.get('salgspris').get('mva')}/>
    ]
  }
}
