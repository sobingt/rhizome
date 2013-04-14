/* decision */

var proposals = {};

$(document).ready(function() {
  loadProposals('unvoted', true);
  $('#proposal-list-yes').sortable({
    update: updateVotes
  });
  $('#proposal-list-no').sortable({
    update: updateVotes
  });
  $('#proposal-list-yes li').disableSelection();
  $('#proposal-list-no li').disableSelection();

  $(document).foundation();
});

$('#proposal-container').on('click', '.vote-yes-button', function() {
  vote($(this).parents('.proposal:first').data('id'), 'yes');
});

$('#proposal-container').on('click', '.vote-no-button', function() {
  vote($(this).parents('.proposal:first').data('id'), 'no');
});

/* update votes */
function updateVotes(event, ui) {
  var proposalListYes = $('#proposal-list-yes').sortable('toArray', {attribute: 'data-id'});
  var proposalListNo = $('#proposal-list-no').sortable('toArray', {attribute: 'data-id'});
  console.log(proposalListYes);
  console.log(proposalListNo);
}
