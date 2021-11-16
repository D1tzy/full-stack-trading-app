# full-stack-trading-app

##What does this repo do

Once completed, this repository will allow me (or other users should I bring that functionality in, but for now this is for me only) to come onto a front end website and create automated trading bots for the stock, crypto, and possibly forex markets using pre-built strategies. Settings for each bot will be kept in a database. Every set amount of time (the amount of time will be different for each strategy) a CRON job will perform a query for all the bots with the 'strategy' field that matches the strategy the CRON job is responsible for maintaining. Then it will find all active records in the proper 'orders' and 'trades' tables that have a foreign key that matches the bot id, and look to see if any orders were filled, if it needs to place new orders, if it needs to update any records, etc.

##What still needs to be completed for it to be functional

First thing on the to-do list is finalizing the migrations. Then it's just a matter of finishing up the API and writing the CRON jobs, then the back end portion will be done, which is most of the work. The front end website will only be responsible for displaying data and providing ways to interact with the back end server.

I am also changing the migrations to only have 3 tables, one for the bots, one for the trades, and one for the orders, and I'll be able to easily calculate total profit from completed trades for a single bot or a group of bots with sequel queries, and that data can be returned by my API at any time. I think this method works a lot better than having a separate table with profit information. Each entry into a table will have a 'market' column which defines whether its for the stock or crypto market. By cutting down to three tables like previously mentioned, this also allows me to integrate forex trading without having to change my schemas.

##Why create a full stack app instead of just a script?

When I first started writing automated trading scripts, I used Python, and would connect to a websocket data feed and make trades off that incoming data. The problem with using this method is that I would have to manually change code if I wanted the script to trade a different pair, or with slightly different settings, and on top of that I would have to host each script separately, and wouldn't have a way to pause the script without unhosting it, and then manually rehosting it when I want it to run again. This isn't very scalable, and would require a lot of unnecessary work on my end to maintain.

With this setup, I am able to run the same strategy for multiple pairings with ease, while being able to pause any single bot. This also allows me to run a single strategy multiple times on the same ticker, with slightly different settings to test profitability.

##What other features will you bring into this bot?

Aside from algo-trading, I also plan to bring in some discretionary trading features, such as a screener and scanner for both the stock and crypto markets. I also am very excited to be working through a very extensive free online course in AI and ML, which I hope to use to make some profitable models.

It would also be really cool to write a smart contract that would allow people to come onto my site and link their crypto wallet and 'stake' some of their crypto, which would allow me to use other peoples crypto on my bots, and then automatically distribute profits to their wallet fairly.

The final feature I currently plan to implement (but certainly not the last one I'll ever implement) is an automatic position builder/profit reinvestor.
