app.factory("userFactory", 
	["$firebaseAuth","$firebaseArray", "$q", function($firebaseAuth, $firebaseArray, $q) {
		var colorArray  = [{
      color: 'Red',
      selectedColor: 'red'
    }, {
      color: 'Orange',
      selectedColor: 'orange'
    }, {
      color: 'Yellow',
      selectedColor: 'yellow'
    }, {
      color: 'Light Green',
      selectedColor: 'lightGreen'
    }, {
      color: 'Green',
      selectedColor: 'green'
    }, {
      color: 'Blue',
      selectedColor: 'blue'
    }, {
      color: 'Light Blue',
      selectedColor: 'lightBlue'
    }, {
      color: 'Pink',
      selectedColor: 'pink'
    }, {
      color: 'Purple',
      selectedColor: 'purple'
    }, {
      color: 'Brown',
      selectedColor: 'brown'
    }, {
      color: 'White',
      selectedColor: 'white'
    }, {
      color: 'Black',
      selectedColor: 'black'
    }];

    var hobbyArray  = [{
      hobby: 'Eating Well',
      selectedhobby: 'eating'
    }, {
      hobby: 'Sleeping',
      selectedhobby: 'sleeping'
    }, {
      hobby: 'Chatting',
      selectedhobby: 'chatting'
    }, {
      hobby: 'Partying',
      selectedhobby: 'partying'
    }, {
      hobby: 'Fashion',
      selectedhobby: 'fashion'
    }, {
      hobby: 'Shopping',
      selectedhobby: 'shopping'
    }, {
      hobby: 'Helping Others',
      selectedhobby: 'helping'
    }, {
      hobby: 'Studying',
      selectedhobby: 'studying'
    }, {
      hobby: 'Earning Money',
      selectedhobby: 'money'
    }, {
      hobby: 'Cooking',
      selectedhobby: 'cooking'
    }, {
      hobby: 'Cleaning',
      selectedhobby: 'cleaning'
    }, {
      hobby: 'Playing Video Games',
      selectedhobby: 'games'
    }, {
      hobby: 'Using the Internet',
      selectedhobby: 'internet'
    }, {
      hobby: 'Listening to Music',
      selectedhobby: 'music'
    }, {
      hobby: 'Watching Movies',
      selectedhobby: 'movies'
    }, {
      hobby: 'Reading',
      selectedhobby: 'reading'
    }, {
      hobby: 'Driving',
      selectedhobby: 'driving'
    }, {
      hobby: 'Playing Sports',
      selectedhobby: 'sports'
    }, {
      hobby: 'The Outdoors',
      selectedhobby: 'outdoors'
    }, {
      hobby: 'Traveling',
      selectedhobby: 'traveling'
    }, {
      hobby: 'Fishing',
      selectedhobby: 'fishing'
    }, {
      hobby: 'Taking Photos',
      selectedhobby: 'photos'
    }, {
      hobby: 'Drawing',
      selectedhobby: 'drawing'
    }, {
      hobby: 'Keeping Pets',
      selectedhobby: 'pets'
    }, {
      hobby: 'Dancing',
      selectedhobby: 'dancing'
    }, {
      hobby: 'Secret',
      selectedhobby: 'secret'
    }, {
      hobby: 'Other',
      selectedhobby: 'other'
    }];

    function getHobbyArray() {
      return hobbyArray;
    };

    function getColorArray() {
      return colorArray;
    };

  return {
    getHobbyArray: getHobbyArray,
    getColorArray: getColorArray
  }

}]);
