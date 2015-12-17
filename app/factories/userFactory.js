app.factory("userFactory", 
	["$firebaseAuth","$firebaseArray", "$q", function($firebaseAuth, $firebaseArray, $q) {
		var colorArray  = ['Red', 'Orange', 'Yellow', 'Light Green', 'Green', 'Blue',
     'Light Blue', 'Pink', 'Purple', 'Brown', 'White', 'Black'];

    var hobbyArray  = ['Eating Well', 'Sleeping', 'Chatting', 'Partying', 'Fashion',
     'Shopping', 'Helping Others', 'Studying', 'Earning Money', 'Cooking',
      'Cleaning', 'Playing Video Games', 'Using the Internet', 'Listening to Music',
      'Watching Movies', 'Reading', 'Driving', 'Playing Sports', 'The Outdoors',
      'Traveling', 'Fishing', 'Taking Photos', 'Drawing', 'Keeping Pets',
      'Dancing', 'Secret', 'Other'];

    var dayArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

    var monthArray = [1,2,3,4,5,6,7,8,9,10,11,12];

    var gameArray = ["Puzzle Swap", "Find Mii", 
      "Mii Force", "Flower Town", "Warriors Way", "Monster Manor",
      "Ultimate Angler", "Battleground Z", "Pokemon", "Fire Emblem", 
      "Smash Brothers", "Link Between Worlds", "Animal Crossing", "Bravely Default"];


    function getGameArray() {
      return gameArray;
    }
    function getDayArray() {
      return dayArray;
    }
    function getMonthArray() {
      return monthArray;
    }
      function getHobbyArray() {
      return hobbyArray;
    }

    function getColorArray() {
      return colorArray;
    }

  return {
    getGameArray: getGameArray,
    getDayArray: getDayArray,
    getMonthArray: getMonthArray,
    getHobbyArray: getHobbyArray,
    getColorArray: getColorArray
  };

}]);
