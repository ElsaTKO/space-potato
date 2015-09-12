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
    swfPath: "/js",
    consoleAlerts: true,
    errorAlerts: true,
    warningAlerts: true
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

// $("#jpId").jPlayer( {
//   ready: function () {
//       $(this).jPlayer("setMedia", {
//           mp3: audio_url
//       });
//   },
//   volume: 1,
//   supplied: "mp3",
//   swfPath: "/js",
//   consoleAlerts: true,
//   errorAlerts: true,
//   warningAlerts: true
// });


$("#jpId").bind($.jPlayer.event.timeupdate, function(event) {

    if (event.jPlayer.status.currentTime >= timing[incrementor]) {

      var line = $("<p>");
      line.append(words[incrementor]);
      textbox.append(line);

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

// play quote through jPlayer
// set media dynamically?

// $("#jpId").jPlayer("setMedia", {mp3: audio_url }).jPlayer("play");

// $("#trackSelect").change(function(e) {
//      my_trackName.text($(this).val());
//      my_jPlayer.jPlayer("setMedia", {
//         mp3: $(this).find(':selected').attr("href")
//      });
//  });

// Chell in the Rain version
// -------------------------
// $("#jpId").jPlayer( {
//         ready: function () {
//             $(this).jPlayer("setMedia", {
//                 mp3: audio_url
//             });
//         },
//         volume: 1,
//         supplied: "mp3",
//         swfPath: "/js"
//     });

// $("#jpId").bind($.jPlayer.event.timeupdate, function(event) {
//      if (event.jPlayer.status.currentTime >= timings[currentTrigger] && nolyrics != true) {
//          fireTrigger(currentTrigger);
//          currentTrigger++;
//      }
//
//
//   });








// my version WIP
// --------------
// incrementor = 0;
// set jPlayer media url
// play audio
//
// if (event.jPlayer.status.currentTime >= timings[incrementor]) {
//   create p tag
//   append text[incrementor] into p tag
//   incrementor++
// }

function findText(quote) {
  var quote_id = quote.id; // "space1"
  // var words = AudioToTextAndTimingMap[quote_id]; // space1_text
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

// $(document).keypress(function() {
//   stopPrevQuote();
//   playQuote();
// });

$(document).keypress(function() {
  stopPrevQuote();
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
  console.log(audio_url);
  // playQuote();
  incrementor = 0;
  $("#jpId").jPlayer("setMedia", {mp3: audio_url}).jPlayer("play", 0);
  // $("#jquery_jplayer_1").jPlayer("setMedia", {mp3: "/Music/a.mp3"}).jPlayer("play");
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
space1_timing[1] = 1;
space1_timing[2] = 2;
space1_timing[3] = 3;


var space2_text = [];
space2_text[0] = "Orbit.";
space2_text[1] = "Space orbit.";
space2_text[2] = "In my space suit.";

var space2_timing = [];
space2_timing[0] = 0;
space2_timing[1] = 1;
space2_timing[2] = 2;


var space3_text = [];
space3_text[0] = "Come here, space.";
space3_text[1] = "I have a secret for you.";
space3_text[2] = "No, come closer.";

var space3_timing = [];
space3_timing[0] = 0;
space3_timing[1] = 1;
space3_timing[2] = 2;


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
space4_timing[1] = 1;
space4_timing[2] = 2;
space4_timing[3] = 3;
space4_timing[4] = 4;
space4_timing[5] = 5;
space4_timing[6] = 6;


var space5_text = [];
space5_text[0] = "Space. Space.";
space5_text[1] = "Space. Space.";
space5_text[2] = "Comets. Stars.";
space5_text[3] = "Galaxies. Orion.";

var space5_timing = [];
space5_timing[0] = 0;
space5_timing[1] = 1;
space5_timing[2] = 2;
space5_timing[3] = 3;


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
space6_timing[1] = 1;
space6_timing[2] = 2;
space6_timing[3] = 3;
space6_timing[4] = 4;
space6_timing[5] = 5;
space6_timing[6] = 6;


var space7_text = [];
space7_text[0] = "Where am I?";
space7_text[1] = "Guess.";
space7_text[2] = "Guess. Guess. Guess.";
space7_text[3] = "I'm in space.";

var space7_timing = [];
space7_timing[0] = 0;
space7_timing[1] = 1;
space7_timing[2] = 2;
space7_timing[3] = 3;


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
space8_timing[1] = 1;
space8_timing[2] = 2;
space8_timing[3] = 3;
space8_timing[4] = 4;
space8_timing[5] = 5;
space8_timing[6] = 6;


var space9_text = [];
space9_text[0] = "SPAAAAAAAAAA";
space9_text[1] = "AAAAAAAAAAAA";
space9_text[2] = "AAAAAAAAAAAA";
space9_text[3] = "AAAAAAAAACE!";

var space9_timing = [];
space9_timing[0] = 0;
space9_timing[1] = 1;
space9_timing[2] = 2;
space9_timing[3] = 3;


// fact core
var fact1_text = [];
fact1_text[0] = "Pants were invented by sailors in the sixteenth century to avoid Poseidon's wrath. It was believed that the sight of naked sailors angered the sea god.";

var fact2_text = [];
fact2_text[0] = "89% of magic tricks are not magic. Technically they are sorcery.";

var fact3_text = [];
fact3_text[0] = "William Shakespeare did not exist. His plays were masterminded in 1589 by Francis Bacon, who used a Ouija board to enslave play-writing ghosts.";

var fact4_text = [];
fact4_text[0] = "It is incorrectly noted that Thomas Edison invented push-ups in 1878. Nikolai Tesla had in fact patented the activity three years earlier, under the name \"Tesla-cize.\"";

var fact5_text = [];
fact5_text[0] = "Whales are twice as intelligent and three times as delicious as humans.";

var fact6_text = [];
fact6_text[0] = "The first commercial airline flight took to the air in 1914. Everyone involved screamed the entire way.";

var fact7_text = [];
fact7_text[0] = "In Greek myth, Prometheus stole fire from the Gods and gave it to humankind. The jewelry he kept for himself.";

var fact8_text = [];
fact8_text[0] = "The first person to prove that cow's milk is drinkable was very, very thirsty.";

var fact9_text = [];
fact9_text[0] = "At some point in their lives 1 in 6 children will be abducted by the Dutch.";


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
  fact1: fact1_text,
  fact2: fact2_text,
  fact3: fact3_text,
  fact4: fact4_text,
  fact5: fact5_text,
  fact6: fact6_text,
  fact7: fact7_text,
  fact8: fact8_text,
  fact9: fact9_text
};
