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
const addUserActivity = document.querySelector('#add-activity-button')
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
const userActivityDropdown = document.querySelector('#user-activity-dropdown');
const userInfoDropdown = document.querySelector('#user-info-dropdown');
const friendsStepsParagraphs = document.querySelectorAll('.friends-steps');

const dateInput = document.querySelector(".date-input");
const sleepHrInput = document.querySelector(".hours-slept-data-input");
const sleepQtInput = document.querySelector(".sleep-quality-data-input");
const addSleepButton = document.querySelector(".add-sleep-data");

const stepDataInput = document.querySelector(".number-steps-data-input");
const minutesActiveInout = document.querySelector(".minutes-active-data-input");
const flightStairsInput = document.querySelector(".flights-stairs-data-input");
const addActivityButton = document.querySelector(".add-activity-data");

const numOuncesInput = document.querySelector(".number-ounces-data-input");
const addHydrationButton = document.querySelector(".add-hydration-data");

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
    const matchingUser = userRepository.getUser(item.userID);
    sleepData.push(new Sleep(matchingUser, item, userRepository));
  })
}

function buildActivityData(getActivityData) {
  getActivityData.forEach(item => {
    const matchingUser = userRepository.getUser(item.userID);
    activityData.push(new Activity(matchingUser, item, userRepository))
  })
}

function buildHydrationData(getHydrationData) {
  getHydrationData.forEach(item => {
    const matchingUser = userRepository.getUser(item.userID);
    hydrationData.push(new Hydration(matchingUser, item, userRepository))
  })
}

function addNewSleep() {
  let fixDate = dateInput.value.replaceAll("-", "/");
  let newData = {"userID": user.id, "date": fixDate, "hoursSlept": sleepHrInput.value, "sleepQuality": sleepQtInput.value};
  fetch(sleepUrl, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(newData),
  })
    .then(response => console.log(response.status))
    .catch(error => console.log(error))
}

function addActivity() {
  let fixDate = dateInput.value.replaceAll("-", "/");
  let newData = {"userID": user.id, "date": fixDate, "numSteps": stepDataInput.value, "minutesActive": minutesActiveInout.value, "flightsOfStairs": flightStairsInput.value};
  fetch(activityUrl, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(newData),
  })
    .then(response => console.log(response.status))
    .catch(error => console.log(error))
}

function addWater() {
  let fixDate = dateInput.value.replaceAll("-", "/");
  let newData = {"userID": user.id, "date": fixDate, "numOunces": numOuncesInput.value};
  fetch(hydrationUrl, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(newData),
  })
    .then(response => console.log(response.status))
    .catch(error => console.log(error))
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
}

function stairsCardBuild() {
  stairAveElements()
  flightsTodayElement()
  stairsTodayElement()
}

function hiddenOnBuild() {
  findFriends()
}

function findFriends() {
  user.findFriendsNames(userRepository.users);
}

function flipCard(cardToHide, cardToShow) {
  cardToHide.classList.add('hide');
  cardToShow.classList.remove('hide');
}

function showDropdown() {
  userInfoDropdown.classList.toggle('hide');
}

function showUserDropdown() {
  userActivityDropdown.classList.toggle('hide');
}

function sortHydroDate() {
  let sortedHydrationDataByDate = user.hydrationData[0].addDailyOunces(todayDate)
  sortedHydrationDataByDate.forEach((hydrationData, index) => {
    if (dailyOz[index]) dailyOz[index].innerText = hydrationData.ounces;
  })
}

function userElements() {
  dropdownGoal.innerText = `DAILY STEP GOAL | ${user.dailyStepGoal}`;
  dropdownEmail.innerText = `EMAIL | ${user.email}`;
  dropdownName.innerText = user.name.toUpperCase();
  headerName.innerText = `${user.getFirstName()}'S `;
}

function hydroElements() {
  hydrationFriendOuncesToday.innerText = userRepository.calculateAverageDailyWater(todayDate);
  let hydroUser = user.hydrationData.find(hydration => {
    hydration.id === user.id && hydration.date === todayDate;
    return hydration
  })
  hydrationUserOuncesToday.innerText = hydroUser.ounces
  hydrationInfoGlassesToday.innerText = (hydroUser.ounces / 8).toFixed(0);
}

function sleepElements() {
  sleepCalendarHoursAverageWeekly.innerText = user.calculateAverageThisWeek(todayDate, 'sleepHoursRecord', 'hours', 1);
  sleepCalendarQualityAverageWeekly.innerText = user.calculateAverageThisWeek(todayDate, 'sleepQualityRecord', 'quality', 1);
  sleepInfoQualityAverageAlltime.innerText = user.sleepQualityAverage;
}

function sleepQToday() {
  let sleepQToday = user.sleepQualityRecord.find(sleep => {
    return sleep.date === todayDate;
  })
  sleepInfoHoursAverageAlltime.innerText = user.hoursSleptAverage;
  sleepInfoQualityToday.innerText = sleepQToday.quality;
}

function sleepToday() {
  let sleepHrToday = user.sleepHoursRecord.find(sleep => {
    return sleep.date === todayDate;
  })
  sleepUserHoursToday.innerText = sleepHrToday.hours;
}

function stairAveElements() {
  stairsCalendarStairsAverageWeekly.innerText = (user.calculateAverageThisWeek(todayDate, 'activityData', 'flightsOfStairs', 1) * 12).toFixed(0);
  stairsCalendarFlightsAverageWeekly.innerText = user.calculateAverageThisWeek(todayDate, 'activityData', 'flightsOfStairs', 1);
  stairsFriendFlightsAverageToday.innerText = (userRepository.calculateAverageActivity(todayDate, 'flightsOfStairs') / 12).toFixed(1);
}

function flightsTodayElement() {
  let flightsToday = activityData.find(activity => {
    activity.userID === user.id && activity.date === todayDate;
    return activity;
  })
  stairsInfoFlightsToday.innerText = flightsToday.flightsOfStairs;
}

function stairsTodayElement() {
  let stairsToday = user.activityData.find(activity => {
    return activity.date === todayDate;
  })
  stairsUserStairsToday.innerText = stairsToday.flightsOfStairs * 12;
}

function stepElements() {
  const calculatedMiles =
  user.activityData.find(activity => activity.date === todayDate);
  stepsInfoMilesWalkedToday.innerText = calculatedMiles.calculateMiles()
  stepsCalendarTotalActiveMinutesWeekly.innerText = user.calculateAverageThisWeek(todayDate, 'activityData', 'minutesActive', 0);
  stepsCalendarTotalStepsWeekly.innerText = user.calculateAverageThisWeek(todayDate, 'activityData', 'steps', 0);
}

function stepMinToday() {
  let minAct =  stepsInfoActiveMinutesToday.innerText =
  user.activityData.find(activity => {
    return activity.date === todayDate;
  })
  stepsInfoActiveMinutesToday.innerText = minAct.minutesActive;
}

function stepAct() {
  let stepAct = user.activityData.find(activity => {
    activity.date === todayDate;
    return activity
  })
  stepsUserStepsToday.innerText = stepAct.steps;
}

function stepFriendElements() {
  stepsFriendActiveMinutesAverageToday.innerText = userRepository.calculateAverageActivity(todayDate, 'minutesActive')
  stepsFriendAverageStepGoal.innerText = `${userRepository.calculateAverageStepGoal()}`;
  stepsFriendStepsAverageToday.innerText = userRepository.calculateAverageActivity(todayDate, 'steps');
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
addUserActivity.addEventListener('click', showUserDropdown);
profileButton.addEventListener('click', showDropdown);

addSleepButton.addEventListener('click', addNewSleep);
addActivityButton.addEventListener('click', addActivity);
addHydrationButton.addEventListener('click', addWater);

// {“userID”: integer, “date”: string, “numSteps”: integer, “minutesActive”: integer, “flightsOfStairs”: integer}

// {"userID": integer, "date": string, "numOunces": integer}


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
