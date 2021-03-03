import User from './user';
class Hydration extends User {
  constructor(userData, data, userRepository) {
    super(userData);
    this.date = data.date;
    this.ounces = data.numOunces;
    this.parentUser = userRepository.getUser(this.id)
    this.updateHydration(this.parentUser);
  }

  updateHydration(user) {
    const hydrationDataCheck =
    user.hydrationData.find(hydrationObj => hydrationObj[this.date]);
    if (!hydrationDataCheck) {
      user.hydrationData.unshift(this);
      const mappedHydrationData = user.hydrationData.map(hydration => {
        const newObj = {};
        newObj[hydration.date] = hydration.ounces
        return newObj;
      })
      const totalOunces = mappedHydrationData.reduce((numAcc, hydrationObj) => {
        numAcc += Object.values(hydrationObj)[0];
        return numAcc;
      }, 0);
      user.ouncesAverage = Math.round(totalOunces / user.hydrationData.length);
    }

  }

  addDailyOunces(date) {
    let dataSet = this.parentUser.hydrationData;
    let sortedData = dataSet.sort((a, b) => {
      return b.date - a.date
    })
    let startingDateIndex =
    sortedData.findIndex(hydration => hydration.date === date);
    let day1 = sortedData[startingDateIndex + 6];
    let day2 = sortedData[startingDateIndex + 5];
    let day3 = sortedData[startingDateIndex + 4];
    let day4 = sortedData[startingDateIndex + 3];
    let day5 = sortedData[startingDateIndex + 2];
    let day6 = sortedData[startingDateIndex + 1];
    let day7 = sortedData[startingDateIndex]
    let lastWeek = [day7, day6, day5, day4, day3, day2, day1]
    return lastWeek;
  }
}

export default Hydration;
