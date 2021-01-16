$(function() {
  $('.buttom').mouseover(function(){
    $('.buttom_active').removeClass('buttom_active');
  }).mouseout(function(){
    $('.active').addClass('buttom_active');
    //$('.buttom_active').css('background-color','#c1c1c1');
  })
});
