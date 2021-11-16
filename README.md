# full-stack-trading-app

##What does this repo do

Once completed, this repository will allow me (or other users should I bring that functionality in, but for now this is for me only) to come onto a front end website and create automated trading bots for the stock, crypto, and possibly forex markets using pre-built strategies. Settings for each bot will be kept in a database. Every set amount of time (the amount of time will be different for each strategy) a CRON job will perform a query for all the bots with the 'strategy' field that matches the strategy the CRON job is responsible for maintaining. Then it will find all active records in the proper 'orders' and 'trades' tables that have a foreign key that matches the bot id, and look to see if any orders were filled, if it needs to place new orders, if it needs to update any records, etc.

##What still needs to be completed for it to be functional

First thing on the to-do list is finalizing the migrations. Then it's just a matter of finishing up the API and writing the CRON jobs, and the back end portion will be done, which is most of the work. The front end website will only be responsible for displaying data and providing ways to interact with the back end server.

The front end website will still take quite some time to complete, because I want to use SASS for styling, which I dont have prior experience with, and I also want to learn an animation library to make the website visually pleasing. 

Once v1 of this repository is complete however, I will continue to develop this repo to bring discretionary trading tools to this platform, such as a screener and scanner, as well as a custom trading UI for crypto, as I really dislike almost every crypto trading UI I've come across. To do this, I will be using the CCXT library, which allows me as a developer to interact with dozens of crypto exchange api's from a single package. Using this library, I will be able to see account information for every exchange I have an account with, as well as see market and order book data, and even place trades and orders on any one of those exchanges, all without having to be logged in directly on their site. Using this library, it will also be super easy to create a 'quick transfer' feature which allows me to send funds from one of my exchanges to another much quicker than doing it manually because I won't have to log in to either exchange to do this. 

##Why create a full stack app instead of just a script?

When I first started writing automated trading scripts, I used Python, and would connect to a websocket data feed and make trades off that incoming data. The problem with using this method is that I would have to manually change code if I wanted the script to trade a different pair, or using a slightly different settings, and on top of that I would have to host each script separately, and wouldn't have a way to pause the script without unhosting it, and then manually rehosting it when I want it to run again. This isn't very scalable, and would require a lot of unnecessary work on my end to maintain.

With this setup, I am able to run the same strategy for multiple pairings with ease, while being able to pause any single bot. This also allows me to run a single strategy multiple times on the same ticker, with slightly different settings to test profitability with different inputs.

##What other features will you bring into this bot?

Once v1 of this repository is complete, I will continue to develop this repo to bring discretionary trading tools to this platform, such as a screener and scanner, as well as a custom trading UI for crypto, as I really dislike almost every crypto trading UI I've come across. To do this, I will be using the CCXT library, which allows me as a developer to interact with dozens of crypto exchange api's from a single package. Using this library, I will be able to see account information for every exchange I have an account with, as well as see market and order book data, and even place trades and orders on any one of those exchanges, all without having to be logged in directly on their site. Using this library, it will also be super easy to create a 'quick transfer' feature which allows me to send funds from one of my exchanges to another much quicker than doing it manually because I won't have to log in to either exchange to do this. 

It would also be really cool to write a smart contract that would allow people to come onto my site and link their crypto wallet and 'stake' some of their crypto, which would allow me to use other peoples crypto on my bots, and then automatically distribute profits to their wallet fairly.

The final feature I currently plan to implement (but certainly not the last one I'll ever implement) is an automatic position builder/profit reinvestor, which takes available cash, either from deposits or successful trades, and puts a little bit into a certain asset every day/week/month to dollar cost average into a new investment. 

I also am very excited to be working through a very extensive free online course in AI and ML, which I hope to use to make some profitable models.