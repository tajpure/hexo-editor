var editor = null;

$(window).unload(function() {
  console.log('save workspace');
});

function initEditor() {
	editor = ace.edit("editor");
	editor.setTheme("ace/theme/tomorrow");
	editor.getSession().setUseWrapMode(true);
	editor.on('change', function(e) {
		var curContent = editor.getValue();
		$("#preview").html(marked(curContent));
	});
}

// $(".button-collapse").sideNav();

var doGet = function(url) {
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
				Materialize.toast('Timeout!', 5000);
		    } else {
				Materialize.toast('Failed!', 5000);
		  }
		}
	}).done(function(content) {
		$('#progress').fadeOut();
		$("#content").html(content);
	});
}

function newPost() {
  if (editor) {
  	var title = $("#title").val();
  	var date = $("#date").val();
  	var categories = $("#Categories").tagit("assignedTags");
  	var tags = $("#Tags").tagit("assignedTags");
  	var content = editor.getValue();
  	if (title || date || categories || tags || content) {
  		// if (!confirm('Do you define to discard this item?')) {
  		// 	return;
  		// }
  	}
  }
	doGet('/newItemPage');
}

function manageItemsPage() {
  doGet('/manageItemsPage');
}

function showPreview() {
	if ($('#preview').css('display') == 'none') {
		$('#editor').hide();
		$('#preview').show();
	} else {
		$('#preview').hide();
		$('#editor').show();
	}
}

function showCategories() {
	if ($('#category-list').css('display') == 'none') {
		$('#category-list').show();
	} else {
		$('#category-list').hide();
	}
}

function showTags() {
	if ($('#tag-list').css('display') == 'none') {
		$('#tag-list').show();
	} else {
		$('#tag-list').hide();
	}
}

function newItem() {
	var title = $("#title").val();
	var date = $("#date").val();
	var categories = $("#Categories").tagit("assignedTags");
	var tags = $("#Tags").tagit("assignedTags");
	var content = editor.getValue();

	if (title == '' ) {
		Materialize.toast('Please write title!', 5000);
	} else if (date == '') {
		Materialize.toast('Please write date!', 5000);
	} else if (content == '') {
		Materialize.toast('Please write content!', 5000);
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
					Materialize.toast('Timeout!', 5000);
			    } else {
					Materialize.toast('Failed!', 5000);
			  }
			}
		}).done(function(content) {
			$('#progress').fadeOut();
			if (content === 'success') {
				Materialize.toast('Publish successful!', 5000);
			} else {
				Materialize.toast(content, 5000);
			}
		});
	}
}

function autoSave() {
	var title = $("#title").val();
	var date = $("#date").val();
	var categories = $("#Categories").tagit("assignedTags");
	var tags = $("#Tags").tagit("assignedTags");
	var content = editor.getValue();
	alert(categories + " " + tags);
}
