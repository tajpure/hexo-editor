var eidtor = null;

function initEditor() {
	editor = ace.edit("editor");
	editor.setTheme("ace/theme/twilight");
	editor.getSession().setUseWrapMode(true);
	editor.on('change', function(e) {
		var curContent = editor.getValue();
		$("#preview").html(marked(curContent));
	});
}

$(".button-collapse").sideNav();

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
				Materialize.toast('Success', 5000);
		    } else {
				Materialize.toast('Failed', 5000);
		  }
		}
	}).done(function(content) {
		$('#progress').fadeOut();
		$("#content").html(content);
	});
}

function newItemPage() {
	doGet('/newItemPage');
}

function manageItemsPage() {

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
