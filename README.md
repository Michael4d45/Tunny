# Tunny
A replication of the [Lorenze SZ Cypher](https://en.wikipedia.org/wiki/Cryptanalysis_of_the_Lorenz_cipher)

# Installation 
Firstly create a .env file.
- to install the libraries.
    - `npm install`
- to build production.
    - `npm run prod`
- to continuously build.
    - `npm run watch`
- to run the server
    - `npm run serve`

# What's going on
The Tunny machine translates a message into Teletype alphabet in 5 bit pulses, then encodes the message with the Lorenze SZ Cypher. 

This cypher works by adding a key to the message based on the initial settings. 

This application takes the message and encodes it. Then it sends the encoded message to anyone in the same room. Anyone with the same settings and same room should transmit readable messages to each other.

# Live example
You can go to tunny.michael4d45.com

# Lessons learned
I learned how to set up a socket.io app with Nginx (help from [here](https://stackoverflow.com/questions/29043879/socket-io-with-nginx)).
I learned a lot about the design of the Tunny machine. For a history, check out [this book](http://www.colossus-computer.com/colossus1.html).
Though in the book, [page 349](http://www.colossus-computer.com/colossus1.html#appendix1) citing [this](http://www.alanturing.net/turing_archive/archive/t/t01/TR01-005.html), it says 'I' is encoed by '•XX•X' which is P, I is '•XX••'.
