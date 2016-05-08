/*
* author:tajpure
*/

var editor = null;
var socket = io();
var snackbarContainer = document.querySelector('#snackbar');

function exit() {
  location.href = '/logout';
};

function toast(msg, timeout, handler, actionText) {
  var data = {
    message: msg,
    timeout: timeout,
    actionHandler: handler,
    actionText: actionText
  };
  snackbarContainer.MaterialSnackbar.showSnackbar(data);
};

function doGet(url) {
	$('#progress').fadeIn();
	$.ajax({
		url: url,
		timeout : 3000,
		type: "GET",
		data: {},
		dataType: "html",
		error : function(xhr,textStatus) {
			$('#progress').fadeOut();
			if (textStatus === 'timeout') {
				toast('Timeout!', 5000);
		    } else {
				toast('Failed!', 5000);
		  }
		}
	}).done(function(content) {
		$('#progress').fadeOut();
    var dom = $.parseHTML(content, true);
    componentHandler.upgradeElements(dom);
		$("#content").html(dom);
	});
};

function newPostPage() {
  if (editor) {
    var title = $("#title").val();
    var date = $("#date").val();
    var categories = $("#Categories").tagit("assignedTags");
    var tags = $("#Tags").tagit("assignedTags");
    var content = editor.getValue();
  }
  doGet('/editor');
};

function newPost() {
	var title = $("#title").val();
	var date = $("#date").val();
	var categories = $("#Categories").tagit("assignedTags");
	var tags = $("#Tags").tagit("assignedTags");
	var content = editor.getValue();
	if (title === '' ) {
		toast('Please write title!', 5000);
	} else if (date === '') {
		toast('Please write date!', 5000);
	} else if (content === '') {
		toast('Please write content!', 5000);
	} else {
		var formData = new FormData();
		formData.append('title', title);
		formData.append('date', date);
		formData.append('categories', categories);
		formData.append('tags', tags);
		formData.append('content', content);
		$('#progress').fadeIn();
		$.ajax({
			url: '/newItem',
			timeout : 3000,
			type: "POST",
			data: formData,
      processData: false,
      contentType: false,
			error : function(xhr, textStatus) {
				$('#progress').fadeOut();
				if (textStatus === 'timeout') {
					toast('Timeout!', 5000);
			    } else {
					toast('Failed!', 5000);
			  }
			}
		}).done(function(content) {
      $('#progress').fadeOut();
			if (content === 'success') {
				toast('Publish successful!', 5000);
			} else {
				toast(content, 5000);
			}
		});
	}
};
