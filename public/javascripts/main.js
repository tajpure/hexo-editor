/*
* author:tajpure
*/

function afterIndexPage() {
    $('#left').animate({left: "0"}, 0);
    $('#menu-btn').click(function() {
      if ($('#left').css('display') === 'none') {
        $('#left').show();
        $('#left').animate({left: "0"}, 200);
      } else {
        $('#left').animate({left: "-14%"}, 200, function() {
          $('#left').hide();
        });
      }
    });
    $('.left-menu-row').click(function() {
      $('.left-menu-row').removeClass('active');
      $(this).addClass('active');
    });
}

function afterPostPage() {
  $(document).ready(function(){
    $(".collapsible-header-right button").click(function(e) {
       e.stopPropagation();
    })
  });
  $('.collapsible-header').each(function(index){
    var isOpened = false;
    var id = $(this).attr('id');
    var key = $(this).attr('key');
    $(this).click(function() {
      $('.collapsible-body').each(function() {
        $(this).hide();
      });
      if (isOpened) {
        isOpened = false;
      } else {
        $.get('post?id=' + key, function(data) {
          $('#article-' + id + ' .collapsible-body').slideDown(60, "linear", function() {
            var className = '#article-' + id + ' .collapsible-body .markdown-body';
            $(className).html('');
            $(className).append(marked(data));
          });
        });
        isOpened = true;
      }
    });
  });
}

function exit() {
  location.href = '/logout';
};

function toast(msg, timeout, handler, actionText) {
  var snackbarContainer = document.querySelector('#snackbar');
  var data = {
    message: msg,
    timeout: timeout,
    actionHandler: handler,
    actionText: actionText
  };
  snackbarContainer.MaterialSnackbar.showSnackbar(data);
};

function edit(event, key) {
  if (!event) {
    alert("Your current browser isn't supported.");
    return;
  }
  if (event.stopPropagation) {
    event.stopPropagation();
  } else {
    event.cancelBubble = true;
  }
  location.href = '/editor?id=' + key;
};

function posts() {
  $.get('page/posts', function(data) {
    $('#workspace').text('POSTS');
    var compiledDOM = $.parseHTML(data, true);
    $('#main').html(compiledDOM);
    componentHandler.upgradeDom();
  });
}

function drafts() {
  $.get('page/drafts', function(data) {
    $('#workspace').text('DRAFTS');
    var compiledDOM = $.parseHTML(data, true);
    $('#main').html(compiledDOM);
    componentHandler.upgradeDom();
  });
}

function trash() {
  $.get('page/trash', function(data) {
    $('#workspace').text('TRASH');
    var compiledDOM = $.parseHTML(data, true);
    $('#main').html(compiledDOM);
    componentHandler.upgradeDom();
  });
}

function stash(key, id) {
  $('#article-' + id).remove();
};

function _delete(key, id) {
  $('#article-' + id).remove();
};
