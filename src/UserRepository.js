import sleepData from './data/sleep';

class UserRepository {
  constructor() {
    this.users = [];
  }

  getUser(id) {
    return this.users.find(function(user) {
      return user.id === id;
    })
  }

  calculateAverageStepGoal() {
    let goals = this.users.map(function(user) {
      return user.dailyStepGoal;
    });
    let total = goals.reduce(function(sum, goal) {
      sum += goal;
      return sum;
    }, 0);
    return total / this.users.length;
  }

  calculateAverageSleepQuality() {
    let totalSleepQuality = this.users.reduce((sum, user) => {
      sum += user.sleepQualityAverage;
      return sum;
    }, 0);
    return totalSleepQuality / this.users.length;
  }

  findDate(date, prop = 'activityData') {
    let datelist = this.users.map(user => {
      return user[prop].filter(item => {
        return item.date === date;
      });
    })
    return datelist;
  }

  calculateAverageActivity(date, listItemKey) {
    let dateList = this.findDate(date);
    let sum =  dateList.reduce((total, activityCollection) => {
      activityCollection.forEach(activity => {
        total += activity[listItemKey]
      })
      return total;
    }, 0);
    return Math.round(sum / dateList.length);
  }

  calculateAverageDailyWater(date) {
    let todaysDrinkers = this.findDate(date, 'hydrationData');
    let sumDrankOnDate = todaysDrinkers.reduce((sum, drinker) => {
      return sum += drinker[0].ounces;
    }, 0)

    return Math.floor(sumDrankOnDate / todaysDrinkers.length);
  }

  findBestSleepers(date) {
    return this.users.filter(user => {
      return user.calculateAverageThisWeek(date, 'sleepQualityRecord', 'quality', 1);
    })
  }

  getLongestSleepers(date, sleepData) {
    return sleepData.filter(sleep => {
      return sleep.date === date;
    }).sort((a, b) => {
      return b.hoursSlept - a.hoursSlept;
    })[0].userID;
  }

  getWorstSleepers(date, sleepData) {
    return sleepData.filter(sleep => {
      return sleep.date === date;
    }).sort((a, b) => {
      return a.hoursSlept - b.hoursSlept;
    })[0].userID;
  }

}

export default UserRepository;
// ---- OLD CODE ----

  // calculateAverageSteps(date) {
  //   let allUsersStepsCount = this.users.map(user => {
  //     return user.activityRecord.filter(activity => {
  //       return activity.date === date;
  //     });
  //   })
  //   let sumOfSteps = allUsersStepsCount.reduce((stepsSum, activityCollection) => {
  //     activityCollection.forEach(activity => {
  //       stepsSum += activity.steps
  //     })
  //     return stepsSum;
  //   }, 0);
  //   return Math.round(sumOfSteps / allUsersStepsCount.length);
  // }

  // calculateAverageStairs(date) {
  //   let allUsersStairsCount = this.users.map(user => {
  //     return user.activityRecord.filter(activity => {
  //       return activity.date === date;
  //     });
  //   })
  //   let sumOfStairs = allUsersStairsCount.reduce((stairsSum, activityCollection) => {
  //     activityCollection.forEach(activity => {
  //       stairsSum += activity.flightsOfStairs
  //     })
  //     return stairsSum;
  //   }, 0);
  //   return Math.round(sumOfStairs / allUsersStairsCount.length);
  // }

  // calculateAverageMinutesActive(date) {
  //   let allUsersMinutesActiveCount = this.users.map(user => {
  //     return user.activityRecord.filter(activity => {
  //       return activity.date === date;
  //     });
  //   })
  //   let sumOfMinutesActive = allUsersMinutesActiveCount.reduce((minutesActiveSum, activityCollection) => {
  //     activityCollection.forEach(activity => {
  //       minutesActiveSum += activity.todayDate
  //     })
  //     return minutesActiveSum;
  //   }, 0);
  //   return Math.round(sumOfMinutesActive / allUsersMinutesActiveCount.length);
  // }
