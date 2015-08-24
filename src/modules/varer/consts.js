import Immutable from 'immutable'

export const outdatedOptions = Immutable.fromJS({
  ignore: {
    text: 'Show all products',
    filter: product => true
  },
  only: {
    text: 'Show only outdated products',
    filter: product => product.get('status') === 'OLD'
  },
  none: {
    text: 'Hide outdated products',
    filter: product => product.get('status') !== 'OLD'
  }
})

export const outdatedOptionsDefault = 'none'
