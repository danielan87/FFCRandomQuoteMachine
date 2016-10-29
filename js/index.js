function insertNewQuote(e) {
  e.preventDefault();
  $.ajax({
    url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
    success: function(data) {
      var post = data.shift(); // The data is an array of posts. Grab the first one.
      $('#quote-title').text("- " + post.title);
      $('#quote-content').html(post.content);

      // If the Source is available, use it. Otherwise hide it.
      if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
        $('#quote-source').html('Source:' + post.custom_meta.Source);
      } else {
        $('#quote-source').text('');
      }
    },
    cache: false
  });
}

function tweetQuote() {
  window.open('https://twitter.com/share?url=google.com&text=blabla', '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
  return false;
}

$(document).ready(function(e) {
  $('#quoteButton').click(function(e2) {
    insertNewQuote(e2);
  });
  $('#quoteButton').trigger('click');
  $("#tweetIt").click(function(e2) {
    this.href = "https://twitter.com/share?url=google.com&text=" + $("#quote-content").text() + " - " + $("#quote-title").text();
    newwindow = window.open($(this).attr('href'), '', 'height=200,width=600,top=' + $(window).height() / 2 + ',left=' + $(window).width() / 2);
    if (window.focus) {
      newwindow.focus()
    }
    return false;
  });
});