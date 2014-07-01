group-tracking
==============

A group-tracking webpage (using HTTP and websocket server). Every current user position is send and shown in real-time to all the other users.

The last X positions are showed as a line, indicating movement.

The use of getCurrentPosition() means the positions are a bit off.

Unique identifiers saved in HTML5 local storage allow user identification accross reloads. One can provide nickname for other users.

reason to be
------------

This was a prototype written for the 2014 edition of the http://www.zinneke.org in order to track the parade multiple participants positions in real time using mobile phone.

requirements
------------

An HTTP server for the html page

A node.js server for the /websocket application.
