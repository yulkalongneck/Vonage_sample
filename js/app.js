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

function subscribeToVideo( subscriber )
{
  if ($('#video').length === 0) {
    $('#subscribeToVideo').append('<button id="video" type="button" name="button">video</button>');
    $("#video").on('click', function(){
        subscriber.subscribeToVideo(false);
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
    subscribeToVideo: true,
    subscribeToAudio: true
  }

  session.on('streamCreated', function(event) {
    var subscriber = session.subscribe(event.stream, 'subscriber', subscriberOptions , handleError);
    subscribeToVideo(subscriber);
  });


  // Create a publisher
  var publisherOptions = {
    insertMode: 'append',
    width: '100%',
    height: '100%',
    name : "Julia"
  }

  var publisher = OT.initPublisher('publisher', publisherOptions, handleError);

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });


}

//initializeSession();
