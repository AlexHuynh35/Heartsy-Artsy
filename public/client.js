// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  console.log('hello world :o')
  
$("form.signup").hide();

$("#login").click(function() {
    $("form.login").show();
    $("form.signup").hide();
    console.log("buttonworkinglogin");
});

$("#signup").click(function() {
    $("form.login").hide();
    $("form.signup").show();
    console.log("buttonworkingsignup");
});
 $("form.signup").submit(function(event) {
    event.preventDefault();
    var username = $('#signupusername').val();
    var password = $('#signuppassword').val();
    $('input#signupusername').val('');
    $('input#signuppassword').val('');
    $.post('/signup?' + $.param({username: username, password: password}), function() {
      // do something with the message that comes back!
      
      $('input').focus();
    });
  });

$("form.login").submit(function(event) {
    event.preventDefault();
    var username = $('#username').val();
    var password = $('#password').val();
    $('input#username').val('');
    $('input#password').val('');
    $.post('/login?' + $.param({username: username, password: password}), function() {
      // do something with the message that comes back!   
      
      $('input').focus();
    });
  });


})
