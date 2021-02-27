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
    const dataSet = this.parentUser.hydrationData
    const startingDateObj = dataSet.find(hydration => hydration.date === date)
    const filteredHydrationData = 
    dataSet.filter(hydration => {
      if ((dataSet.indexOf(hydration) - dataSet.indexOf(startingDateObj) <= 7)) {
        const newObj = {};
        newObj[hydration.date] = hydration.ounces
        return newObj;
      }
    })
    return this.getSumByDate(filteredHydrationData, 'ounces', 7)
  }
}

export default Hydration;
