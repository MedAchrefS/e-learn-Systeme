$(function(){
    GenBoard();
    $('.board').on('click', 'div', function(){
      if (CheckChoice($(this))) {
        CorrectChoice();
        GenBoard();
      }
      else {
        IncorrectChoice();
      }
    });
    function CheckChoice(c) {
      if (c.hasClass('correct')) {
        return true;
      }
      else {
        return false;
      }
    }
    function GenBoard() {
      $('.correct').removeClass('correct');
      var $boardLeft = $('.left');
      var $boardRight = $('.right');
      var t = Math.random();
      $boardLeft.css('background-color', MakeHSL(GenHue(t)));
      $boardRight.css('background-color', MakeHSL(GenHue((t <= 0.5 ? 1 : 0))));
      if (Math.random() <= 0.5) {
        $boardLeft.addClass('correct');
        t = (t <= 0.5 ? 'Warm' : 'Cool');
      }
      else {
        $boardRight.addClass('correct');
        t = (t <= 0.5 ? 'Cool' : 'Warm');
      }
      $('.temperature').text(t + ' Color');
    }
    function MakeHSL(hue) {
      return "hsl(" + hue.toString() + ", 85%, 55%)";
    }
    function GenHue(temp) {
      var t;
      if (temp <= 0.5) {
        t = RandomIntFromInterval(0, 60);
        if (t < 0) {
          t = NormalizeAngle(t);
        }
      }
      else {
        t = RandomIntFromInterval(80, 300);
      }
      return t;
    }
    function NormalizeAngle(x) {
      return (((x % 360) + 360) % 360);
    }
    function CorrectChoice() {
      $('.feedback').text('Great job!');
      $('.correct').removeClass('correct');
    }
    function IncorrectChoice() {
      $('.feedback').text('Not quite :(')
    }
    function RandomIntFromInterval(min,max) {
      return Math.floor(Math.random()*(max-min+1)+min);
    }
  });