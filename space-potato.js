$(document).ready( function() {
  playRadio();
});

var spacecore = $("#spacecore");
var factcore = $("#factcore");

var character;
var others;
var quote_queue;
var previous_quote;

var SPACE_QUOTES = $(".space audio");
var FACT_QUOTES = $(".fact audio");

function clone(quotes_array) {
  var cloned_quotes = $.extend(true, [], quotes_array);
  return cloned_quotes;
}

function shuffle(quotes_array) {
    for (var i = quotes_array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = quotes_array[i];
        quotes_array[i] = quotes_array[j];
        quotes_array[j] = temp;
    }
    return quotes_array;
}

function removeAQuote(quotes_array) {
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
  var cloned_quotes;
  if (character_name == "spacecore") {
    cloned_quotes = clone(SPACE_QUOTES);
  } else if (character_name == "factcore") {
    cloned_quotes = clone(FACT_QUOTES);
  }
  quote_queue = shuffle(cloned_quotes);
  return quote_queue;
}

function identifyCharacter(character) {
  var name = character[0].id;
  return name;
}

function stopPrevQuote() {
  if (typeof last_quote !== "undefined") {
    last_quote.pause();
  }
}

function playQuote() {
  var quote = quote_queue[0];
  last_quote = quote;
  console.log(quote);
  removeAQuote(quote_queue);
  quote.currentTime = 0;
  quote.play();
  console.log(quote_queue.length);
}

$(document).keypress(function() {
  stopPrevQuote();
  playQuote();
});
