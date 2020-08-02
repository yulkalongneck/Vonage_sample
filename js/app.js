// replace these values with those generated in your TokBox Account
var apiKey = "";
var sessionId = "";
var token = "";

// (optional) add server code here
var SERVER_BASE_URL = 'https://vonagetestserver.herokuapp.com';
   fetch(SERVER_BASE_URL + '/session').then(function(res) {
     return res.json()
   }).then(function(res) {
     apiKey = res.apiKey;
     sessionId = res.sessionId;
     token = res.token;
     initializeSession();
   }).catch(handleError);


// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

function subscribeToVideo( role, element )
{
  if ($('#video-'+role.id).length === 0) {
    $('#'+ element +'Panel').append('<button id=video-'+ role.id +' type="button" class="video btn btn-success" name="button">video on</button>');
    $('#video-'+role.id).on('click', function(){
      if($(this).hasClass('video btn btn-success')){
        role.subscribeToVideo(false);
        $(this).removeClass('video btn btn-success').addClass('video btn btn-danger');
        $(this).text('video off');
      } else {
        role.subscribeToVideo(true);
        $(this).removeClass('video btn btn-danger').addClass('video btn btn-success');
        $(this).text('video on');
      }
    });
  }

}
function subscribeToAudio( role, element )
{
  if ($('#audio-'+role.id).length === 0) {
    $('#'+ element +'Panel').append('<button id=audio-'+role.id+' type="button" class="audio btn btn-success" name="button">audio on</button>');
    $('#audio-'+role.id).on('click', function(){
      if($(this).hasClass('audio btn btn-success')){
        role.subscribeToAudio(false);
        $(this).removeClass('audio btn btn-success').addClass(' audio btn btn-danger');
        $(this).text('audio off');
      } else {
        role.subscribeToAudio(true);
        $(this).removeClass('audio btn btn-danger').addClass('audio btn btn-success');
        $(this).text('audio on');
      }
    });
  }

}


function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);
  // Subscribe to a newly created stream
  var subscriberOptions = {
    insertMode: 'append',
    width: '100%',
    height: '100%',
    name : 'Guest'
  }

  session.on('streamCreated', function(event) {
    var subscriber = session.subscribe(event.stream, 'subscriber', subscriberOptions , handleError);
    subscribeToVideo(subscriber, 'subscriber');
    subscribeToAudio(subscriber, 'subscriber');

  });

  // Create a publisher
  var publisherOptions = {
    insertMode: 'append',
    width: '100%',
    height: '100%',
    name : 'Julia'
  }

  var publisher = OT.initPublisher('publisher', publisherOptions, handleError);

  // Connect to the session
   session.connect(token, function(error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
      //subscribeToVideo(publisher, 'publisher');
      //subscribeToAudio(publisher, 'publisher');
    }
  });



}
