/*
* author:tajpure
*/

function afterLoginLoad() {
  setTimeout(function(){
        $("#password").focus();
        componentHandler.upgradeDom();
        if($("#username").val().length === 0) {
            $("#password").blur();
            componentHandler.upgradeDom();
        }
  },100);
}

function afterIndexLoad() {
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
    checkSystem();
}

function afterPostPage() {
  $(document).ready(function(){
    $(".collapsible-header-right button").click(function(e) {
       e.stopPropagation();
    })
  });
  $('.collapsible-header').each(function(index){
    var id = $(this).attr('id');
    var key = $(this).attr('key');
    var className = '#article-' + id + ' .collapsible-body';
    window.hexoEditorLastId = null;
    $(this).click(function() {
      if (window.hexoEditorLastId !== id) {
        $('.collapsible-body').each(function() {
          $(this).hide();
        });
        window.hexoEditorLastId = id;
        startLoading();
      }
      if ($(className).is(":visible")) {
        $(className).hide();
      } else {
        $.get('post?id=' + key, function(data) {
          data = marked(data);
          $(className + ' .markdown-body').html('');
          $(className + ' .markdown-body').append(data);
          $('#article-' + id + ' .collapsible-body').slideDown(60, "linear", function(){
            $(className).find('pre').each(function(i, e) {
              hljs.highlightBlock(e);
            });
            stopLoading();
          });
        });
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
    stopLoading();
    toast(data, 2000);
  });
}

function deploy() {
  startLoading();
  $.get('deploy', function(data) {
    stopLoading();
    toast(data, 2000);
  });
}

function startLoading() {
  $('#progress').css('visibility', 'visible');
}

function stopLoading() {
  $('#progress').css('visibility', 'hidden');
}

function help() {
  window.open('https://github.com/tajpure/hexo-editor/wiki', '_blank');
};

function checkSystem() {
  if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
    $('header').css('min-width', '1200px');
    $('#content').css('min-width', '1200px');
    $('#left').css('min-width', '160px');
  }
}
