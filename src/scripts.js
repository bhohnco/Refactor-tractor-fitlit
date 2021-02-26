import './css/base.scss';
import './css/styles.scss';
import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';

const userUrl = 'http://localhost:3001/api/v1/users';
const sleepUrl = 'http://localhost:3001/api/v1/sleep';
const activityUrl = 'http://localhost:3001/api/v1/activity';
const hydrationUrl = 'http://localhost:3001/api/v1/hydration';
const getUserData = fetch(userUrl).then(response => response.json())
const getSleepData = fetch(sleepUrl).then(response => response.json())
const getActivityData = fetch(activityUrl).then(response => response.json())
const getHydrationData = fetch(hydrationUrl).then(response => response.json())
const userRepository = new UserRepository()
let user = null;
let sleepData = [];
let activityData = [];
let hydrationData = [];
let todayDate = "2019/09/22";

// DOM ELEMENTS
const dailyOz = document.querySelectorAll('.daily-oz');
const dropdownEmail = document.querySelector('#dropdown-email');
const dropdownFriendsStepsContainer = document.querySelector('#dropdown-friends-steps-container');
const dropdownGoal = document.querySelector('#dropdown-goal');
const dropdownName = document.querySelector('#dropdown-name');
const headerName = document.querySelector('#header-name');
const hydrationCalendarCard = document.querySelector('#hydration-calendar-card');
const hydrationFriendOuncesToday = document.querySelector('#hydration-friend-ounces-today');
const hydrationFriendsCard = document.querySelector('#hydration-friends-card');
const hydrationInfoCard = document.querySelector('#hydration-info-card');
const hydrationInfoGlassesToday = document.querySelector('#hydration-info-glasses-today');
const hydrationMainCard = document.querySelector('#hydration-main-card');
const hydrationUserOuncesToday = document.querySelector('#hydration-user-ounces-today');
const mainPage = document.querySelector('main');
const profileButton = document.querySelector('#profile-button');
const sleepCalendarCard = document.querySelector('#sleep-calendar-card');
const sleepCalendarHoursAverageWeekly = document.querySelector('#sleep-calendar-hours-average-weekly');
const sleepCalendarQualityAverageWeekly = document.querySelector('#sleep-calendar-quality-average-weekly');
const sleepFriendLongestSleeper = document.querySelector('#sleep-friend-longest-sleeper');
const sleepFriendsCard = document.querySelector('#sleep-friends-card');
const sleepFriendWorstSleeper = document.querySelector('#sleep-friend-worst-sleeper');
const sleepInfoCard = document.querySelector('#sleep-info-card');
const sleepInfoHoursAverageAlltime = document.querySelector('#sleep-info-hours-average-alltime');
const sleepInfoQualityAverageAlltime = document.querySelector('#sleep-info-quality-average-alltime');
const sleepInfoQualityToday = document.querySelector('#sleep-info-quality-today');
const sleepMainCard = document.querySelector('#sleep-main-card');
const sleepUserHoursToday = document.querySelector('#sleep-user-hours-today');
const stairsCalendarCard = document.querySelector('#stairs-calendar-card');
const stairsCalendarFlightsAverageWeekly = document.querySelector('#stairs-calendar-flights-average-weekly');
const stairsCalendarStairsAverageWeekly = document.querySelector('#stairs-calendar-stairs-average-weekly');
const stepsMainCard = document.querySelector('#steps-main-card');
const stepsInfoCard = document.querySelector('#steps-info-card');
const stepsFriendsCard = document.querySelector('#steps-friends-card');
const stepsTrendingCard = document.querySelector('#steps-trending-card');
const stepsCalendarCard = document.querySelector('#steps-calendar-card');
const stairsFriendFlightsAverageToday = document.querySelector('#stairs-friend-flights-average-today');
const stairsFriendsCard = document.querySelector('#stairs-friends-card');
const stairsInfoCard = document.querySelector('#stairs-info-card');
const stairsInfoFlightsToday = document.querySelector('#stairs-info-flights-today');
const stairsMainCard = document.querySelector('#stairs-main-card');
const stairsTrendingButton = document.querySelector('.stairs-trending-button');
const stairsTrendingCard = document.querySelector('#stairs-trending-card');
const stairsUserStairsToday = document.querySelector('#stairs-user-stairs-today');
const stepsCalendarTotalActiveMinutesWeekly = document.querySelector('#steps-calendar-total-active-minutes-weekly');
const stepsCalendarTotalStepsWeekly = document.querySelector('#steps-calendar-total-steps-weekly');
const stepsFriendAverageStepGoal = document.querySelector('#steps-friend-average-step-goal');
const stepsInfoActiveMinutesToday = document.querySelector('#steps-info-active-minutes-today');
const stepsInfoMilesWalkedToday = document.querySelector('#steps-info-miles-walked-today');
const stepsFriendActiveMinutesAverageToday = document.querySelector('#steps-friend-active-minutes-average-today');
const stepsFriendStepsAverageToday = document.querySelector('#steps-friend-steps-average-today');
const stepsTrendingButton = document.querySelector('.steps-trending-button');
const stepsUserStepsToday = document.querySelector('#steps-user-steps-today');
const trendingStepsPhraseContainer = document.querySelector('.trending-steps-phrase-container');
const trendingStairsPhraseContainer = document.querySelector('.trending-stairs-phrase-container');
const userInfoDropdown = document.querySelector('#user-info-dropdown');
const friendsStepsParagraphs = document.querySelectorAll('.friends-steps');

Promise.all([getUserData, getSleepData, getActivityData, getHydrationData])
  .then((values) => {
    buildUserRepo(values[0].userData);
    buildSleepData(values[1].sleepData);
    buildActivityData(values[2].activityData);
    buildHydrationData(values[3].hydrationData);
    buildPage();
  })

function buildUserRepo(getUserData) {
  getUserData.forEach(user => {
    userRepository.users.push(new User(user));
  })
  user = userRepository.users[Math.floor(Math.random() * userRepository.users.length)];
}

function buildSleepData(getSleepData) {
  getSleepData.forEach(item => {
    sleepData.push(new Sleep(item, userRepository));
  })
}

function buildActivityData(getActivityData) {
  getActivityData.forEach(item => {
    activityData.push(new Activity(item, userRepository))
  })
}

function buildHydrationData(getHydrationData) {
  getHydrationData.forEach(item => {
    hydrationData.push(new Hydration(item, userRepository))
  })
}

function buildPage() {
  userElements()
  walkCardBuild()
  waterCardBuild()
  sleepCardBuild()
  stairsCardBuild()
  hiddenOnBuild()
}

function walkCardBuild() {
  stepElements()
  stepFriendElements()
  stepDropdown()
  stepFriendsPara()
  stepMinToday()
  stepAct()
}

function waterCardBuild() {
  sortHydroDate()
  hydroElements()
}

function sleepCardBuild() {
  sleepElements()
  sleepQToday()
  sleepToday()
  sleepFriendsLongest()
  sleepFriendsWorst()
}

function stairsCardBuild() {
  stairAveElements()
  flightsTodayElement()
  stairsTodayElement()
}

function hiddenOnBuild() {
  findFrirnds()
  updateTrendingStairsDays()
  updateTrendingStepDays()
}

function findFrirnds() {
    user.findFriendsNames(userRepository.users);
}

function flipCard(cardToHide, cardToShow) {
  cardToHide.classList.add('hide');
  cardToShow.classList.remove('hide');
}

function showDropdown() {
  userInfoDropdown.classList.toggle('hide');
}

function updateTrendingStairsDays() {
  // is returning null think it is the  user.findTrendingStairsDays() method. may also
  user.findTrendingStairsDays();
  trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStairsDays[0]}</p>`;
}

function updateTrendingStepDays() {
  // is returning null think it is the user.findTrendingStepDays() method. may also be date
  user.findTrendingStepDays();
  trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStepDays[0]}</p>`;
}

function sortHydroDate() {
  let sortedHydrationDataByDate = user.ouncesRecord.sort((a, b) => {
    if (Object.keys(a)[0] > Object.keys(b)[0]) {
      return -1;
    }
    if (Object.keys(a)[0] < Object.keys(b)[0]) {
      return 1;
    }
    return 0;
  });
  for (var i = 0; i < dailyOz.length; i++) {
    dailyOz[i].innerText = user.addDailyOunces(Object.keys(sortedHydrationDataByDate[i])[0])
  }
}

function userElements() {
  dropdownGoal.innerText = `DAILY STEP GOAL | ${user.dailyStepGoal}`;
  dropdownEmail.innerText = `EMAIL | ${user.email}`;
  dropdownName.innerText = user.name.toUpperCase();
  headerName.innerText = `${user.getFirstName()}'S `;
}

function hydroElements() {
  let hydroToday =  hydrationData.find(hydration => {
    hydration.userID === user.id && hydration.date === todayDate;
    return hydration;
  })
  hydrationUserOuncesToday.innerText = hydroToday.ounces
  hydrationFriendOuncesToday.innerText = userRepository.calculateAverageDailyWater(todayDate);
  let hydroFriend = hydrationData.find(hydration => {
    hydration.userID === user.id && hydration.date === todayDate;
    return hydration
  })
  hydrationInfoGlassesToday.innerText = hydroFriend.ounces
}

function sleepElements() {
  sleepCalendarHoursAverageWeekly.innerText = user.calculateAverageHoursThisWeek(todayDate);
  sleepCalendarQualityAverageWeekly.innerText = user.calculateAverageQualityThisWeek(todayDate);
  sleepInfoQualityAverageAlltime.innerText = user.sleepQualityAverage;
}

function sleepFriendsLongest() {
  sleepFriendLongestSleeper.innerText = userRepository.users.find(user => {
    return user.id === userRepository.getLongestSleepers(todayDate)
  }).getFirstName();
}

function sleepFriendsWorst() {
  sleepFriendWorstSleeper.innerText = userRepository.users.find(user => {
    return user.id === userRepository.getWorstSleepers(todayDate)
  }).getFirstName();
  sleepInfoHoursAverageAlltime.innerText = user.hoursSleptAverage;
}

function sleepQToday() {
  let sleepQToday = sleepData.find(sleep => {
    sleep.userId === user.id && sleep.date === todayDate;
    return sleep;
  })
  sleepInfoQualityToday.innerText = sleepQToday.sleepQuality;
}

function sleepToday() {
  let sleepHrToday = sleepData.find(sleep => {
    sleep.userId === user.id && sleep.date === todayDate;
    return sleep;
  })
  sleepUserHoursToday.innerText = sleepHrToday.hoursSlept;
}

function stairAveElements() {
  stairsCalendarStairsAverageWeekly.innerText = (user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0);
  stairsCalendarFlightsAverageWeekly.innerText = user.calculateAverageFlightsThisWeek(todayDate);
  stairsCalendarStairsAverageWeekly.innerText = (user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0);
  stairsFriendFlightsAverageToday.innerText = (userRepository.calculateAverageStairs(todayDate) / 12).toFixed(1);
  stairsCalendarFlightsAverageWeekly.innerText = user.calculateAverageFlightsThisWeek(todayDate);
  stairsCalendarStairsAverageWeekly.innerText = (user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0);
}

function flightsTodayElement() {
  let flightsToday = activityData.find(activity => {
    activity.userID === user.id && activity.date === todayDate;
    return activity;
  })
  stairsInfoFlightsToday.innerText = flightsToday.flightsOfStairs;
}

function stairsTodayElement() {
  let stairsToday = activityData.find(activity => {
    activity.userID === user.id && activity.date === todayDate;
    return activity;
  })
  stairsUserStairsToday.innerText = stairsToday.flightsOfStairs * 12;
}

function stepElements() {
  stepsInfoMilesWalkedToday.innerText = user.activityRecord.find(activity => {
    return (activity.date === todayDate && activity.userId === user.id)
  }).calculateMiles(userRepository);
  stepsCalendarTotalActiveMinutesWeekly.innerText = user.calculateAverageMinutesActiveThisWeek(todayDate);
  stepsCalendarTotalStepsWeekly.innerText = user.calculateAverageStepsThisWeek(todayDate);
}

function stepMinToday() {
  let minAct =  stepsInfoActiveMinutesToday.innerText = activityData.find(activity => {
    activity.userID === user.id && activity.date === todayDate;
    return activity
  })
  stepsInfoActiveMinutesToday.innerText = minAct.minutesActive;
}

function stepAct() {
  let stepAct = activityData.find(activity => {
    activity.userID === user.id && activity.date === todayDate;
    return activity
  })
  stepsUserStepsToday.innerText = stepAct.steps;
}

function stepFriendElements() {
  stepsFriendActiveMinutesAverageToday.innerText = userRepository.calculateAverageMinutesActive(todayDate);
  stepsFriendAverageStepGoal.innerText = `${userRepository.calculateAverageStepGoal()}`;
  stepsFriendStepsAverageToday.innerText = userRepository.calculateAverageSteps(todayDate);
  user.findFriendsTotalStepsForWeek(userRepository.users, todayDate);
}

function stepDropdown() {
  user.friendsActivityRecords.forEach(friend => {
    dropdownFriendsStepsContainer.innerHTML += `
    <p class='dropdown-p friends-steps'>${friend.firstName} |  ${friend.totalWeeklySteps}</p>
    `;
  });
}

function stepFriendsPara() {
  friendsStepsParagraphs.forEach(paragraph => {
    if (friendsStepsParagraphs[0] === paragraph) {
      paragraph.classList.add('green-text');
    }
    if (friendsStepsParagraphs[friendsStepsParagraphs.length - 1] === paragraph) {
      paragraph.classList.add('red-text');
    }
    if (paragraph.innerText.includes('YOU')) {
      paragraph.classList.add('yellow-text');
    }
  });
}

// all the events
mainPage.addEventListener('click', showInfo);
profileButton.addEventListener('click', showDropdown);
stairsTrendingButton.addEventListener('click', updateTrendingStairsDays());
stepsTrendingButton.addEventListener('click', updateTrendingStepDays());
stairsTrendingButton.addEventListener('click', function() {
  user.findTrendingStairsDays();
  trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStairsDays[0]}</p>`;
});
stepsTrendingButton.addEventListener('click', function() {
  user.findTrendingStepDays();
  trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStepDays[0]}</p>`;
});

function showInfo() {
  if (event.target.classList.contains('steps-info-button')) {
    flipCard(stepsMainCard, stepsInfoCard);
  }
  if (event.target.classList.contains('steps-friends-button')) {
    flipCard(stepsMainCard, stepsFriendsCard);
  }
  if (event.target.classList.contains('steps-trending-button')) {
    flipCard(stepsMainCard, stepsTrendingCard);
  }
  if (event.target.classList.contains('steps-calendar-button')) {
    flipCard(stepsMainCard, stepsCalendarCard);
  }
  if (event.target.classList.contains('hydration-info-button')) {
    flipCard(hydrationMainCard, hydrationInfoCard);
  }
  if (event.target.classList.contains('hydration-friends-button')) {
    flipCard(hydrationMainCard, hydrationFriendsCard);
  }
  if (event.target.classList.contains('hydration-calendar-button')) {
    flipCard(hydrationMainCard, hydrationCalendarCard);
  }
  if (event.target.classList.contains('stairs-info-button')) {
    flipCard(stairsMainCard, stairsInfoCard);
  }
  if (event.target.classList.contains('stairs-friends-button')) {
    flipCard(stairsMainCard, stairsFriendsCard);
  }
  if (event.target.classList.contains('stairs-trending-button')) {
    flipCard(stairsMainCard, stairsTrendingCard);
  }
  if (event.target.classList.contains('stairs-calendar-button')) {
    flipCard(stairsMainCard, stairsCalendarCard);
  }
  if (event.target.classList.contains('sleep-info-button')) {
    flipCard(sleepMainCard, sleepInfoCard);
  }
  if (event.target.classList.contains('sleep-friends-button')) {
    flipCard(sleepMainCard, sleepFriendsCard);
  }
  if (event.target.classList.contains('sleep-calendar-button')) {
    flipCard(sleepMainCard, sleepCalendarCard);
  }
  if (event.target.classList.contains('steps-go-back-button')) {
    flipCard(event.target.parentNode, stepsMainCard);
  }
  if (event.target.classList.contains('hydration-go-back-button')) {
    flipCard(event.target.parentNode, hydrationMainCard);
  }
  if (event.target.classList.contains('stairs-go-back-button')) {
    flipCard(event.target.parentNode, stairsMainCard);
  }
  if (event.target.classList.contains('sleep-go-back-button')) {
    flipCard(event.target.parentNode, sleepMainCard);
  }
}

// -----OLD STUFF!!!----
// old file paths
// // import userData from './data/users';
// import activityData from './data/activity';
// import sleepData from './data/sleep';
// import hydrationData from './data/hydration';
// old setup stuff
// activityData.forEach(activity => {
//   activity = new Activity(activity, userRepository);
// });

// hydrationData.forEach(hydration => {
//   hydration = new Hydration(hydration, userRepository);
// });

// sleepData.forEach(sleep => {
//   sleep = new Sleep(sleep, userRepository);
// });
// starting code combined with let sortedHydrationDataByDate var for scope issues.
// for (var i = 0; i < dailyOz.length; i++) {
//   dailyOz[i].innerText = user.addDailyOunces(Object.keys(sortedHydrationDataByDate[i])[0])
// }
// starting code
// hydrationUserOuncesToday.innerText = hydrationData.find(hydration => {
//   return hydration.userID === user.id && hydration.date === todayDate;
// }).numOunces;
//
// hydrationFriendOuncesToday.innerText = userRepository.calculateAverageDailyWater(todayDate);
//
// hydrationInfoGlassesToday.innerText = hydrationData.find(hydration => {
//   return hydration.userID === user.id && hydration.date === todayDate;
// }).numOunces / 8;

// starting code
// sleepCalendarHoursAverageWeekly.innerText = user.calculateAverageHoursThisWeek(todayDate);
//
// sleepCalendarQualityAverageWeekly.innerText = user.calculateAverageQualityThisWeek(todayDate);

// may combine with var for later refactoring
// sleepFriendLongestSleeper.innerText = userRepository.users.find(user => {
//   return user.id === userRepository.getLongestSleepers(todayDate)
// }).getFirstName();
//
// sleepFriendWorstSleeper.innerText = userRepository.users.find(user => {
//   return user.id === userRepository.getWorstSleepers(todayDate)
// }).getFirstName();

// sleepInfoHoursAverageAlltime.innerText = user.hoursSleptAverage;

// stepsInfoMilesWalkedToday.innerText = user.activityRecord.find(activity => {
//   return (activity.date === todayDate && activity.userId === user.id)
// }).calculateMiles(userRepository);
//
// sleepInfoQualityAverageAlltime.innerText = user.sleepQualityAverage;
//
// sleepInfoQualityToday.innerText = sleepData.find(sleep => {
//   return sleep.userID === user.id && sleep.date === todayDate;
// }).sleepQuality;
//
// sleepUserHoursToday.innerText = sleepData.find(sleep => {
//   return sleep.userID === user.id && sleep.date === todayDate;
// }).hoursSlept;
// stairsCalendarFlightsAverageWeekly.innerText = user.calculateAverageFlightsThisWeek(todayDate);
//
// stairsCalendarStairsAverageWeekly.innerText = (user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0);
//
// stairsFriendFlightsAverageToday.innerText = (userRepository.calculateAverageStairs(todayDate) / 12).toFixed(1);

// stairsInfoFlightsToday.innerText = activityData.find(activity => {
//   return activity.userID === user.id && activity.date === todayDate;
// }).flightsOfStairs;
//
// stairsUserStairsToday.innerText = activityData.find(activity => {
//   return activity.userID === user.id && activity.date === todayDate;
// }).flightsOfStairs * 12;
//
// // stairsCalendarFlightsAverageWeekly.innerText = user.calculateAverageFlightsThisWeek(todayDate);
//
// stairsCalendarStairsAverageWeekly.innerText = (user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0);

// stairsTrendingButton.addEventListener('click', function() {
//   user.findTrendingStairsDays();
//   trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStairsDays[0]}</p>`;
// });
// stepsCalendarTotalActiveMinutesWeekly.innerText = user.calculateAverageMinutesActiveThisWeek(todayDate);
//
// stepsCalendarTotalStepsWeekly.innerText = user.calculateAverageStepsThisWeek(todayDate);

// stepsTrendingButton.addEventListener('click', function() {
//   user.findTrendingStepDays();
//   trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStepDays[0]}</p>`;
// });

// stepsFriendActiveMinutesAverageToday.innerText = userRepository.calculateAverageMinutesActive(todayDate);

// stepsFriendAverageStepGoal.innerText = `${userRepository.calculateAverageStepGoal()}`;
//
// stepsFriendStepsAverageToday.innerText = userRepository.calculateAverageSteps(todayDate);

// stepsInfoActiveMinutesToday.innerText = activityData.find(activity => {
//   return activity.userID === user.id && activity.date === todayDate;
// }).minutesActive;
//
// stepsUserStepsToday.innerText = activityData.find(activity => {
//   return activity.userID === user.id && activity.date === todayDate;
// }).numSteps;

// user.findFriendsTotalStepsForWeek(userRepository.users, todayDate);

// user.friendsActivityRecords.forEach(friend => {
//   dropdownFriendsStepsContainer.innerHTML += `
//   <p class='dropdown-p friends-steps'>${friend.firstName} |  ${friend.totalWeeklySteps}</p>
//   `;
// });

// let friendsStepsParagraphs = document.querySelectorAll('.friends-steps');

// friendsStepsParagraphs.forEach(paragraph => {
//   if (friendsStepsParagraphs[0] === paragraph) {
//     paragraph.classList.add('green-text');
//   }
//   if (friendsStepsParagraphs[friendsStepsParagraphs.length - 1] === paragraph) {
//     paragraph.classList.add('red-text');
//   }
//   if (paragraph.innerText.includes('YOU')) {
//     paragraph.classList.add('yellow-text');
//   }
// });
