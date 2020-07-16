import reducer from './dataSet'
import store from './dataSet'

describe('dataSet reducer', () => {
  it('should be able to read data from our trips.js file', () => {
    expect(reducer(undefined, {})).toEqual({
      trips: [{
        id: 1,
        start: 'Auckland',
        end: 'Thames',
        activity: 'Walk',
        drivetime: 2
      },
      {
        id: 2,
        start: 'Auckland',
        end: 'Raglan',
        activity: 'Beach',
        drivetime: 2.5
      },
      {
        id: 3,
        start: 'Auckland',
        end: 'Whangarei',
        activity: 'Bike',
        drivetime: 2.5
      }]
    })
  })
})

describe('the store in our dataSet reducer', () => {
  it('returns an object with our data from trip.js', () => {
    expect(store(undefined, {})).toEqual({
      trips: [{
        id: 1,
        start: 'Auckland',
        end: 'Thames',
        activity: 'Walk',
        drivetime: 2
      },
      {
        id: 2,
        start: 'Auckland',
        end: 'Raglan',
        activity: 'Beach',
        drivetime: 2.5
      },
      {
        id: 3,
        start: 'Auckland',
        end: 'Whangarei',
        activity: 'Bike',
        drivetime: 2.5
      }]
    })
  })
})
