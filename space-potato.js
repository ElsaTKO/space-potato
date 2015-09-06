$(document).ready( function() {
  playRadio();
});

var spacecore = $("#spacecore");
var factcore = $("#factcore");

function playRadio() {
  var radio = document.getElementById("radio");
  radio.currentTime = 3.5;
  radio.volume = 0.1;
  // radio.play();
}

$(".char-img").click(function() {
  var character = $(this);
  var others = $(".char-img").not($(this));

  others.removeClass("neutral");
  character.removeClass("neutral");

  others.addClass("unselected");
  character.removeClass("unselected");

  others.removeClass("selected");
  character.addClass("selected");

  // prepare audio clips
  // assemble arrays for each char
  // swap out active array depending on selected

});

$(document).keypress(function() {
  if (spacecore.hasClass("selected")) {
    console.log("space roar");
    var spaaace = document.getElementById("space9");
    spaaace.currentTime = 0;
    spaaace.play();
  } else if (factcore.hasClass("selected")) {
    console.log("fact roar");
    var whales = document.getElementById("fact5");
    whales.currentTime = 0;
    whales.play();
  }
});
