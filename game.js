var buttonColors=["red","blue","green","yellow"];

var pattern=[];
var userpattern=[];

var level=0;

start();

function nextSequence()
{
    var random1=Math.floor(Math.random()*4);
    var color=buttonColors[random1];
    level++;
    pattern.push(color);
    animatePress(color);
    sound(color);
    $("h1").text("Level "+ level);
}

function check(pressedcolor)
{
    if(pressedcolor===pattern[userpattern.length-1])
    {
        if(userpattern.length<pattern.length)
        {
            //continue to check
        }
        else{
              userpattern=[];
              setTimeout(nextSequence,1000);
            }
   }
   else
   {
       var audio1=new Audio('sounds/wrong.mp3');
       audio1.play();
       $("body").addClass("game-over");
       setTimeout(function()
       {
        $("body").removeClass("game-over");   
       },200);
       startOver();
   }
}


$(".btn").on('click',function(){
    var pressedcolor=this.id;
    userpattern.push(pressedcolor);
    animatePress(pressedcolor)
    sound(pressedcolor);
    check(pressedcolor);
});

function start()
 {
     $("body").one("keypress",function(){
       nextSequence();
     });
}

function sound(color)
{
    var audio=new Audio('sounds/'+color+'.mp3');
    audio.play();
}


function animatePress(color)
{

    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    },100);
}

function startOver()
{
    pattern=[];
    userpattern=[];
    $("h1").text("Game Over,Press A Key to Start");
    level=0;
    start();
}