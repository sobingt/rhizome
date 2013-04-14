/* decision */

$('#proposal-container').on('click', '.discussion-link', function() {
  loadArguments($(this).parents('.proposal:first').data('id'));
});

$('.new-tab').on('click', function() {
  $('.new-tab').addClass('active');
  $('.unvoted-tab').removeClass('active');
  $('.results-tab').removeClass('active');
  loadProposals('new', false);
});

$('.unvoted-tab').on('click', function() {
  $('.new-tab').removeClass('active');
  $('.unvoted-tab').addClass('active');
  $('.results-tab').removeClass('active');
  loadProposals('unvoted', false);
});

$('.results-tab').on('click', function() {
  $('.new-tab').removeClass('active');
  $('.unvoted-tab').removeClass('active');
  $('.results-tab').addClass('active');
  loadProposals('results', false);
});

/* order can be 'new', 'unvoted' and 'results' */
function loadProposals(order, getProposals) {
  $.getJSON(getProposals ? '/decision/1/' + order + '?proposals' : '/decision/1/' + order, function(data) {
    $('#proposal-list').empty();
    $.each(data.proposals, function(i, proposal) {
      proposals[proposal.id] = proposal;
    });
    $.each(data.order, function(i, id) {
      if (id in proposals) {
        if (order == 'results') {
          $(makeResultProposal(proposals[id], i+1)).appendTo('#proposal-list');
        } else {
          $(makeVotableProposal(proposals[id])).appendTo('#proposal-list');
        }
        addProposalModals(proposals[id]);
      } else {
        $.getJSON('/proposal/' + id, function(proposal) {
          proposals[id] = proposal;
          if (order == 'results') {
            $(makeResultProposal(proposal)).appendTo('#proposal-list');
          } else {
            $(makeVotableProposal(proposal)).appendTo('#proposal-list');
          }
          addProposalModals(proposal);
        });
      }
    });
  });
}

/* vote semaphore */
var voteBlocked = false;

function blockVote() {
  voteBlocked = true;
  window.setTimeout(function() {
    voteBlocked = false;
  }, 1000);
}

/* choice is 'yes' or 'no' */
function vote(id, choice) {
  if (!voteBlocked) {
    blockVote();
    $.each(proposals, function(i, proposal) {
      if (proposal.id == id) {
        $('.proposal[data-id=' + id + ']').fadeOut(200);
        $(makeVotedProposal(proposal, choice)).hide().appendTo('#proposal-list-' + choice).show(500);
        if (choice == 'budget') {
          $('.slider-bar').slider({
            range: 'min'
          });
        }
      }
    });
    updateVotes();
  }
}

function makeVotedProposal(proposal, choice) {
  var proposalHTML = '<div class=\"proposal panel ' +
    choice + '\" data-id=\"' +
    proposal.id + '\"><span class=\"discussion-link\"><a href=\"#\" data-reveal-id=\"discussion-' +
    proposal.id + '\">Discuss (' +
    proposal.argument_count + ')</a></span><div class=\"info\"><h5>' +
    proposal.title + '</h5>';
  if (choice == 'budget') {
    proposalHTML += '<div class=\"slider-bar\"></div>';
  } else { // general ('yes' or 'no')
    if (proposal.content.length > 150) {
      proposalHTML += '<p>' + proposal.content.substring(0,150) + '... <a href=\"#\" data-reveal-id=\"text-' + proposal.id + '\">more</a></p>';
    } else {
      proposalHTML += '<p>' + proposal.content + '</p>';
    }
  }
  proposalHTML += '</div></div>';
  return proposalHTML;
}

/* helper function for makeVotableProposal and makeResultProposal*/
function makeProposal(proposal, isVotable, count) {
  var proposalHTML = '<div class=\"proposal panel\" data-id=\"' +
    proposal.id + '\"><span class=\"discussion-link\"><a href=\"#\" data-reveal-id=\"discussion-' +
    proposal.id + '\">Discuss (' +
    proposal.argument_count + ')</a></span>';
  if (isVotable) {
    proposalHTML += '<div class=\"buttons\"><p><a href=\"#\" class=\"small success button radius vote-yes-button\">Yes</a></p><p><a href=\"#\" class=\"small alert button radius vote-no-button\">No</a></p></div>';
  }
  proposalHTML += '<div class=\"info\"><h5>';
  if (!isVotable) {
    proposalHTML += count.toString() + '. ';
  }
  proposalHTML += proposal.title + '</h5><p>';
  if (proposal.content.length > 120) {
    proposalHTML += proposal.content.substring(0,120) + '... <a href=\"#\" data-reveal-id=\"content-' + proposal.id + '\">more</a>';
  } else {
    proposalHTML += proposal.content;
  }
  proposalHTML += '</p></div></div>';
  return proposalHTML;
}

function makeVotableProposal(proposal) {
  return makeProposal(proposal, true, null);
}

function makeResultProposal(proposal, count) {
  return makeProposal(proposal, false, count);
}

function addProposalModals(proposal) {
  // make content modal
  var contentHTML = '<div id=\"content-' +
    proposal.id + '\" class=\"reveal-modal large\"><h4>' +
    proposal.title + '</h4><dl class=\"sub-nav\"><dd class=\"active\"><dd class=\"active\"><a href=\"#\">Content</a></dd><dd><a href=\"#\" data-reveal-id=\"discussion-' +
    proposal.id + '\">Discussion (' +
    proposal.argument_count + ')</a></dd></dl><p>' +
    proposal.content + '</p><a class=\"close-reveal-modal\">&#215;</a></div>';
  $(contentHTML).appendTo('body');


  var argumentsHTML = '';
  /*
  $.each(proposal.arguments, function(i, argument) {
    addArgument(argument);
  });
  */

  // make discussion modal
  var discussionHTML = '<div id=\"discussion-' +
    proposal.id + '\" class=\"reveal-modal large\"><h4>' +
    proposal.title + '</h4><dl class=\"sub-nav\"><dd class=\"active\"><dd><a href=\"#\" data-reveal-id=\"content-' +
    proposal.id + '\">Content</a></dd><dd class=\"active\"><a href=\"#\">Discussion (' +
    proposal.argument_count + ')</a></dd></dl><ul class=\"argument-list\">' +
    argumentsHTML + '</ul><textarea class=\"new-argument-input\" placeholder=\"Write an argument\"></textarea><a href=\"#\" class=\"small button radius new-argument-button\">Submit</a><a class=\"close-reveal-modal\">&#215;</a></div>';
  $(discussionHTML).appendTo('body');
}

function loadArguments(proposal) {
  $('#discussion-' + proposal + ' .argument-list').empty();
  $.getJSON('/proposal/1/arguments', function(arguments) {
    $.each(arguments, function(i, reply) {
      $(addArgument(reply, '', proposal)).appendTo('#discussion-' + proposal + ' .argument-list');
    });
  });
}

function addArgument(argument, argumentsHTML, proposal) {
  argumentsHTML += '<li><div class=\"argument\"><div class=\"buttons\"><a href=\"#\" class=\"tiny button radius success support-button\">Support</a> <a href=\"#\" class=\"tiny button radius promote-button\">Reply</a></div><span class=\"author\">' +
    argument.author + '</span><span class=\"timestamp\">' +
    argument.timestamp + '</span><p>' +
    argument.content + '</p></div><ul>';
  $.each(argument.replies, function(i, reply) {
    argumentsHTML = addArgument(reply, argumentsHTML, proposal);
  });
  return argumentsHTML + '</ul></li>';
}
