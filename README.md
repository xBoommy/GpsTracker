# GpsTracker
This application is current in development

To try out the application:
1) Download the files
2) Make sure to install the dependencies for the project, use: `npm install`
3) To start, have your devices plugged in with debugging mode available and use: `npx react-native run-android`

On app startup, you should be prompted to allow permissions for the application.
  Allowing the permissions would update the status "1 - READY/ Location Permission granted"
  Pressing the "Allow GPS Positioning" button would prompt for permission requests, should you reject permissions initially.
    If no request surfaces and status is at 1, it means permission has already been granted.

To begin tracking, scroll along the purple segment and press "Start"
  If GPS Location Services has not been enabled, you should be prompted to do so.
  
 Once all services are ready, a countdown would begin (this can be seen below the start button)
 After the countdown, gps tracking would start as well as a timer (This can be found by scrolling along the top white portion).
 
 Press "Pause" or "Stop" to pause/stop the GPS tracking respectively.
