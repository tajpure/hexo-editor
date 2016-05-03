/*
* author:tajpure
*/
var $ = require('jquery');

var editor = ace.edit("editor");
var socket = io();
// var snackbarContainer = document.querySelector('#snackbar');

// var exit = function() {
//   location.href = '/logout';
// };

var toast = function(msg, timeout, handler, actionText) {
  var data = {
    message: msg,
    timeout: timeout,
    actionHandler: handler,
    actionText: actionText
  };
  snackbarContainer.MaterialSnackbar.showSnackbar(data);
};

var initEditor = function() {
  editor.setTheme("ace/theme/tomorrow");
  editor.getSession().setUseWrapMode(true);
  editor.$blockScrolling = Infinity;
  // sync();
};

var sync = function() {
  socket.on('init', function (data) {
    editor.setValue(data, 0);
  });
  editor.on('change', function(e) {
    $('#done').css('display', 'none');
    $('#loading').css('display', 'block');
    var syncData = TextSync.sync(editor.getValue());
    socket.emit('syncText', syncData);
    socket.on('syncEnd', function (data) {
      $('#done').css('display', 'block');
      $('#loading').css('display', 'none');
    });
  });
};

var formatBlod = function () {
  var range = editor.selection.getRange();
  var blodText = '**' + editor.getSelectedText() + '**';
  editor.session.replace(range, blodText);
};

var formatItalic = function () {
  var range = editor.selection.getRange();
  var italicText = '*' + editor.getSelectedText() + '*';
  editor.session.replace(range, italicText);
};

var formatListNumbered = function () {
  var range = editor.selection.getRange();
  var formatText = editor.getSelectedText();
  var rows = formatText.split('\n');
  formatText = '';
  for (var i = 1; i <= rows.length; i++) {
    formatText += i + '. ' + rows[i-1] + '\n';
  }
  editor.session.replace(range, formatText);
};

var formatListBulleted = function () {
  var range = editor.selection.getRange();
  var formatText = editor.getSelectedText();
  var rows = formatText.split('\n');
  formatText = '';
  for (var i = 1; i <= rows.length; i++) {
    formatText += '* ' + rows[i-1] + '\n';
  }
  editor.session.replace(range, formatText);
};

var formatQuote = function () {
  var range = editor.selection.getRange();
  var formatText = editor.getSelectedText();
  var rows = formatText.split('\n');
  formatText = '';
  for (var i = 1; i <= rows.length; i++) {
    formatText += '> ' + rows[i-1] + '\n';
  }
  editor.session.replace(range, formatText);
};

var formatCode = function () {
  var range = editor.selection.getRange();
  var italicText = '```\n' + editor.getSelectedText() + '\n```';
  editor.session.replace(range, italicText);
};

var doGet = function(url) {
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

var newPostPage = function() {
  if (editor) {
    var title = $("#title").val();
    var date = $("#date").val();
    var categories = $("#Categories").tagit("assignedTags");
    var tags = $("#Tags").tagit("assignedTags");
    var content = editor.getValue();
  }
  doGet('/editor');
};

var preview = function() {
  if ($('#editor').css('display') === 'block') {
    $('#preview').html(marked(editor.getValue()));
    $('#editor').hide();
    $('#preview').show();
    $('#visibility').text('visibility_off');
  } else {
    $('#editor').show();
    $('#preview').hide();
    $('#visibility').text('visibility');
  }
}
var newPost = function() {
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
