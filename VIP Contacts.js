/*
 Notes:
 
 Any file with the name 'Service.js' will run as a hidden background
 service. A corresponding foreground app must exist on the device to
 manage the service but the service can be set to started automatically at
 startup if required.
 
 Service debug messages are shown in gray on the debug tab. Pressing the stop 
 button in this IDE will stop both the service and the app, but pressing the 
 back button on your device will stop the app but leave the service running.
*/

//Called when application is started.
function OnStart()
{
    //Create a layout.
    lay = app.CreateLayout( "linear", "VCenter,FillXY" );    
    
    //Create text control to display data from the service.
    txt = app.CreateText( "", 0.4 );
    txt.SetMargins( 0, 0.05, 0, 0 );
    txt.SetTextSize( 22 );
    lay.AddChild( txt );
    
    //Create an 'Send Message' button.
    btn = app.CreateButton( "Send Message to Service", 0.6, 0.1 );
    lay.AddChild( btn );
    btn.SetOnTouch( function(){svc.SendMessage("change")} );
    
    //Create a 'Stop Service' button.
    btn = app.CreateButton( "Stop Service", 0.6, 0.1 );
    lay.AddChild( btn );
    btn.SetOnTouch( function(){svc.Stop()} );
    
    //Add layout to app.    
    app.AddLayout( lay );
    
    //Start/connect to our service.
    svc = app.CreateService( "this","this", OnServiceReady );
    svc.SetOnMessage( OnServiceMessage );
    
    //This will cause your service to start at boot.
    //(Set it to "none" if you need to stop it starting)
    //app.SetAutoBoot( "Service" );
}

//Called after our service has started.
function OnServiceReady()
{
    console.log( "Service Ready" );
}

//Called when messages comes from our service.
function OnServiceMessage( msg )
{
    txt.SetText( "Count: " + msg );
}

