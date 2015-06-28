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

var isEditor = true;
function showPreview() {
	if (isEditor == true) {
		$('#editor').hide();
		$('#preview').show();
		isEditor = false;
	} else {
		$('#preview').hide();
		$('#editor').show();
		isEditor = true;
	}
}
