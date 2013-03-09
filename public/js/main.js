/* decision */

var options;

$(document).ready(function() {
  loadOptions();
  $('#option-list-yes').sortable({
    update: updateYesVotes
  });
  $('#option-list-no').sortable({
    update: updateNoVotes
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

/* load options */
function loadOptions() {
  $.getJSON('dev/demo.json', function(data) {
    options = data.options;
    $.each(data.options, function(i, option) {
      addOptionToList(option);
      addOptionModals(option);
    });
  });
}

function addOptionToList(option) {
  // add to option list
  var optionHTML = '<div class=\"option\" id=\"' +
    option.id + '\"><span class=\"discussion-link\"><a href=\"#' + option.id + '\" data-reveal-id=\"discussion-' +
    option.id + '\">Discuss (' +
    option.argument_count + ')</a></span><div class=\"buttons\"><p><a href=\"#\" class=\"small success button radius vote-yes-button\">Yes</a></p><p><a href=\"#\" class=\"small alert button radius vote-no-button\">No</a></p></div><div class=\"info\"><h5>' +
    option.title + '</h5><p>';
  if (option.content.length > 120) {
    optionHTML += option.content.substring(0,120) + '... <a href=\"#\" data-reveal-id=\"content-' + option.id + '\">more</a>';
  } else {
    optionHTML += option.content;
  }
  optionHTML += '</p></div></div>';
  $(optionHTML).appendTo('#option-list');
}

function addOptionModals(option) {
  // add content modal
  var contentHTML = '<div id=\"content-' +
    option.id + '\" class=\"reveal-modal large\"><h4>' +
    option.title + '</h4><dl class=\"sub-nav\"><dd class=\"active\"><dd class=\"active\"><a href=\"#\">Content</a></dd><dd><a href=\"#\" data-reveal-id=\"discussion-' +
    option.id + '\">Discussion (' +
    option.argument_count + ')</a></dd></dl><p>' +
    option.content + '</p><a class=\"close-reveal-modal\">&#215;</a></div>';
  $(contentHTML).appendTo('body');

  function addArgument(argument) {
    argumentsHTML += '<li><div class=\"argument\"><div class=\"buttons\"><a href=\"#\" class=\"tiny button radius success support-button\">Support</a> <a href=\"#\" class=\"tiny button radius promote-button\">Reply</a></div><span class=\"id\">' +
      argument.id + '</span><span class=\"timestamp\">' +
      argument.timestamp + '</span><p>' +
      argument.content + '</p></div><ul>';
    $.each(argument.replies, function(i, argument) {
      addArgument(argument);
    });
    argumentsHTML += '</ul></li>';
  }

  var argumentsHTML = '';
  $.each(option.arguments, function(i, argument) {
    addArgument(argument);
  });

  // add discussion modal
  var discussionHTML = '<div id=\"discussion-' +
    option.id + '\" class=\"reveal-modal large\"><h4>' +
    option.title + '</h4><dl class=\"sub-nav\"><dd class=\"active\"><dd><a href=\"#\" data-reveal-id=\"content-' +
    option.id + '\">Content</a></dd><dd class=\"active\"><a href=\"#\">Discussion (' +
    option.argument_count + ')</a></dd></dl><ul class=\"argument-list\">' +
    argumentsHTML + '</ul><textarea class=\"new-argument-input\" placeholder=\"Write an argument\"></textarea><a href=\"#\" class=\"small button radius new-argument-button\">Submit</a><a class=\"close-reveal-modal\">&#215;</a></div>';
  $(discussionHTML).appendTo('body');
}

/* update votes */
function updateYesVotes(event, ui) {
  //alert(ui.item.index());
}

function updateNoVotes(event, ui) {
  //alert(ui.item.index());
}

/* vote semaphore */
var voteBlocked = false;

function blockVote() {
  voteBlocked = true;
  window.setTimeout(function() {
    voteBlocked = false;
  }, 1000);
}

/* vote yes */
function voteYes(id) {
    if (!voteBlocked) {
      blockVote();
      $.each(options, function(i, option) {
        if (option.id == id) {
          $('.option#' + id).fadeOut(200);
          var optionHTML = '<div class=\"option yes\"><p class=\"discussion-link\"><a href=\"#\" data-reveal-id=\"discussion-' +
            option.id + '\">Discuss (' +
            option.argument_count + ')</a></p><div class=\"info\"><h5>' +
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
    }
}

/* vote no */
function voteNo(id) {
    if (!voteBlocked) {
      blockVote();
      $.each(options, function(i, option) {
        if (option.id == id) {
          $('.option#' + id).fadeOut(200);
          var optionHTML = '<div class=\"option no\"><p class=\"discussion-link\"><a href=\"#\" data-reveal-id=\"discussion-' +
            option.id + '\">Discuss (' +
            option.argument_count + ')</a></p><div class=\"info\"><h5>' +
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
    }
}
