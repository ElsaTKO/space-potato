$(document).ready( function() {
  playRadio();

  $("#jpId").jPlayer( {
    ready: function () {
      $(this).jPlayer("setMedia", {
        mp3: audio_url
      });
    },
    volume: 1,
    supplied: "mp3",
    swfPath: "/js"
  });
});

var spacecore = $("#spacecore");
var factcore = $("#factcore");
var textbox = $("#textbox");

var character;
var character_name;
var others;
var quote_queue;
var last_quote;

var audio_url;
// var jPlayah = $("#jpId");

var words;
var timing;
var incrementor;

var SPACE_QUOTES = $(".space audio");
var FACT_QUOTES = $(".fact audio");

function clone(array) {
  var cloned_quotes = $.extend(true, [], array);
  return cloned_quotes;
}

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function removeAQuote(array) {
  array.shift();
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
  identifyCharacter(character);
  changeSelection();
  prepareQuotes();
});

function changeSelection() {
  others.removeClass("neutral");
  character.removeClass("neutral");

  others.addClass("unselected");
  character.removeClass("unselected");

  others.removeClass("selected");
  character.addClass("selected");

  alignTextbox();
}

function alignTextbox() {
  textbox.show();
  if (character_name == "spacecore") {
    textbox.css("left", "");
    textbox.css("right", "0");
  } else if (character_name == "factcore") {
    textbox.css("right", "");
    textbox.css("left", "0");
  }
}

function prepareQuotes() {
  var cloned_quotes;
  if (character_name == "spacecore") {
    cloned_quotes = clone(SPACE_QUOTES);
  } else if (character_name == "factcore") {
    cloned_quotes = clone(FACT_QUOTES);
  }
  quote_queue = shuffle(cloned_quotes);
  return quote_queue;
}

function identifyCharacter() {
  character_name = character[0].id;
}

function stopPrevQuote() {
  if (typeof last_quote !== "undefined") {
    last_quote.pause();
  }
}

function repopulateQuotesHuh() {
  if (quote_queue.length === 0) {
    prepareQuotes();
  }
}

function playQuote() {
  repopulateQuotesHuh();
  var quote = quote_queue[0];
  last_quote = quote;
  console.log(quote);
  removeAQuote(quote_queue);

  words = findText(quote);
  timing = findTiming(quote);
  // appendText(words);
  console.log(words);

  audio_url = getAudioSrc(quote);
  $("#jpId").jPlayer("play", 0);

  // quote.currentTime = 0;
  // quote.play();
  console.log(quote_queue.length);
}

$("#jpId").bind($.jPlayer.event.timeupdate, function(event) {
  // trigger text according to audio timing
  if (event.jPlayer.status.currentTime >= timing[incrementor]) {
    // add text to textbox
    var line = $("<p>");
    line.append(words[incrementor]);
    textbox.append(line);
    // wait for next que
    incrementor++;
  }
});

function getAudioSrc(quote) {
  // splitting on "audio" and then adding it back on
  // because I have no idea what heroku's file structure looks like
  var file_loc_in_audio_dir = quote.currentSrc.split("audio")[1]; // "/space_core/space01.mp3"
  var url = "audio" + file_loc_in_audio_dir + ""; // "audio/space_core/space01.mp3"
  return url;
}

function findText(quote) {
  var quote_id = quote.id; // "space1"
  var words = AudioToTextAndTimingMap[quote_id].text; // space1_text
  return words;
}

function findTiming(quote) {
  var quote_id = quote.id; // "space1"
  var timing = AudioToTextAndTimingMap[quote_id].timing; // space1_timing
  return timing;
}

function appendText(words) {
  textbox.empty();
  for (i = 0; i < words.length; i++) {
    var line = $("<p>");
    line.append(words[i]);
    textbox.append(line);
  }
}

$(document).keypress(function() {
  stopPrevQuote();
  repopulateQuotesHuh();
  var quote = quote_queue[0];
  last_quote = quote;
  removeAQuote(quote_queue);

  // find matching objects from array mapping
  words = findText(quote);
  timing = findTiming(quote);
  audio_url = getAudioSrc(quote);

  textbox.empty(); // remove last quote text
  incrementor = 0; // start at beginning of text array
  $("#jpId").jPlayer("setMedia", { mp3: audio_url }).jPlayer("play", 0); // play quote
});



// QUOTE TEXT & TIMINGS
// space core
var space1_text = [];
space1_text[0] = "Dad! I'm in space!";
space1_text[1] = "\"I'm proud of you, son.\"";
space1_text[2] = "Dad, are you space?";
space1_text[3] = "\"Yes. Now we are a family again.\"";

var space1_timing = [];
space1_timing[0] = 0;
space1_timing[1] = 1.5;
space1_timing[2] = 3.25;
space1_timing[3] = 4.5;


var space2_text = [];
space2_text[0] = "Orbit.";
space2_text[1] = "Space orbit.";
space2_text[2] = "In my space suit.";

var space2_timing = [];
space2_timing[0] = 0;
space2_timing[1] = 0.25;
space2_timing[2] = 0.75;


var space3_text = [];
space3_text[0] = "Come here, space.";
space3_text[1] = "I have a secret for you.";
space3_text[2] = "No, come closer.";

var space3_timing = [];
space3_timing[0] = 0;
space3_timing[1] = 0.5;
space3_timing[2] = 1.5;


var space4_text = [];
space4_text[0] = "Lady.";
space4_text[1] = "I love space.";
space4_text[2] = "I know. I know. I know. Spell it:";
space4_text[3] = "Space. \"S\"...\"P\"...";
space4_text[4] = "\"ACE\"!";
space4_text[5] = "Space.";
space4_text[6] = "Space.";

var space4_timing = [];
space4_timing[0] = 0;
space4_timing[1] = 0.25;
space4_timing[2] = 1;
space4_timing[3] = 2.5;
space4_timing[4] = 4.5;
space4_timing[5] = 5.25;
space4_timing[6] = 6;


var space5_text = [];
space5_text[0] = "Space. Space.";
space5_text[1] = "Space. Space.";
space5_text[2] = "Comets. Stars.";
space5_text[3] = "Galaxies. Orion.";

var space5_timing = [];
space5_timing[0] = 0;
space5_timing[1] = 0.25;
space5_timing[2] = 0.75;
space5_timing[3] = 1.25;


var space6_text = [];
space6_text[0] = "Space court.";
space6_text[1] = "For people in space.";
space6_text[2] = "The judge space sun presiding.";
space6_text[3] = "Bam.";
space6_text[4] = "Guilty.";
space6_text[5] = "Of being in space.";
space6_text[6] = "I'm in space.";

var space6_timing = [];
space6_timing[0] = 0;
space6_timing[1] = 0.5;
space6_timing[2] = 1.25;
space6_timing[3] = 3;
space6_timing[4] = 3.5;
space6_timing[5] = 4;
space6_timing[6] = 5;


var space7_text = [];
space7_text[0] = "Where am I?";
space7_text[1] = "Guess.";
space7_text[2] = "Guess. Guess. Guess.";
space7_text[3] = "I'm in space.";

var space7_timing = [];
space7_timing[0] = 0;
space7_timing[1] = 0.25;
space7_timing[2] = 0.75;
space7_timing[3] = 1.75;


var space8_text = [];
space8_text[0] = "There's a star.";
space8_text[1] = "There's another one.";
space8_text[2] = "Star.";
space8_text[3] = "Star.";
space8_text[4] = "Star.";
space8_text[5] = "Star. Star.";
space8_text[6] = "Star.";

var space8_timing = [];
space8_timing[0] = 0;
space8_timing[1] = 0.75;
space8_timing[2] = 1.75;
space8_timing[3] = 2.5;
space8_timing[4] = 3.5;
space8_timing[5] = 4.25;
space8_timing[6] = 5.5;


var space9_text = [];
space9_text[0] = "SPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
space9_text[1] = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
space9_text[2] = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
space9_text[3] = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAACE!";

var space9_timing = [];
space9_timing[0] = 0;
space9_timing[1] = 0.75;
space9_timing[2] = 1.5;
space9_timing[3] = 2.5;


// fact core
var fact1_text = [];
fact1_text[0] = "Pants were invented";
fact1_text[1] = "by sailors in the sixteenth century";
fact1_text[2] = "to avoid Poseidon's wrath.";
fact1_text[3] = "It was believed that";
fact1_text[4] = "the sight of naked sailors";
fact1_text[5] = "angered the sea god.";

var fact1_timing = [];
fact1_timing[0] = 0;
fact1_timing[1] = 0.25;
fact1_timing[2] = 1.5;
fact1_timing[3] = 2.75;
fact1_timing[4] = 3.5;
fact1_timing[5] = 4.25;


var fact2_text = [];
fact2_text[0] = "89% of magic tricks";
fact2_text[1] = "are not magic.";
fact2_text[2] = "Technically";
fact2_text[3] = "they are sorcery.";

var fact2_timing = [];
fact2_timing[0] = 0;
fact2_timing[1] = 0.75;
fact2_timing[2] = 1.75;
fact2_timing[3] = 2.25;


var fact3_text = [];
fact3_text[0] = "William Shakespeare";
fact3_text[1] = "did not exist.";
fact3_text[2] = "His plays were masterminded";
fact3_text[3] = "in 1589";
fact3_text[4] = "by Francis Bacon,";
fact3_text[5] = "who used a Ouija board";
fact3_text[6] = "to enslave play-writing ghosts.";

var fact3_timing = [];
fact3_timing[0] = 0;
fact3_timing[1] = 0.5;
fact3_timing[2] = 1.5;
fact3_timing[3] = 2.5;
fact3_timing[4] = 3.5;
fact3_timing[5] = 4.5;
fact3_timing[6] = 5.5;


var fact4_text = [];
fact4_text[0] = "It is incorrectly noted that";
fact4_text[1] = "Thomas Edison invented push-ups";
fact4_text[2] = "in 1878.";
fact4_text[3] = "Nikolai Tesla had in fact";
fact4_text[4] = "patented the activity three years earlier,";
fact4_text[5] = "under the name";
fact4_text[6] = "\"Tesla-cize.\"";

var fact4_timing = [];
fact4_timing[0] = 0;
fact4_timing[1] = 0.75;
fact4_timing[2] = 2;
fact4_timing[3] = 3.25;
fact4_timing[4] = 4.25;
fact4_timing[5] = 6;
fact4_timing[6] = 7;


var fact5_text = [];
fact5_text[0] = "Whales";
fact5_text[1] = "are twice as intelligent";
fact5_text[2] = "and three times as delicious";
fact5_text[3] = "as humans.";

var fact5_timing = [];
fact5_timing[0] = 0;
fact5_timing[1] = 0.25;
fact5_timing[2] = 1;
fact5_timing[3] = 2;


var fact6_text = [];
fact6_text[0] = "The first commercial airline flight";
fact6_text[1] = "took to the air";
fact6_text[2] = "in 1914.";
fact6_text[3] = "Everyone involved";
fact6_text[4] = "screamed the entire way.";

var fact6_timing = [];
fact6_timing[0] = 0;
fact6_timing[1] = 1;
fact6_timing[2] = 1.5;
fact6_timing[3] = 2.5;
fact6_timing[4] = 3.25;


var fact7_text = [];
fact7_text[0] = "In Greek myth,";
fact7_text[1] = "Prometheus stole fire from the gods";
fact7_text[2] = "and gave it to humankind.";
fact7_text[3] = "The jewelry";
fact7_text[4] = "he kept for himself.";

var fact7_timing = [];
fact7_timing[0] = 0;
fact7_timing[1] = 0.5;
fact7_timing[2] = 2;
fact7_timing[3] = 3.25;
fact7_timing[4] = 3.75;


var fact8_text = [];
fact8_text[0] = "The first person to prove that";
fact8_text[1] = "cow's milk is drinkable";
fact8_text[2] = "was very,";
fact8_text[3] = "very";
fact8_text[4] = "thirsty.";

var fact8_timing = [];
fact8_timing[0] = 0;
fact8_timing[1] = 0.75;
fact8_timing[2] = 1.75;
fact8_timing[3] = 2.25;
fact8_timing[4] = 2.75;


var fact9_text = [];
fact9_text[0] = "At some point in their lives";
fact9_text[1] = "1 in 6 children";
fact9_text[2] = "will be abducted";
fact9_text[3] = "by the Dutch.";

var fact9_timing = [];
fact9_timing[0] = 0;
fact9_timing[1] = 0.75;
fact9_timing[2] = 1.5;
fact9_timing[3] = 2;


// MAPPING
var AudioToTextAndTimingMap = {
  space1: { text: space1_text, timing: space1_timing },
  space2: { text: space2_text, timing: space2_timing },
  space3: { text: space3_text, timing: space3_timing },
  space4: { text: space4_text, timing: space4_timing },
  space5: { text: space5_text, timing: space5_timing },
  space6: { text: space6_text, timing: space6_timing },
  space7: { text: space7_text, timing: space7_timing },
  space8: { text: space8_text, timing: space8_timing },
  space9: { text: space9_text, timing: space9_timing },
  fact1: { text: fact1_text, timing: fact1_timing },
  fact2: { text: fact2_text, timing: fact2_timing },
  fact3: { text: fact3_text, timing: fact3_timing },
  fact4: { text: fact4_text, timing: fact4_timing },
  fact5: { text: fact5_text, timing: fact5_timing },
  fact6: { text: fact6_text, timing: fact6_timing },
  fact7: { text: fact7_text, timing: fact7_timing },
  fact8: { text: fact8_text, timing: fact8_timing },
  fact9: { text: fact9_text, timing: fact9_timing }
};
