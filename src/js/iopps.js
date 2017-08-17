module.exports = ioppsToggles

function ioppsToggles() {
  $('.sector-toggle').on('click', function(event) {
    $('#sector-list').show();
  });

  $('.filter-toggle').on('click', function(event) {
    $('#filter-list').show();
  });

  $('.filter').on('click', function(event) {
    $('#filter-list').hide();
  });
}