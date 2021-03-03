import { expect } from 'chai';

import Hydration from '../src/Hydration';
import UserRepository from '../src/UserRepository';
import User from '../src/User';
import hydrationTestData from './Hydration-test-data'

describe('Hydration', function() {
  let user1;
  let user2;
  let hydrate1;
  let hydrate2;
  let hydrate3;
  let hydrate4;
  let hydrate5;
  let hydrate6;
  let hydrate7;
  let hydrate8;
  let hydrate9;
  let hydrate10;
  let userRepository;
  beforeEach(() => {
    user1 = new User(hydrationTestData[0][0]);
    user2 = new User(hydrationTestData[0][1]);
    userRepository = new UserRepository();
    userRepository.users.push(user1, user2);
    hydrate1 = new Hydration(user1, hydrationTestData[1][0], userRepository);
    hydrate2 = new Hydration(user2, hydrationTestData[1][1], userRepository);
    hydrate3 = new Hydration(user2, hydrationTestData[1][2], userRepository);
    hydrate4 = new Hydration(user2, hydrationTestData[1][3], userRepository);
    hydrate5 = new Hydration(user2, hydrationTestData[1][4], userRepository);
    hydrate6 = new Hydration(user2, hydrationTestData[1][5], userRepository);
    hydrate7 = new Hydration(user2, hydrationTestData[1][6], userRepository);
    hydrate8 = new Hydration(user2, hydrationTestData[1][7], userRepository);
    hydrate9 = new Hydration(user2, hydrationTestData[1][8], userRepository);
    hydrate10 = new Hydration(user2, hydrationTestData[1][9], userRepository)
    userRepository.users.push(user1, user2);
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
  it('addDailyOunces should show the last week of water', function() {
    expect(hydrate2.addDailyOunces("2019/06/23")).to.have.lengthOf(7);
    expect(hydrate2.addDailyOunces("2019/06/23")[0].ounces).to.deep.equal(41)
  });
  it('should add itself to the users hydration data upon instantiation', () => {
    expect(user1.hydrationData[0]).to.be.instanceof(Hydration)
    expect(user1.hydrationData.length).to.equal(1)
  });
  describe('drink', function () {
    it('should update the average number of ounces over all time', function() {
      user2.hydrationData = [hydrate2, hydrate3]

      hydrate2.updateHydration(user2);
      hydrate3.updateHydration(user2)

      expect(user2.ouncesAverage).to.equal(83);
    })
  })
});
