/* decision */

var options = {};

$(document).ready(function() {
  loadOptions('unvoted', true);
  $('#option-list-yes').sortable({
    update: updateVotes
  });
  $('#option-list-no').sortable({
    update: updateVotes
  });
  $('#option-list-yes li').disableSelection();
  $('#option-list-no li').disableSelection();

  $(document).foundation();
});

$('#option-list').on('click', '.vote-yes-button', function() {
  voteYes($(this).parents('.option:first').attr('id'));
});

$('#option-list').on('click', '.vote-no-button', function() {
  voteNo($(this).parents('.option:first').attr('id'));
});

$('.discussion-link').on('click', function() {
  loadArguments(2);
});

$('.new-tab').on('click', function() {
  $('.new-tab').addClass('active');
  $('.unvoted-tab').removeClass('active');
  $('.results-tab').removeClass('active');
  loadOptions('new', false);
});

$('.unvoted-tab').on('click', function() {
  $('.new-tab').removeClass('active');
  $('.unvoted-tab').addClass('active');
  $('.results-tab').removeClass('active');
  loadOptions('unvoted', false);
});

$('.results-tab').on('click', function() {
  $('.new-tab').removeClass('active');
  $('.unvoted-tab').removeClass('active');
  $('.results-tab').addClass('active');
  loadOptions('results', false);
});

/* order can be 'new', 'unvoted' and 'results' */
function loadOptions(order, getOptions) {
  $.getJSON(getOptions ? '/decision/1/' + order + '?options' : '/decision/1/' + order, function(data) {
    $('#option-list').empty();
    $.each(data.options, function(i, option) {
      options[option.id] = option;
    });
    $.each(data.order, function(i, id) {
      if (id in options) {
        if (order == 'results') {
          makeResultOption(options[id], i+1);
        } else {
          makeVotableOption(options[id]);
        }
        makeOptionModals(options[id]);
      } else {
        $.getJSON('/option/' + id, function(option) {
          options[id] = option;
          if (order == 'results') {
            makeResultOption(option);
          } else {
            makeVotableOption(option);
          }
          makeOptionModals(option);
        });
      }
    });
  });
}

/* update votes */
function updateVotes(event, ui) {
  var optionListYes = $('#option-list-yes').sortable('toArray');
  var optionListNo = $('#option-list-no').sortable('toArray');
  console.log(optionListYes);
  console.log(optionListNo);
}

/* vote semaphore */
var voteBlocked = false;

function blockVote() {
  voteBlocked = true;
  window.setTimeout(function() {
    voteBlocked = false;
  }, 1000);
}

function voteYes(id) {
  if (!voteBlocked) {
    blockVote();
    $.each(options, function(i, option) {
      if (option.id == id) {
        $('.option#' + id).fadeOut(200);
        var optionHTML = '<div class=\"option yes\" id=\"' +
          option.id + '\"><span class=\"discussion-link\"><a href=\"#\" data-reveal-id=\"discussion-' +
          option.id + '\">Discuss (' +
          option.argument_count + ')</a></span><div class=\"info\"><h5>' +
          option.title + '</h5><p>';
        if (option.content.length > 150) {
          optionHTML += option.content.substring(0,150) + '... <a href=\"#\" data-reveal-id=\"text-' + option.id + '\">more</a>';
        } else {
          optionHTML += option.content;
        }
        optionHTML += '</p></div></div>';
        $(optionHTML).hide().appendTo('#option-list-yes').show(500);
      }
    });
    updateVotes();
  }
}

function voteNo(id) {
  if (!voteBlocked) {
    blockVote();
    $.each(options, function(i, option) {
      if (option.id == id) {
        $('.option#' + id).fadeOut(200);
        var optionHTML = '<div class=\"option no\" id=\"' +
          option.id + '\"><span class=\"discussion-link\"><a href=\"#\" data-reveal-id=\"discussion-' +
          option.id + '\">Discuss (' +
          option.argument_count + ')</a></span><div class=\"info\"><h5>' +
          option.title + '</h5><p>';
        if (option.content.length > 150) {
          optionHTML += option.content.substring(0,150) + '... <a href=\"#\" data-reveal-id=\"content-' + option.id + '\">more</a>';
        } else {
          optionHTML += option.content;
        }
        optionHTML += '</p></div></div>';
        $(optionHTML).hide().appendTo('#option-list-no').show(500);
      }
    });
    updateVotes();
  }
}

/* helper function for makeVotableOption and makeResultOption*/
function makeOption(option, isVotable, count) {
  var optionHTML = '<div class=\"option\" id=\"' +
    option.id + '\"><span class=\"discussion-link\"><a href=\"#\" data-reveal-id=\"discussion-' +
    option.id + '\">Discuss (' +
    option.argument_count + ')</a></span>';
  if (isVotable) {
    optionHTML += '<div class=\"buttons\"><p><a href=\"#\" class=\"small success button radius vote-yes-button\">Yes</a></p><p><a href=\"#\" class=\"small alert button radius vote-no-button\">No</a></p></div>';
  }
  optionHTML += '<div class=\"info\"><h5>';
  if (!isVotable) {
    optionHTML += count.toString() + '. ';
  }
  optionHTML += option.title + '</h5><p>';
  if (option.content.length > 120) {
    optionHTML += option.content.substring(0,120) + '... <a href=\"#\" data-reveal-id=\"content-' + option.id + '\">more</a>';
  } else {
    optionHTML += option.content;
  }
  optionHTML += '</p></div></div>';
  $(optionHTML).appendTo('#option-list');
}

function makeVotableOption(option) {
  makeOption(option, true, null);
}

function makeResultOption(option, count) {
  makeOption(option, false, count);
}

function makeOptionModals(option) {
  // make content modal
  var contentHTML = '<div id=\"content-' +
    option.id + '\" class=\"reveal-modal large\"><h4>' +
    option.title + '</h4><dl class=\"sub-nav\"><dd class=\"active\"><dd class=\"active\"><a href=\"#\">Content</a></dd><dd><a href=\"#\" data-reveal-id=\"discussion-' +
    option.id + '\">Discussion (' +
    option.argument_count + ')</a></dd></dl><p>' +
    option.content + '</p><a class=\"close-reveal-modal\">&#215;</a></div>';
  $(contentHTML).appendTo('body');


  var argumentsHTML = '';
  /*
  $.each(option.arguments, function(i, argument) {
    addArgument(argument);
  });
  */

  // make discussion modal
  var discussionHTML = '<div id=\"discussion-' +
    option.id + '\" class=\"reveal-modal large\"><h4>' +
    option.title + '</h4><dl class=\"sub-nav\"><dd class=\"active\"><dd><a href=\"#\" data-reveal-id=\"content-' +
    option.id + '\">Content</a></dd><dd class=\"active\"><a href=\"#\">Discussion (' +
    option.argument_count + ')</a></dd></dl><ul class=\"argument-list\">' +
    argumentsHTML + '</ul><textarea class=\"new-argument-input\" placeholder=\"Write an argument\"></textarea><a href=\"#\" class=\"small button radius new-argument-button\">Submit</a><a class=\"close-reveal-modal\">&#215;</a></div>';
  $(discussionHTML).appendTo('body');
}

function loadArguments(option) {
  $('#discussion-' + option + ' .argument-list').empty();
  $.getJSON('/option/1/arguments', function(arguments) {
    $.each(arguments, function(i, reply) {
      $(addArgument(reply, '', option)).appendTo('#discussion-' + option + ' .argument-list');
    });
  });
}

function addArgument(argument, argumentsHTML, option) {
  argumentsHTML += '<li><div class=\"argument\"><div class=\"buttons\"><a href=\"#\" class=\"tiny button radius success support-button\">Support</a> <a href=\"#\" class=\"tiny button radius promote-button\">Reply</a></div><span class=\"id\">' +
    argument.id + '</span><span class=\"timestamp\">' +
    argument.timestamp + '</span><p>' +
    argument.content + '</p></div><ul>';
  $.each(argument.replies, function(i, reply) {
    argumentsHTML = addArgument(reply, argumentsHTML, option);
  });
  return argumentsHTML + '</ul></li>';
}
