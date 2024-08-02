
//Note: When running background services on newer Huawei phones, you
//may need to go into the Android battery saving settings and enable 
//DroidScript to run in the background if you want background 
//notifications to work when the phone is locked.

//Init variables.
var count = 0;
var diff = 1;

//Called when service is started.
function OnStart()
{
	app.ShowPopup( "Hello from Service!" );
	
	//Force service to foreground on newer devices (required).
	if( app.GetBuildNum() > 25 )
	    app.SetInForeground( "Counting..." );
		
	//Create the components you need here.
	//...
	
    //Start a timer to do some regular work.
    setInterval( DoWork, 1000 );
}

//Called when we get a message from main app.
function OnMessage( msg )
{
    console.log( msg );
    
    //Handle commands from main App.
    if( msg=="change" ) diff = (diff > 0 ? -1 : 1);
}

//Do some work.
function DoWork()
{
    //This is where we do some regular background task
    //(here we just modify a counter).
    count +=  diff;
    
    //Send data to the App (if it is running).
    app.SendMessage( count );
}

