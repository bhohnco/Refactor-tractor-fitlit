import { expect } from 'chai';

import User from '../src/User';
import Activity from '../src/Activity'
import UserRepository from '../src/UserRepository'
import {users, activities} from './User-test-data.js'

describe.only('User', function() {
  let user;
  let activity1;
  let activity2;
  let activity3;
  let userRepository;
  beforeEach(() => {
    userRepository = new UserRepository()
    user = new User(users[0])
    userRepository.users.push(user);
    activity1 = new Activity(user, user, userRepository);
    activity2 = new Activity(user,  user, userRepository);
  })
  it('should be a function', function() {
    expect(User).to.be.a('function');
  });
  it('should be an instance of user', function() {
    expect(user).to.be.an.instanceof(User);
  });
  it('should have an id', function() {
    expect(user.id).to.equal(1);
  });
  it('should have a name', function() {
    expect(user.name).to.equal('Luisa Hane');
  });
  it('should have an address', function() {
    expect(user.address).to.equal('15195 Nakia Tunnel, Erdmanport VA 19901-1697');
  });
  it('should have an email address', function() {
    expect(user.email).to.equal('Diana.Hayes1@hotmail.com');
  });
  it('should have a stride length', function() {
    expect(user.strideLength).to.equal(4.3);
  });
  it('should have a daily step goal', function() {
    expect(user.dailyStepGoal).to.equal(10000);
  });
  it('should have friends', function() {
    expect(user.friends).to.deep.equal([16, 4, 8])
  });
  it('should have a default ouncesAverage of 0', function() {
    expect(user.ouncesAverage).to.equal(0);
  });
  it('should have a default ouncesRecord of []', function() {
    let user = new User(users[0])
    expect(user.hydrationData).to.deep.equal([]);
  });
  it('should have a default hoursSleptAverage of 0', function() {
    expect(user.hoursSleptAverage).to.equal(0);
  });
  it('should have a default sleepQualityAverage of 0', function() {
    expect(user.sleepQualityAverage).to.equal(0);
  });
  it('should have a default sleepHoursRecord of []', function() {
    expect(user.sleepHoursRecord).to.deep.equal([]);
  });
  it('should have a default sleepQualityRecord of []', function() {
    expect(user.sleepQualityRecord).to.deep.equal([]);
  });
  it('should have a default activityData of []', function() {
    let user = new User(users[0])
    expect(user.activityData).to.deep.equal([]);
  });
  it('should have a default value of [] for accomplishedDays', function() {
    expect(user.accomplishedDays).to.deep.equal([]);
  });
  it('should have a default value of [] for trendingStepDays', function() {
    expect(user.trendingStepDays).to.deep.equal([]);
  });
  it('should have a default value of [] for trendingStairsDays', function() {
    expect(user.trendingStairsDays).to.deep.equal([]);
  });
  it('getFirstName should return the first name of the user', function () {
    expect(user.getFirstName()).to.equal('LUISA');
  });
  describe('updateSleep', function() {
    beforeEach(() => {
      user.updateSleep("2019/06/15", 7, 4.7);
      user.updateSleep("2019/07/14", 6, 4);
      user.updateSleep("2019/08/04", 8, 5.4);
    })
    it('should update user\'s quality of sleep record', function() {
      expect(user.sleepQualityRecord.length).to.equal(3);
    });
    it('should update user\'s average hours of sleep', function() {
      expect(user.hoursSleptAverage).to.equal('7.0');
    });
    it('should update user\'s average quality of sleep', function() {
      expect(user.sleepQualityAverage).to.equal('4.7');
    });
  })

  describe('calculateAverageThisWeek', function() {

    it('should calculate average sleep hours for week before given date', function() {
      user.sleepHoursRecord = [{date: "2019/09/22", hours: 9.6}, {date: "2019/09/21", hours: 8.2}, {date: "2019/09/20", hours: 9.9}, {date: "2019/09/19", hours: 4.2}, {date: "2019/09/18", hours: 9.5}, {date: "2019/09/17", hours: 7.8}, {date: "2019/09/16", hours: 10.2}, {date: "2019/09/15", hours: 5.7}, {date: "2019/09/14", hours: 8.8}, {date: "2019/09/13", hours: 4.6}, {date: "2019/09/12", hours: 5.3}];
      expect(user.calculateAverageThisWeek('2019/09/21', 'sleepHoursRecord', 'hours', 1)).to.equal('7.9');
    });

    it('should calculate average quality of sleep for week before a given date', function() {
      user.sleepQualityRecord = [{date: "2019/09/22", quality: 9.6}, {date: "2019/09/21", quality: 8.2}, {date: "2019/09/20", quality: 9.9}, {date: "2019/09/19", quality: 4.2}, {date: "2019/09/18", quality: 9.5}, {date: "2019/09/17", quality: 7.8}, {date: "2019/09/16", quality: 10.2}, {date: "2019/09/15", quality: 5.7}, {date: "2019/09/14", quality: 8.8}, {date: "2019/09/13", quality: 4.6}, {date: "2019/09/12", quality: 5.3}];
      expect(user.calculateAverageThisWeek('2019/09/22', 'sleepQualityRecord', 'quality', 1)).to.equal('8.5')
    });

    it('should calculate the average minutes active', function() {
      user.activityRecord = [{date: "2019/09/18", minutesActive: 78}, {date: "2019/09/17", minutesActive: 100}, {date: "2019/09/16", minutesActive: 20}, {date: "2019/09/15", minutesActive: 21}, {date: "2019/09/14", minutesActive: 35}, {date: "2019/09/13", minutesActive: 37}, {date: "2019/06/12", minutesActive: 42}, {date: "2019/09/11", minutesActive: 18}, {date: "2019/09/10", minutesActive: 16}, {date: "2019/09/09", minutesActive: 81}];
      expect(user.calculateAverageThisWeek("2019/09/17", 'activityRecord', 'minutesActive', 0)).to.equal('39')
    });

    it('should calculate the average steps taken in a given week', function() {
      user.activityRecord = [{date: "2019/09/18", steps: 1178}, {date: "2019/09/17", steps: 1080}, {date: "2019/09/16", steps: 120}, {date: "2019/09/15", steps: 891}, {date: "2019/09/14", steps: 380}, {date: "2019/09/13", steps: 3234}, {date: "2019/06/12", steps: 1111}, {date: "2019/09/11", steps: 18}, {date: "2019/09/10", steps: 345}, {date: "2019/09/09", steps: 81}];
      expect(user.calculateAverageThisWeek("2019/09/17", 'activityRecord', 'steps', 0)).to.equal('976')
    });

    it('should calculate the average flights of stairs taken in a given week', function() {
      user.activityRecord = [{date: "2019/09/18", flightsOfStairs: 4}, {date: "2019/09/17", flightsOfStairs: 6}, {date: "2019/09/16", flightsOfStairs: 1}, {date: "2019/09/15", flightsOfStairs: 2}, {date: "2019/09/14", flightsOfStairs: 12}, {date: "2019/09/13", flightsOfStairs: 21}, {date: "2019/06/12", flightsOfStairs: 3}, {date: "2019/09/11", flightsOfStairs: 14}, {date: "2019/09/10", flightsOfStairs: 2}, {date: "2019/09/09", flightsOfStairs: 8}];
      expect(user.calculateAverageThisWeek("2019/09/17", 'activityRecord', 'flightsOfStairs', 1)).to.equal('8.4')
    });

  })
  
  it('should have a method that return the highest climbing record', function() {
    let user = new User(users[0])
    user.activityData.push(...activities[3])
    expect(user.findClimbingRecord()).to.equal(16)
  });
  it('should have a method that calculates daily calories burned', function() {
    user.activityData = [{date: "2019/09/16", activityRecord: 78}, {date: "2019/09/17", minutesActive: 100}, {date: "2019/09/17", minutesActive: 20}];
    expect(user.calculateDailyCalories("2019/09/17")).to.equal(912)
  });

  it('findTrendingStepDays should find 3+ days with positive trend', function() {
    user.activityData = [...activities[2]];
    user.findTrendingStepDays()
    expect(user.trendingStepDays).to.deep.equal(['Your most recent positive step streak was 2019/06/26 - 2019/06/29!', 'Your most recent positive step streak was 2019/06/21 - 2019/06/24!']);
  });
  it('findTrendingStairsDays should find 3+ days with positive trend', function() {
    user.activityData = [...activities[3]];
    user.findTrendingStairsDays()
    expect(user.trendingStairsDays).to.deep.equal(['Your most recent positive climbing streak was 2019/06/26 - 2019/06/29!', 'Your most recent positive climbing streak was 2019/06/19 - 2019/06/24!']);
  });
  it('findFriendsNames should find the first names of friends', function() {
    let user2 = new User(activities[7][0]);
    let user3 = new User(activities[7][1]);
    let user4 = new User(activities[7][2]);
    let users = [user2, user3, user4];
    user.findFriendsNames(users);
    expect(user.friendsNames).to.deep.equal(['BEN', 'JOHN', 'NICK']);
  });
  it('calculateTotalStepsThisWeek should add users steps for week', function() {
    user.activityData = [...activities[6]]
    user.calculateTotalStepsThisWeek('2019/06/28');
    expect(user.totalStepsThisWeek).to.equal(42);
  });
  describe.only('findFrientsTotalStepsForWeek',() => {

    it('should be able to find a friends weekly steps', function() {
      let user2 = new User(activities[7][0]);
      let user3 = new User(activities[7][1]);
      let user4 = new User(activities[7][2]);
      user2.activityRecord = [...activities[4]];
      user3.activityRecord = [...activities[5]];
      user4.activityRecord = [...activities[6]];
      let users = [user2, user3, user4];
      user.findFriendsTotalStepsForWeek(users, '2019/06/29');
      expect(user.friendsActivityRecords[0].totalWeeklySteps).to.deep.equal(734);
    });
    it('should add you to your friends list to compare weekly steps', () => {
      let user2 = new User(activities[7][0]);
      let user3 = new User(activities[7][1]);
      let user4 = new User(activities[7][2]);
      user2.activityRecord = [...activities[4]];
      user3.activityRecord = [...activities[5]];
      user4.activityRecord = [...activities[6]];
      let users = [user2, user3, user4];
      user.findFriendsTotalStepsForWeek(users, '2019/06/29');
      expect(user.friendsActivityRecords[3].firstName).to.deep.equal('YOU')
    })
  })
});
    