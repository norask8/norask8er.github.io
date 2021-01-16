$(function() {
  $('.index-btn').click(function() {
    $('.active').removeClass('active');
    var clickedIndex = $('.index-btn').index($(this));
    $('.slide').eq(clickedIndex).addClass('active');
  });
});

$(function() {
  $('.index-btn2').click(function() {
    $('.act').removeClass('act');
    var clickedIndex = $('.index-btn2').index($(this));
    $('.manga').eq(clickedIndex).addClass('act');
  });
});
