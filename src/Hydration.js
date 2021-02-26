import User from './user';
class Hydration extends User {
  constructor(userData, data, userRepository) {
    super(userData);
    this.date = data.date;
    this.ounces = data.numOunces;
    this.drink(userRepository);
  }
  drink(userRepo) {
    const parentUser = userRepo.users.find(user => {
      return user.id === this.id;
    })
    this.updateHydration(parentUser);
  }

  updateHydration(user) {
    const hydrationDataCheck = 
    user.hydrationData.find(hydrationObj => hydrationObj[this.date]);
    
    if (!hydrationDataCheck) {
      user.hydrationData.unshift({[this.date]: this.ounces});
      console.log(user.hydrationData)
      const totalOunces = user.hydrationData.reduce((numAcc, hydrationObj) => {
        numAcc += Object.values(hydrationObj)[0];
        return numAcc;
      }, 0);
      user.ouncesAverage = Math.round(totalOunces / user.hydrationData.length);
    }

  }   
  

  addDailyOunces(date) {
    return this.ouncesRecord.reduce((sum, record) => {
      let amount = record[date];
      if (amount) {
        sum += amount
      }
      return sum
    }, 0)
  }
}

export default Hydration;
