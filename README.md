# Tunny
A replication of the [Lorenze SZ Cypher](https://en.wikipedia.org/wiki/Cryptanalysis_of_the_Lorenz_cipher)

# Installation 
Firstly create a .env file.
- to install the libraries.
    - `npm run watch`
- to run the server
    - `npm run serve`

# What's going on
The Tunny machine translates a message into Teletype alphabet in 5 bit pulses, then encodes the message with the Lorenze SZ Cypher. 

This cypher works by adding a key to the message based on the initial settings. 

This application takes the message and encodes it. Then it sends the encoded message to anyone in the same room. Anyone with the same settings and same room should transmit readable messages to each other.

