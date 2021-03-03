import UserRepository from './UserRepository'
class User extends UserRepository {
  constructor(userData) {
    super();
    this.id = userData.id;
    this.name = userData.name;
    this.address = userData.address;
    this.email = userData.email;
    this.strideLength = userData.strideLength;
    this.dailyStepGoal = userData.dailyStepGoal;
    this.totalStepsThisWeek = 0;
    this.friends = userData.friends;
    this.hydrationData = [];
    this.ouncesAverage = 0;
    this.hoursSleptAverage = 0;
    this.sleepQualityAverage = 0;
    this.sleepHoursRecord = [];
    this.sleepQualityRecord = [];
    this.activityData = []
    this.accomplishedDays = [];
    this.trendingStepDays = [];
    this.trendingStairsDays = [];
    this.friendsNames = [];
    this.friendsActivityRecords = []
  }

  getFirstName() {
    var names = this.name.split(' ');
    return names[0].toUpperCase();
  }

  calculateTotalStepsThisWeek(todayDate) {
    this.totalStepsThisWeek = this.activityData.reduce((sum, activity) => {
      let index = this.activityData.findIndex(activity => activity.date === todayDate);
      if (index <= this.activityData.indexOf(activity) && this.activityData.indexOf(activity) <= (index + 6)) {
        sum += activity.steps;
      }
      return sum;
    }, 0);
  }

  updateSleep(date, hours, quality) {
    this.sleepHoursRecord.unshift({
      date,
      hours
    });
    this.sleepQualityRecord.unshift({
      date,
      quality
    });
    if (this.sleepHoursRecord.length) {
      this.hoursSleptAverage = ((hours + (this.hoursSleptAverage * (this.sleepHoursRecord.length - 1))) / this.sleepHoursRecord.length).toFixed(1);
    } else {
      this.hoursSleptAverage = hours;
    }
    if (this.sleepQualityRecord.length) {
      this.sleepQualityAverage = ((quality + (this.sleepQualityAverage * (this.sleepQualityRecord.length - 1))) / this.sleepQualityRecord.length).toFixed(1);
    } else {
      this.sleepQualityAverage = quality;
    }
  }

  findClimbingRecord() {
    return this.activityData.sort((a, b) => {
      return b.flightsOfStairs - a.flightsOfStairs;
    })[0].flightsOfStairs;
  }

  findFriendsNames(users) {
    this.friends.forEach(friend => {
      this.friendsNames.push(users.find(user => user.id === friend).getFirstName());
    })
  }

  calculateDailyCalories(date) {
    let totalMinutes = this.activityData.filter(activity => {
      return activity.date === date
    }).reduce((sumMinutes, activity) => {
      return sumMinutes += activity.minutesActive
    }, 0);
    return Math.round(totalMinutes * 7.6);
  }

  updateActivities(activity) {
    this.activityData.unshift(activity);
    if (activity.numSteps >= this.dailyStepGoal) {
      this.accomplishedDays.unshift(activity.date);
    }
  }

  calculateAverageThisWeek(todayDate, userKey, objectKey, toFixNum) {
    return (this[userKey].reduce((sum, sleepAct) => {
      let index = this[userKey].indexOf(this[userKey].find(sleep => sleep.date === todayDate));
      if (index <= this[userKey].indexOf(sleepAct) && this[userKey].indexOf(sleepAct) <= (index + 6)) {
        sum += sleepAct[objectKey];
      }
      return sum;
    }, 0) / 7).toFixed(toFixNum);
  }

  findTrendingStepDays() {
    let positiveDays = [];
    this.activityData.forEach((activity, index) => {
      if (this.activityData[index + 1] && activity.steps > this.activityData[index + 1].steps) {
        positiveDays.unshift(activity.date);
      } else if (positiveDays.length > 2) {
        this.trendingStepDays.push(`Your most recent positive step streak was ${positiveDays[0]} - ${positiveDays[positiveDays.length - 1]}!`);
        positiveDays = [];
      }
    })
  }

  findTrendingStairsDays() {
    let positiveDays = [];
    this.activityData.forEach((activity, index) => {
      if (this.activityData[index + 1] && activity.flightsOfStairs > this.activityData[index + 1].flightsOfStairs) {
        positiveDays.unshift(activity.date);
      } else if (positiveDays.length > 2) {
        this.trendingStairsDays.push(`Your most recent positive climbing streak was ${positiveDays[0]} - ${positiveDays[positiveDays.length - 1]}!`);
        positiveDays = [];
      }
    })
  }

  findFriendsTotalStepsForWeek(users, date) {
    this.friends.map(friend => {
      let matchedFriend = users.find(user => user.id === friend);
      matchedFriend.calculateTotalStepsThisWeek(date);
      this.friendsActivityRecords.push(
        {
          'id': matchedFriend.id,
          'firstName': matchedFriend.name.toUpperCase().split(' ')[0],
          'totalWeeklySteps': matchedFriend.totalStepsThisWeek
        })
    })
    this.calculateTotalStepsThisWeek(date);
    this.friendsActivityRecords.push({
      'id': this.id,
      'firstName': 'YOU',
      'totalWeeklySteps': this.totalStepsThisWeek
    });
    this.friendsActivityRecords = this.friendsActivityRecords.sort((a, b) => b.totalWeeklySteps - a.totalWeeklySteps);
  }
}

export default User;
