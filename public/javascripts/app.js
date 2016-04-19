/*
* author:tajpure
*/
(function() {
  var self = this;
  var editor = null
  var snackbarContainer = document.querySelector('#snackbar');
  self.exit = function() {
    location.href = '/logout';
  };
  self.toast = function(msg, timeout, handler, actionText) {
    var data = {
      message: msg,
      timeout: timeout,
      actionHandler: handler,
      actionText: actionText
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  };
  self.initEditor = function() {
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/tomorrow");
    editor.getSession().setUseWrapMode(true);
    editor.$blockScrolling = Infinity;
    self.sync();
  };
  self.sync = function() {
    var socket = io();
    socket.on('init', function (data) {
      editor.setValue(data, 0);
    });
    editor.on('change', function(e) {
      $('#done').css('display', 'none');
      $('#loading').css('display', 'block');
      var syncData = self.TextSync.sync(editor.getValue());
      socket.emit('syncText', syncData);
      socket.on('syncEnd', function (data) {
        $('#done').css('display', 'block');
        $('#loading').css('display', 'none');
      });
    });
  };
  self.formatBlod = function () {
    var range = editor.selection.getRange();
    var blodText = '**' + editor.getSelectedText() + '**';
    editor.session.replace(range, blodText);
  };
  self.formatItalic = function () {
    var range = editor.selection.getRange();
    var italicText = '*' + editor.getSelectedText() + '*';
    editor.session.replace(range, italicText);
  };
  self.formatListNumbered = function () {
    var range = editor.selection.getRange();
    var formatText = editor.getSelectedText();
    var rows = formatText.split('\n');
    formatText = '';
    for (var i = 1; i <= rows.length; i++) {
      formatText += i + '. ' + rows[i-1] + '\n';
    }
    editor.session.replace(range, formatText);
  };
  self.formatListBulleted = function () {
    var range = editor.selection.getRange();
    var formatText = editor.getSelectedText();
    var rows = formatText.split('\n');
    formatText = '';
    for (var i = 1; i <= rows.length; i++) {
      formatText += '* ' + rows[i-1] + '\n';
    }
    editor.session.replace(range, formatText);
  };
  self.formatQuote = function () {
    var range = editor.selection.getRange();
    var formatText = editor.getSelectedText();
    var rows = formatText.split('\n');
    formatText = '';
    for (var i = 1; i <= rows.length; i++) {
      formatText += '> ' + rows[i-1] + '\n';
    }
    editor.session.replace(range, formatText);
  };
  self.formatCode = function () {
    var range = editor.selection.getRange();
    var italicText = '```\n' + editor.getSelectedText() + '\n```';
    editor.session.replace(range, italicText);
  }
  self.doGet = function(url) {
  	$('#progress').fadeIn();
  	$.ajax({
  		url: url,
  		timeout : 3000,
  		type: "GET",
  		data: {},
  		dataType: "html",
  		error : function(xhr,textStatus){
  			$('#progress').fadeOut();
  			if (textStatus=='timeout') {
  				toast('Timeout!', 5000);
  		    } else {
  				toast('Failed!', 5000);
  		  }
  		}
  	}).done(function(content) {
  		$('#progress').fadeOut();
      var dom = jQuery.parseHTML(content, true);
      componentHandler.upgradeElements(dom);
  		$("#content").html(dom);
  	});
  };

  self.newPostPage = function() {
    if (editor) {
      var title = $("#title").val();
      var date = $("#date").val();
      var categories = $("#Categories").tagit("assignedTags");
      var tags = $("#Tags").tagit("assignedTags");
      var content = editor.getValue();
    }
    doGet('/editor');
  };

  self.preview = function() {
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
  self.newPost = function() {
  	var title = $("#title").val();
  	var date = $("#date").val();
  	var categories = $("#Categories").tagit("assignedTags");
  	var tags = $("#Tags").tagit("assignedTags");
  	var content = editor.getValue();
  	if (title == '' ) {
  		toast('Please write title!', 5000);
  	} else if (date == '') {
  		toast('Please write date!', 5000);
  	} else if (content == '') {
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
  			error : function(xhr,textStatus){
  				$('#progress').fadeOut();
  				if (textStatus=='timeout') {
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
  }
}).call(this);
