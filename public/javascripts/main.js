/*
* author:tajpure
*/

function afterIndexPage() {
    if (window.screen.width <= 768) {
      $('#left').css('left', '-48%');
      $('#main').click(function() {
        $('#left').animate({left: "-48%"}, 60);
      });
      $('#left').click(function() {
        $('#left').animate({left: "-48%"}, 60);
      });
    }
    $('#menu-btn').click(function() {
      console.log($('#left').css('left'));
      if ($('#left').css('left') === '0px') {
        if (window.screen.width <= 768) {
          $('#left').animate({left: "-48%"}, 60);
        } else {
          $('#left').animate({left: "-14%"}, 60);
        }
      } else {
        $('#left').animate({left: "0"}, 60);
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
          var className = '#article-' + id + ' .collapsible-body .markdown-body';
          data = marked(data);
          $(className).html('');
          $(className).append(data);
          $('#article-' + id + ' .collapsible-body').slideDown(60, "linear", function(){
            $(className).find('pre').each(function(i, e) {
              hljs.highlightBlock(e);
            });
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
  stopEvent(event)
  location.href = '/editor?id=' + key;
};

function stopEvent(event) {
    if (!event) {
      alert("Your current browser isn't supported.");
      return;
    }
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
}

function publish0(key, id) {
  var workspace = $('#workspace').text();
  $('#article-' + id).remove();
  $.get('editor/publish?workspace=' + workspace + '&id=' + key, function(data) {
    toast(data, 1000);
  });
};

function stash(key, id) {
  var workspace = $('#workspace').text();
  $('#article-' + id).remove();
  $.get('editor/stash?workspace=' + workspace + '&id=' + key, function(data) {
    toast(data, 1000);
  });
};

/* Delete post permanently */
function _delete0(event, key, id) {
  stopEvent(event);
  if (confirm('This article will be deleted permanently!')) {
    $('#article-' + id).remove();
    $.get('editor/delete0?id=' + key);
  }
};

/* Move post the trash */
function _delete(key, id) {
  var workspace = $('#workspace').text();
  $('#article-' + id).remove();
  $.get('editor/delete?workspace=' + workspace + '&id=' + key, function(data) {
    toast(data, 1000);
  });
};

function posts() {
  $.get('page/posts', function(data) {
    $('#workspace').text('posts');
    $('#main').html(data);
    componentHandler.upgradeDom();
  });
}

function drafts() {
  $.get('page/drafts', function(data) {
    $('#workspace').text('drafts');
    $('#main').html(data);
    componentHandler.upgradeDom();
  });
}

function trash() {
  $.get('page/trash', function(data) {
    $('#workspace').text('trash');
    $('#main').html(data);
    componentHandler.upgradeDom();
  });
}

function generate() {
  startLoading();
  $.get('generate', function(data) {
    stopLoad();
    toast(data, 2000);
  });
}

function deploy() {
  startLoading();
  $.get('deploy', function(data) {
    stopLoad();
    toast(data, 2000);
  });
}

function startLoading() {
  $('#progress').css('visibility', 'visible');
}

function stopLoad() {
  $('#progress').css('visibility', 'hidden');
}

function help() {
  window.open('https://github.com/tajpure/hexo-editor/wiki', '_blank');
}
