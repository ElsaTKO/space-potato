$(document).ready( function() {
  startRadio();
});

function startRadio() {
  var radio = document.getElementById("radio");
  radio.currentTime = 3.5;
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


});
