$(document).ready( function() {
  playRadio();
});

var spacecore = $("#spacecore");
var factcore = $("#factcore");

var character;
var others;
var quote_queue;

var SPACE_QUOTES = $(".space audio");
var FACT_QUOTES = $(".fact audio");

function clone(quotes_array) {
  var cloned_quotes = $.extend(true, [], quotes_array);
  return cloned_quotes;
}

function remove(quotes_array) {
  quotes_array.shift();
}

function playRadio() {
  var radio = document.getElementById("radio");
  radio.currentTime = 3.5;
  radio.volume = 0.1;
  // radio.play();
}

$(".char-img").click(function() {
  character = $(this);
  others = $(".char-img").not($(this));
  changeSelection(character, others);
  prepareQuotes(character);
});

function changeSelection(character, others) {
  others.removeClass("neutral");
  character.removeClass("neutral");

  others.addClass("unselected");
  character.removeClass("unselected");

  others.removeClass("selected");
  character.addClass("selected");
}

function prepareQuotes(character) {
  var character_name = identifyCharacter(character);

  if (character_name == "spacecore") {
    quote_queue = clone(SPACE_QUOTES);
  } else if (character_name == "factcore") {
    quote_queue = clone(FACT_QUOTES);
  }
  return quote_queue;
}

function identifyCharacter(character) {
  var name = character[0].id;
  return name;
}

$(document).keypress(function() {
  if (spacecore.hasClass("selected")) {
    var space = document.getElementById("space7");
    space.currentTime = 0;
    space.play();
  } else if (factcore.hasClass("selected")) {
    var whales = document.getElementById("fact5");
    whales.currentTime = 0;
    whales.play();
  }
});
