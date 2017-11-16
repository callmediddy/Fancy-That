# Fancy That! — Proffer Blockchain Hackathon
> This repository contains the source code for **Fancy That**, a *Toshi Bot*, that simplifies travel bookings and managing loyalty points. It served as my submission to *Proffer's Blockchain Hackathon* conducted from November 10, 2017 to November 13, 2017

## Overview
This is an attempt to leverage an emerging technology in the form of blockchain-fueled Decentralized Apps or DApps to solve the global issue of cumbersome travel bookings and managing loyalty rewards. **Fancy That** is built on top of Toshi, a platform for bots that utilizes *Ethereum* for blockchain transactions.

## Problem
> It is important to understand the problems with existing architecture and tech before thinking about ways to improve it.

The inherent problem with booking flights these days is the amount of choice. Cutting-edge competition in the travel industry, for example the air travel industry, pushes costs lower than ever, which means that it becomes extremely hard for consumers to choose between flights. Loyalty programs were introduced to cut through these choices and help the consumers with their decision because being loyal to one airline meant more rewards further down the line. However, most of these loyalty programs have failed on an epic scale. The reasons for these failures can be roughly summarized by the following:
+ *Too many* loyalty programs. None of them are particularly effective because they have failed to cater to the needs of a large audience and have been unsuccessful in finding the right niche.
+ Booking flight tickets, reserving hotels, buying concert tickets, ordering food, etc...basically everything that requires a financial transaction in the travel & entertainment industry gets more and more cumbersome and complicated with each additional step. Even here, there are too many websites to choose from, and people usually ask for the help of *travel agents* who are dedicated to the menial task of making travel reservations for others!
+ Cards, online accounts, applications all serve the one time purpose of loyalty accumulation. They are quickly forgotten, lost, stolen or deleted.
+ The entire system looks inaccessible to a layman. Quite unsurprisingly, it is meant for those that travel frequently, but even those who do, remain baffled by the mysterious ways in which loyalty points are awarded and deducted.

## Solution
My solution to the aforementioned problems with the financial backend of the travel and entertainment industry is to disrupt it with smart contracts based around the emerging blockchain technology. To kickstart this avenue of innovation, I have used a bot built on top of the Toshi framework to utilize Ethereum payments and blockchain transactions to book flights, reserve hotels, explore local cuisine and culture! Moreover, loyalty points now find a special *Fancy That* wallet. The user can browse through the options they have before earning and redeeming their *FT Points* at any given point in time. The process is fast, easy, secure, reliable and robust all because of the decentralized backend that makes this solution truly special. Following are some screenshots from the interactive front-end of *Fancy That*.

![alt text](https://raw.githubusercontent.com/akhand42/Fancy-That/master/screenshots.png "Fancy That Screenshot")

## Flowchart
> This is a graphical representation of the upper level mechanics behind the idea behind **Fancy That!**

![alt text](https://raw.githubusercontent.com/akhand42/Fancy-That/master/flowchart.png "Fancy That Flowchart")

## Running locally with docker
You can run the project locally with

```docker-compose up```

If any new depencies are added you can rebuild the project with

```docker-compose build```

To reset the postgres database in your dev environment you can use

```docker-compose down -v```


## Youtube Video
> [Fancy That! - Proffer Blockchain Hackathon](https://youtu.be/x2TKwmuLzxY "Fancy That's Youtube Video")

###### Please note:
This README was edited shortly after the official submission deadline. No other part of the project was edited or modified in any way whatsoever after the official deadline had passed.
