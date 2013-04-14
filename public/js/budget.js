/* decision */

var proposals = {};

$(document).ready(function() {
  loadProposals('unvoted', true);
  $(document).foundation();
});

$('#proposal-container').on('click', '.vote-yes-button', function() {
  vote($(this).parents('.proposal:first').data('id'), 'budget');
});

$('#proposal-container').on('click', '.vote-no-button', function() {
  vote($(this).parents('.proposal:first').data('id'), 'no');
});

/* TODO: make array of slider values */
function updateVotes(event, ui) {
}
