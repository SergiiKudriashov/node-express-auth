var socket = io('http://localhost:3434');
socket.on('init-posts', function(data) {
	console.log(data);
	var postsIn = data.posts;
	console.log($('#'));
	var wall = '';
	var renderer = [];
	postsIn.forEach(function(item, i) {
		wall += '<div class="single-post" id="' + item._id + '">' +
			'<div class="ava-post-holder"><img src=' + item.authorAvatar +
			' alt="' + item.authorName + '" /></div>' +
			'<p class="content-post">' +
			item.content.text + '</p>' +
			'<p class="extra-info">Author: ' +
			'<span class="post-info">' + item.authorName + '</span>  Posted: ' +
			'<span class="post-info">' + item.data.toString() + '</span>' +
			'</p></div>' +
			'<div id="' + item._id + '-comment" class="comment-form-holder"></div>' +
			'<div id="' + item._id + '-input" class="comment-input"></div>';
	});
	$("#wallPost").html(wall);
		if(window.user) {
			var formId = '.comment-input';
			var formContent = user.postForm;
			$(formId).html(formContent);
			// $('.post-form-user .post').attr('value','')
	 }
})


$('#postForm').submit(function(e) {
	e.preventDefault();
	socket.emit('new-post', $(this).serializeArray());
	$('#postText').val('').focus();
});

$( window ).load(function(renderer) {

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