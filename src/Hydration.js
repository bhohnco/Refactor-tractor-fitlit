import User from './user';
class Hydration extends User {
  constructor(userData, data, userRepository) {
    super(userData);
    this.date = data.date;
    this.ounces = data.numOunces;
    this.parentUser = userRepository.getUser(this.id)
    this.updateHydration(this.parentUser);
  }
  // drink() {
  //   this.updateHydration(this.parentUser);
  // }

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
    const filteredHydrationData = 
    this.parentUser.hydrationData.filter(hydration => {
      if (hydration.date > date) {
        const newObj = {};
        newObj[hydration.date] = hydration.ounces
        return newObj;
      }
    })
    console.log()
    return this.getSumByDate(filteredHydrationData, date, 7)
  }
}

export default Hydration;
