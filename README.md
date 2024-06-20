# INote
Simple HTML5 notes application (WebApp) for iPhone 5s in offline mode

![](_temp.png)
## Demo in browser
[INote] https://silenthunterdev.github.io/INote/
## Why
I like to organize everything in my life - task lists, notes - it's just my thing. Having an ancient bucket with bolts (car), I have to write down all the problems with the car, because the voiced problem is half the way to its solution. The standard notes program in my iPhone 5s is too cumbersome, so I wanted to make my own. I wanted to make my own, so that it would look no worse, animations, gestures.... Without touching professional iOS development, the simplest way to create applications is PWA (Progressive Web Application). On iPhone, this case is supported quite poorly, but still works so-called WebApp (Web Application, HTML5 + appcache manifest).\.
Basically, it's an ordinary web page saved to the main screen of the phone. The only difference is that the Safari interface is hidden and the page remains functional when there is no Internet.
## How to set it to your phone's home screen
- On your iPhone, go to [address](https://silenthunterdev.github.io/INote/) in Safari.
- Tap "Share" at the bottom
- Tap "Home Screen"
- Tap "Add"
- Launch the app that appears
## How to use
When using the app, you do not need a network connection
- To add a note:
    - tap "New Note" on the top right
    - write the text of the note
    - tap "Done"    
- long tap on the desired note
    - the note is grayed out
    - select the note you want to paste in its place.
- To export all notes to a text file:
    - tap "New note" on the top right
    - write "backup"
    - Press "Done"
    - Press "export"
    - select all text
    - Press "Share..."
    - Copy to Documents or Save to Files
- To import notes from this text file:
    - click "New Note" on the top right
    - write "backup"
    - Press "Done"
    - Press "Select file"
## Other Info
Some Safari-specific css styles I used:\
    -webkit-touch-callout: none - to remove the menu when a link is clicked for a long time.
    -webkit-text-size-adjust: none - to disable automatic page scaling.
    -webkit-user-select: none - to disable text selection
    -webkit-tap-highlight-color: transparent - to disable link highlighting 
-webkit-hyphens: auto
    -webkit-hyphens: auto - automatic hyphenation.
And finally, one very unpleasant feature of this kind of applications. After some time working offline, the program stops working, requiring the Internet. In my case, there will be a sad smiley face (404.html) and a back button that works only half the time. The way to fight this is to force a refresh of the application page with the internet turned on. As we remember, there is no browser interface, you need to enter "backup" when creating a new note, press "Done", press "back and refresh". You can do this several times
