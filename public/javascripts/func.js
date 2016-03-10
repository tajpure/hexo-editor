// $(".button-collapse").sideNav();
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

function autoSave() {
	var title = $("#title").val();
	var date = $("#date").val();
	var categories = $("#Categories").tagit("assignedTags");
	var tags = $("#Tags").tagit("assignedTags");
	var content = editor.getValue();
	alert(categories + " " + tags);
}
