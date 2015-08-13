var map = {
  'category' : getParam('category'),
  'tags'     : getParam('tags')
};

$.each(map, function(type, value) {
  if (value !== null) {
    $.getJSON('/search.json', function(data) {
      posts = filterPostsByPropertyValue(data, type, value);
      if (posts.length === 0) {
        // Display 'no results found' or similar here
        noResultsPage();
      } else {
        layoutResultsPage(type, value, posts);
      }
    });
  }
});
