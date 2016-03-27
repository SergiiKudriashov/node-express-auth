var socket = io('http://localhost:3434');

var addPost = function (post) {

}

// $('#newPostSection').html(window.user.postForm);
// First time wall loading START
socket.on('init-posts', function(data) {
	var profile = $('#profile').data();

	// Only when logined START
	if (profile!==undefined){
		console.log(profile);
		var yourProfile = $('#your-profile').html('<p>'+profile.username+'<p><button class=""></button>');
		var profileInformation = '<div style="width:100px; height:100">'+'<>';
		var postForm = '<div class="form-holder post"><form id="postForm" action>' +
		'<label>Share your post</label><input id="postText" type="text" name="text" placeholder="Type it">'+
		'<input class="post-form-user" type="hidden" name="authorId" value="'+ profile.userid +'">'+
		'<input class="post-form-user" type="hidden" name="authorAvatar" value="'+ profile.avatar +'">'+
		'<input class="post-form-user" type="hidden" name="authorName" value="'+ profile.username +'">'+
		'<button type="submit" class="success button">Fuck yeah!</button>'+
		'</form></div>';

		$('#newPostSection').html(postForm);

	}
	// Only when loggined FIN
	console.log(data);
	var postsIn = data.posts;
	var wall = '';
	var renderer = [];
	postsIn.forEach(function(item, i) {
		console.log();
		wall += '<div class="single-post" id="' + item._id + '">' +
			'<div class="ava-post-holder"><img src="'+ item.authorAvatar +'" alt="' + item.authorName + '" /></div>' +
			'<p class="content-post">'+ item.content.text + '</p>' +
			'<p class="extra-info">'+
			'Author: '+'<span class="post-info"> ' + item.authorName + '</span>'+
			'Posted: '+'<span class="post-info"> ' + item.date.toString() + '</span>' +
			'</p>'+
			'<div class="comment-holder"></div>' +
			'<div class="comment-input"></div>'+
			'</div>';
	});
	$("#wallPost").html(wall);
		if(window.user) {
			// var formId = '.comment-input';
			// var formContent = user.postForm;
			// $(formId).html(formContent);
			// $('.post-form-user .post').attr('value','')
	 }
	 $('#postForm').submit(function(e) {
		 e.preventDefault();
		 console.log($(this).serializeArray());
		 socket.emit('new-post', $(this).serializeArray());
		 $('#postText').val('').focus();
	 });
	 console.log('_____________init post loaded ________________');




})
// First time wall loading START
socket.on('last-post', function(data) {
	console.log(data);
	$('.single-post').last().remove();

});

$(document).ready(function(){
	console.log($('#postForm'));

});



$( window ).load(function() {

});







// '<div class="single-post">'+
// '<p class="content-post">'+content.text+'</p>'+
// '<p class="extra-info">'+
// <span class="post-info">author.name<span class="post-info"> Posted </span>item.data.toUTCString()</p>
//  +'</p>'+



// $( document ).ready( function() {
// 	if (window.userId!==undefined) {
// 		var $postFormUser = $('#post-form-user');
// 		console.log($postFormUser);
// 		// $postFormUser.attr('name', userId);
// 		// console.log($postFormUser);
// 	}
// }
// );

// $(window).bind("load", function() {

//        var footerHeight = 0,
//            footerTop = 0,
//            $footer = $("#footer");

//        positionFooter();

//        function positionFooter() {

//                 footerHeight = $footer.height();
//                 footerTop = ($(window).scrollTop()+$(window).height()-footerHeight)+"px";
//                 console.log(footerHeight,footerTop,$( window ).height());
//                 var positionTop = $( window ).height()-footerHeight;
//                 console.log(footerHeight,footerTop,$( window ).height(), positionTop);
//                 $footer.css({
//                       width: $( window ).width(),
//                       position: "absolute",
//                       top: footerTop
//                 })
//        }

//        $(window)
//                .scroll(positionFooter)
//                .resize(positionFooter)

// });
