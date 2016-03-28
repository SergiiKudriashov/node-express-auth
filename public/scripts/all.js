var client = (function() {
	var store = {
		clientStore:[],
		profile:{},
		config: {
			id:[],
			com:[]
		},
		visual:[]
	}

	var basicConfig = {
		visiblePosts: 5,
		visibleComments: 3,
		loadPosts: 5,
		loadComments: 5
	}

	function initVisualConfig(){
		store.visual = Array(basicConfig.visiblePosts+1).join(basicConfig.visibleComments).split('');
		console.log('store.visual');
		console.log(store.visual);
		console.log(store);
	}

	function setStore(data){
		store.clientStore = data;
	}

	function getStore(){
		return store.clientStore;
	}

	function Profile(data){
		store.profile = data;
	}

	function getVisual(){
		var arr = store.visual;
		return arr
	}

	function init(data) {
		data.forEach(function(item, i){
			storage.id.push(item._id);
			storage.com.push(basicConfig.initComments);
		});
	}

	initVisualConfig()

	return {
		setStore:setStore,
		getStore:getStore,
		initConfig:init,
		getVisualConfig: getVisual

};
})();

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
			var comments = store.returnMyComments(item[i]._id);
			// console.log(comments);
			inner += '<div class="single-post" id="' + item[i]._id + '">' +
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
			inner += '</div></div>';
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
		console.log(item.length, repeat);
		if (item.length>0) {
			var	length,
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
					inner += '<div class="comment-id tea"><p>';
				} else {
					inner += '<div class="comment-id"><p>';
				}

				// if (profile!==undefined && item[i].authorId==profile.userid) {
				// 	inner +='<button value="'+item[i]._id + '" id="'+item[i]._id+
				// 	'" class="small button '+post._id+' delete" data-num="'+'i'+'">'+
				// 	'del</button>'
				// } 
				inner += '<span class="post-info"> ' + item[i].authorName + '   </span>'+
							item[i].text + 
						'<span class="post-info"> ' + item[i].date.toString() + '</span>';
				if (profile!==undefined && item[i].authorId==profile.userid) {
					inner +='<button value="'+item[i]._id + '" id="'+item[i]._id+'"'
						+'class="small button alert '+post._id+' delete" data-num="'+'i'+'">Del</button>';
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

	function renderPostForm(profile, place) {
		if (profile!==undefined) {
			var inner = '<div class="form-holder post row">'+
							'<div class="small-2 columns">'+
								'<button id="morePosts" class="success button">See more posts</button>'+
							'</div>'+
							'<form id="postForm" action>' +
								'<div class="small-8 columns">'+
									// '<label>Share your post</label>'+
									'<input id="postText" type="text" name="text" placeholder="Type it">'+
									'<input class="post-form-user" type="hidden" name="authorId" value="'+ profile.userid +'">'+
									'<input class="post-form-user" type="hidden" name="authorAvatar" value="'+ profile.avatar +'">'+
									'<input class="post-form-user" type="hidden" name="authorName" value="'+ profile.username +'">'+
								'</div>'+
								'<div class="small-2 columns">'+
									'<button type="submit" class="success button">Post it</button>'+
								'</div>'+
							'</form>'+
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
		renderMyComment: renderComment
};

})();

var store = (function() {
	var storage = {
		id:[],
		com:[]
	};
	var store = [];

	var archive = [];

	var basicConfig = {
		initPosts: 5,
		initComments: 3,
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
		console.log(store);
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

	return {
		createMyStore: createStore,
		createMyBestStore: createBestStore,
		initMyConfig: initStoreConfig,
		returnMyComments: returnComments,
		returnMystorage: returnStorage,
		returnMyBestStorage: returnBestStorage
};
})();


var socket = io('http://localhost:3434');
var storage;
var profile = $('#profile').data();
var wallConfig = store.initMyConfig();

// console.log(wallConfig);
// First time wall loading REQUESTED
socket.emit('first-load',{wallConfig});
// First time wall loading START
socket.on('init-posts', function(data) {
	client.setStore(data.posts);
	var Store = client.getStore(data.posts);
	console.log(Store);

	store.createMyStore(data.posts);
	client.setStore(data.posts);
	console.log(data.posts);
	// store.createMyBestStore(data.posts);
	window.initialize = data.posts;
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
		$('.comment-form .comment-input-text').val('').focus();
	});
	storage = store.returnMystorage();
})
// First time wall loading FIN
// When new post added START
socket.on('last-post', function(data) {
	window.newestPost = data;
	if ($('.single-post').length >= wallConfig.length) {
		$('.single-post').last().remove();
	}
	var latestPost = please.renderMyPosts(data.post,profile);
	$('.single-post').first().before(latestPost);
});

socket.on('last-comment', function(data) {
	console.log('Comment-->');
	window.lastComment = data;
});

socket.on('delete-comment', function(data) {
	console.log('delete-comment-->');
	window.delComment = data;

});

$( document ).ready(function() {
	window.storeBest = store.returnMyBestStorage();
});
