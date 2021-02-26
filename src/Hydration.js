import User from './user';
class Hydration extends User {
  constructor(userData, data, userRepository) {
    super(userData);
    this.date = data.date;
    this.ounces = data.numOunces;
    console.log(this)
    this.drink(userRepository);
  }
  drink(userRepo) {
    const parentUser = userRepo.users.find(user => {
      return user.id === this.id;
    })
    parentUser.updateHydration(this.date, this.ounces);
  }
}

export default Hydration;
