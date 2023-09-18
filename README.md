# Dapp-to-go
A web3 travel platform

# Ticketing Smart Contract

### SPDX-License-Identifier: MIT
## Description

This Solidity smart contract implements a ticketing system for selling VIP and Silver tickets for events. Event organizers can create events and sell tickets to users. It includes structures for storing ticket, event, and order information, as well as functions for adding events, buying tickets, and retrieving event and ticket details.

## Features

- **Event Creation**: Event organizers can create events by specifying the number of VIP and Silver tickets, ticket prices, event name, date, and venue.

- **Ticket Selling**: Users can buy VIP or Silver tickets for events. The contract ensures that tickets are sold within the specified selling duration and checks the availability of tickets.

- **Ticket Tracking**: The contract maintains information about the number of tickets sold and available for each event category (VIP and Silver).

- **Order Management**: The contract allows users to keep track of their orders, including the timestamp and ticket details.

- **Event Information Retrieval**: Users can retrieve detailed information about an event, including the owner, ticket counts, selling status, and ticket information.

List of All Events: Users can retrieve an array of all events stored in the contract.

Important Functions

- addEvent: Allows event organizers to create events and specify ticket details.

- buyTicket: Enables users to purchase tickets for events.

- getEvent: Retrieves detailed information about a specific event.

- getAllEvents: Returns an array of all events stored in the contract.

Author

- Author: Muhindo Galien

Version Information

- Solidity Version: 0.8.0
