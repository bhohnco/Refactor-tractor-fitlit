import { expect } from 'chai';

import Hydration from '../src/Hydration';
import UserRepository from '../src/UserRepository';
import User from '../src/User';
import hydrationTestData from './Hydration-test-data'

describe.only('Hydration', function() {
  let user1;
  let user2;
  let hydrate1;
  let hydrate2;
  let doubleHydrate;
  let userRepository;
  beforeEach(() => {
    user1 = new User(hydrationTestData[0][0]);
    user2 = new User(hydrationTestData[0][1]);
    userRepository = new UserRepository();
    userRepository.users.push(user1, user2);
    hydrate1 = new Hydration(user1, hydrationTestData[1][0], userRepository);
    hydrate2 = new Hydration(user2, hydrationTestData[1][1], userRepository);
    userRepository.users.push(user1, user2);
    doubleHydrate = hydrationTestData[1][2];
    user2.hydrationData.push(doubleHydrate)
  })
  it('should be an instance of hydrate', function() {
    expect(hydrate1).to.be.an.instanceof(Hydration);
  });
  it('should have an id', function() {
    expect(hydrate2.id).to.equal(2);
  });
  it('should have a date', function() {
    expect(hydrate2.date).to.equal('2019/06/15');
  });
  it('should have an amount of ounces drank', function() {
    expect(hydrate2.ounces).to.equal(75);
  });
  describe('drink', function () {
    it.only('should update the average number of ounces over all time', function() {
      console.log(user2.hydrationData)
      hydrate2.updateHydration(user2);
      expect(user2.ouncesAverage).to.equal(83);
    })
    it('should add the date and amount to the object record', function() {
      expect(user1.ouncesRecord).to.deep.equal([{"2019/06/15": 37}])
      expect(user2.ouncesRecord.length).to.equal(2)
    })
  });
});
