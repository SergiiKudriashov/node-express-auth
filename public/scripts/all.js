var please = (function() {

	function renderPosts(item) {
		var inner ='',
			lenght;
		if (item.length!==undefined) {
			length = item.length
		} else {
			length = 1;
			item[0] = item;
		}
		for (var i = 0; i < length; i++) {
		inner += '<div class="single-post" id="' + item[i]._id + '">' +
			'<div class="ava-post-holder"><img src="'+ item[i].authorAvatar +'" alt="' + item[i].authorName + '" /></div>' +
			'<p class="content-post">'+ item[i].content.text + '</p>' +
			'<p class="extra-info">'+
			'Author: '+'<span class="post-info"> ' + item[i].authorName + '</span>'+
			'Posted: '+'<span class="post-info"> ' + item[i].date.toString() + '</span>' +
			'</p>'+
			'<div class="comment-holder"></div>' +
			'<div class="comment-input"></div>'+
			'</div>';
			}
		return inner;
	}
	
	return {
		renderMyPosts : renderPosts
};

})();

var socket = io('http://localhost:3434');
var wallConfig = Array(5).join(3).split('');
console.log(wallConfig);

// First time wall loading START
socket.on('init-posts', function(data) {
	var profile = $('#profile').data();

	// Only when logined START
	if (profile!==undefined){
		// console.log(profile);
		var yourProfile = $('#your-profile').html('<p>You are: <span class="you-are">'+profile.username+'</span></p>');
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
	var wall = please.renderMyPosts(data.posts);

	$("#wallPost").html(wall);

	//
	 $('#postForm').submit(function(e) {
		 e.preventDefault();
		 socket.emit('new-post', $(this).serializeArray());
		 $('#postText').val('').focus();
	 });

})
// First time wall loading FIN

// When new post added START
socket.on('last-post', function(data) {
	// console.log('------common-------');
	// console.log(data);
	window.newestPost = data;
	if ($('.single-post').length >= wallConfig.length) {
		$('.single-post').last().remove();
	}
	var latestPost = please.renderMyPosts(data.post);
	$('.single-post').first().before(latestPost);
});
// When new post added FIN 
// $(document).ready(function(){

// });

// $( window ).load(function() {

// });







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
