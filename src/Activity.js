import User from './User'
class Activity extends User {
  constructor(userData, data, userRepository) {
    super(userData);
    this.date = data.date;
    this.steps = data.numSteps;
    this.minutesActive = data.minutesActive;
    this.flightsOfStairs = data.flightsOfStairs;
    this.milesWalked = 0;
    this.reachedStepGoal = null;
    this.parentUser = userRepository.getUser(this.id)
    this.updateActivities(this.parentUser);
  } 
  
  updateActivities() {
    const activityDataCheck = 
    this.activityData.record.find(hydrationObj => hydrationObj[this.date]);
    
    if (!activityDataCheck) {
      this.parentUser.activityData.record.unshift(this);
    }

    if (this.steps >= this.parentUser.dailyStepGoal &&
      !this.parentUser.activityData.accomplishedDays.includes(this.date)) {
      this.parentUser.activityData.accomplishedDays.unshift(this.date);
    }

  }
  calculateMiles() {
    return Math.round(this.steps * this.strideLength / 5280).toFixed(1);
  }
  compareStepGoal() {
    let userStepGoal = this.dailyStepGoal;
    this.reachedStepGoal = this.steps >= userStepGoal;
  }

}

export default Activity;
