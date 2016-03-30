var please = (function() {

	function renderPosts(item, profile) {
		var inner ='',
			lenght;
		if (item.length!==undefined) {
			length = item.length
		} else {
			length = 1;
			item[0] = item;
		}
		for (var i = 0; i < length; i++) {
			var coverTop = '',
				coverBottom = '';
			if (profile!==undefined) {
				// console.log(item[i].authorName);
				// console.log(profile.username);
				if (profile.username == item[i].authorName){
					coverTop = '<div class="my">';
					coverBottom = '</div>';
				}
			}
			var comments = store.countCommentsByPostId(item[i]._id);
			console.log(comments);
			inner += coverTop +'<div class="single-post" id="' + item[i]._id + '">' +
			'<div class="ava-post-holder"><img src="'+ item[i].authorAvatar +'" alt="' + item[i].authorName + '" /></div>' +
			'<p class="content-post">'+ item[i].content.text + '</p>' +
			'<p class="extra-info">'+
			'Author: '+'<span class="post-info"> ' + item[i].authorName + '</span>'+
			'Posted: '+'<span class="post-info"> ' + item[i].date.toString() + '</span>' +
			'</p>'+
			'<div class="comment-holder">';
			inner = renderComment(item[i],comments,inner);
			inner += '</div><div class="comment-input">';
			inner = renderCommentsForms(profile, item[i], inner);
			inner += '</div></div>' + coverBottom;
			}
		return inner;
		console.log(inner);
	}

	function renderCommentsForms(profile, item,inner) {

		if (profile!==undefined) {
			inner += '<div class="row">'+
					'<form class="comment-form" action>' +
						'<div class="small-6 columns">'+
							// '<label>Comment</label>'+
							'<input class="comment-input-text" type="text" name="text" placeholder="Type it">'+
							'<input class="post-form-user" type="hidden" name="authorId" value="'+ profile.userid +'">'+
							'<input class="post-form-user" type="hidden" name="authorAvatar" value="'+ profile.avatar +'">'+
							'<input class="post-form-user" type="hidden" name="authorName" value="'+ profile.username +'">'+
							'<input class="post-form-user" type="hidden" name="post" value="'+ item._id +'">'+
						'</div>'+
						'<div class="small-3 columns">'+
							'<button type="submit" class="success button">Add comment</button>'+
						'</div>'+
						'<div class="small-3 columns">'+
							'<button type="submit" class="success button more-comments">See more</button>'+
						'</div>'+
					'</form>'+
				'</div>';
			return inner;
		} else {
			return inner;
		}
	}

	function renderComment(post, repeat, inner){
		var item = post.comments;
		console.log("renderComment------>");
		console.log(post, repeat);
		if (item.length>0) {
			var length,
				i;
			if (item.length<repeat) {
				length = item.length;
				i = 0;
			} else {
				length = item.length;
				i = length - repeat;
			}
			// for (var i = length - 1; i >= 0; i--) {
			for (i; i < length; i++) {

				if (profile!==undefined && item[i].authorId==profile.userid) {
					inner += '<div class="comment-id ' + item[i]._id + ' tea"><p>';
				} else {
					inner += '<div class="comment-id ' + item[i]._id + '"><p>';
				}

				// if (profile!==undefined && item[i].authorId==profile.userid) {
				//  inner +='<button value="'+item[i]._id + '" id="'+item[i]._id+
				//  '" class="small button '+post._id+' delete" data-num="'+'i'+'">'+
				//  'del</button>'
				// }
				inner += '<span class="post-info"> ' + item[i].authorName + '   </span>'+
							item[i].text +
						'<span class="post-info"> ' + item[i].date.toString() + '</span>';
				if (profile!==undefined && item[i].authorId==profile.userid) {
					inner +='<button value="' + item[i]._id + '" id="'+item[i]._id+'"'
						+'class="tiny button alert '+post._id+' delete" data-num="'+i+'" data-post="'+post._id+'">Del</button>';
					}
				inner +='</p>'+
				'</div>';
				// console.log(item[i]);
			}
			return inner;
			// console.log(inner);
		}
		return inner;
	}

	function renderSingleComment(post, profile, number){
    if (number==undefined){
      var number = post.comments.length -1;
    }
		var item = post.comments[number];
    console.log(post);
    console.log(item);
		var place = post.comments.length-number;
		var inner ='';
		console.log("renderComment------>");
		if (profile!==undefined && item.authorId==profile.userid) {
			inner += '<div class="comment-id ' + item._id + ' tea"><p>';
		} else {
			inner += '<div class="comment-id ' + item._id + '"><p>';
		}
		inner += '<span class="post-info"> ' + item.authorName + '   </span>'+
					item.text +
				'<span class="post-info"> ' + item.date.toString() + '</span>';
		if (profile!==undefined && item.authorId==profile.userid) {
			inner +='<button value="' + item._id + '" id="'+item._id+'"'
				+'class="tiny button alert '+post._id+' delete" data-num="'+number+'" data-post="'+post._id+'">Del</button>';
			}
		inner +='</p>'+
		'</div>';
		return inner;
	}

	function renderPostForm(profile, place) {
		if (profile!==undefined) {
			var inner = '<div class="form-holder post row">'+
							'<form id="postForm" action>' +
								'<div class="small-8 columns">'+
									// '<label>Share your post</label>'+
									'<input id="postText" type="text" name="text" placeholder="Type it">'+
									'<input class="post-form-user" type="hidden" name="authorId" value="'+ profile.userid +'">'+
									'<input class="post-form-user" type="hidden" name="authorAvatar" value="'+ profile.avatar +'">'+
									'<input class="post-form-user" type="hidden" name="authorName" value="'+ profile.username +'">'+
								'</div>'+
								'<div class="small-4 columns">'+
									'<button type="submit" class="success button">Post it</button>'+
								'</div>'+
							'</form>'+
							'<div class="small-6 columns">'+
								'<button id="morePosts" class="success button">See more posts</button>'+
							'</div>'+
							'<div class="small-6 columns">'+
								'<button id="filter" class="success button">See only my posts</button>'+
							'</div>'+
						'</div>';
			$(place).html(inner);
		}
	}

	function refreshComents(profile){

	}

	return {
		renderMyPosts : renderPosts,
		renderMyPostForm : renderPostForm,
		renderMyCommentsForms : renderCommentsForms,
		renderMyComment: renderComment,
		renderSingleComment: renderSingleComment
};

})();

var Store = (function() {
	var storage = {
		id:[],
		com:[]
	};
	var store = [];

	var archive = [];

	var basicConfig = {
		initPosts: 5,
		initComments: 5,
		loadPosts: 5,
		loadComments: 5
	}

	function initStoreConfig(){
		return Array(basicConfig.initPosts+1).join(basicConfig.initComments).split('');
	}

	function createStore(data){
		console.log(data);
		data.forEach(function(item, i){
			storage.id.push(item._id);
			storage.com.push(basicConfig.initComments);
		});
		// console.log(storage);
	}

	function createBestStore(data){
		for (var i = data.length - 1; i >= 0; i--) {
			var key = data[i]._id;
			var obj = {};
			obj[key]=data[i].comments;
			store.push(obj);
		}
		console.log(store);
	}

	function returnComments(id) {
		for (var i = storage.id.length - 1; i >= 0; i--) {
			if (storage.id[i] == id) {
				return storage.com[i];
			}
		}
	}
	function returnBestStorage() {
		return store;
	}

	function returnStorage() {
		var storageCopy = {
			id:[],
			com:[]
		}
		storage.id.forEach(function(item, i){
			storageCopy.id.push(item);
			storageCopy.com.push(storage.com[i]);
		});
		return storageCopy;
	}

	function userProfile() {
		return user
	}

	return {
		userProfile:userProfile,
		createMyStore: createStore,
		createMyBestStore: createBestStore,
		initMyConfig: initStoreConfig,
		countCommentsByPostId: returnComments,
		returnMystorage: returnStorage,
		returnMyBestStorage: returnBestStorage
	}
});


var store = new Store;
var socket = io('http://localhost:3434');
var profile;
	profile = $('#profile').data();
var wallConfig = store.initMyConfig();
var clientData;
console.log(wallConfig);
var basicConfig = {
	initPosts: 5,
	initComments: 5,
	loadPosts: 5,
	loadComments: 5
}
// First time wall loading REQUESTED
socket.emit('first-load',{wallConfig});
// First time wall loading START
socket.on('init-posts', function(data) {

	store.createMyStore(data.posts);
	store.createMyBestStore(data.posts);
	console.log(data.posts);
	// store.createMyBestStore(data.posts);
	clientData = data.posts;
	for (var i = 0; i < clientData.length; i++) {
		clientData[i].commentsAmount = basicConfig.initComments;
	}
	console.log(clientData);
	var profile = $('#profile').data();
	var wall = please.renderMyPosts(data.posts,profile);

	$("#wallPost").html(wall);
	please.renderMyPostForm(profile, '#postFormSection');

	$('#postForm').submit(function(e) {
		e.preventDefault();
		socket.emit('new-post', $(this).serializeArray());
		$('#postText').val('').focus();
	});
	$( ".delete" ).click(function() {
		socket.emit('delete-comment', $(this).val());
	});
	$('.comment-form').submit(function(e) {
		e.preventDefault();
		socket.emit('new-comment', $(this).serializeArray());
		$('.comment-form .comment-input-text').val('');
	});

	$( "#filter" ).click(function() {
		update($('.my'));
	});

	function update(elem) {
		var state = elem.css('display');
		if (state=='block'){
			elem.css('display','none');
		} else {
			elem.css('display','block');
		}
	}

	$('#morePosts').click(function () {
		console.log(basicConfig.loadComments);
		socket.emit('more-posts', {
			toUpload:basicConfig.loadComments,
			alreadyUploaded:clientData.length
		});
	});


	storage = store.returnMystorage();

})
// First time wall loading FIN
// When new post added START


socket.on('last-post', function(data) {

	newestPost = data;
	if (clientData.length >= wallConfig.length) {
		$('.single-post').last().remove();
		clientData.shift();
		wallConfig.shift();
		console.log(wallConfig)
		console.log(clientData);
	}
	var latestPost = please.renderMyPosts(data.post,profile);
		// $('.single-post').first().before(newestPost.post);
		$('#wallPost').prepend(latestPost);
		clientData.push(newestPost.post);
		clientData[clientData.length-1].commentsAmount = basicConfig.initComments;
		wallConfig.push(basicConfig.initComments);
		console.log('Cient data')
		console.log(clientData);
		console.log(wallConfig);



});

socket.on('last-comment', function(data) {
	console.log('new comment added-->');
	var lastComment = data.comment;
	var postid = data.postid
	var selector = '#'+ postid + ' .comment-holder'
	//find link to post
	var findPostById = function (postid){
		for (var i = 0; i < clientData.length; i++) {
			// console.log(clientData[i]._id);
			// console.log(postid);
			if(clientData[i]._id == postid) {
				return clientData[i];
				break;
			}
		}
	}
	var currentPost = findPostById(postid);
	//add new comment to data
	currentPost.comments.push(lastComment)
	//render comment with link to post
	var renderedComment = please.renderSingleComment(currentPost, profile);
	//insert new comment
	$(selector).append(renderedComment);
	//check amount comments
	var commentsSelector = '#'+ postid + ' .comment-id';
	var currentCommentsLength = $(commentsSelector).length;

	var maxAmountComments = currentPost.commentsAmount;
		console.log(maxAmountComments);
		console.log(currentCommentsLength);
	if (maxAmountComments < currentCommentsLength) {
		var topCommentSelector = '#'+ postid + ' .comment-id:first-child';
		 $(topCommentSelector).remove();
	}
  $( document ).ready(function() {
    $( ".delete" ).click(function() {
      socket.emit('delete-comment', $(this).val());
    });
  });


});

socket.on('delete-comment', function(data) {
	console.log('delete-comment-->');
	window.delCommentT = data;
	var commentIdToDelete = data.delComment;
//find element in clientData
	var deleteSelector = '#'+commentIdToDelete;
	var postid = $(deleteSelector).data().post;
	console.log(postid);
	//upload one more element
	var findPostById = function (postid){
		for (var i = 0; i < clientData.length; i++) {
			// console.log(clientData[i]._id);
			// console.log(postid);
			if(clientData[i]._id == postid) {
				return clientData[i];
				break;
			}
		}
	}
	window.currentPost = findPostById(postid);
	var commentNumber = $(deleteSelector).data().num;
	var elem = currentPost.comments[commentNumber];
	currentPost.comments.splice(commentNumber, 1);
	//find element and delete from dom
	var deleteCommentSelector = '.comment-id.'+ commentIdToDelete;
	$(deleteCommentSelector).remove()
	// var loadComentNumber = currentPost.comments.length-currentPost.commentsAmount;
	// if(loadComentNumber>=0){
	// 	console.log('cool');
	// 	window.commentToRender = currentPost.comments[loadComentNumber];
	// 	window.renderedComment = please.renderSingleComment(currentPost,loadComentNumber);
	// 	window.postSelector = '#'+postid+' .comment-holder';
	// 		console.log(postid);
	// 		console.log(postSelector);
	// 	$(postSelector).append(renderedComment);
	// }
	// var commentToRender = currentPost.comments[loadComentNumber];
	// var renderedComment = please.renderMyComment(currentPost,loadComentNumber);
});

socket.on('load-more-posts', function(data) {
	console.log('more-posts-->');
	window.loadmore = data;
	var morePosts = please.renderMyPosts(data.posts,profile);
	console.log(morePosts);
	$('#wallPost').append(morePosts);
});
