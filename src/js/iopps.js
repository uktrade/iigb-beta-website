module.exports = ioppsToggles

function ioppsToggles() {
  $('.sector-toggle').on('click', function(event) {
    $('#sector-list').show();
  });

  // $('.sector').on('click', function (event) {
  //   var sectorNames = $('.sector-name');
  //   for (var i = 0;i < sectorNames.length; i++) {
  //     sectorNames[i].innerText = event.target.dataset.sector;
  //   }
  //   $('#sector-list').hide();
  // });

  $('.filter-toggle').on('click', function(event) {
    $('#filter-list').show();
  });

  $('.filter').on('click', function(event) {
    $('#filter-list').hide();
  });
}