---
title: The Remote Xbox Project
description: An introduction to the remote xbox project
category: Remote Xbox Project
tags: Xbox Raspberry-Pi
keywords: Xbox, Raspberry-Pi
layout: post
---
This year for Christmas I was lucky enough to get a couple of Raspberry Pi devices and a load of miscellaneous accessories and gizmos. After getting back in to Python by making some flashing lights and random number generators, I was looking for a new project.
I toyed with making them into media servers or retro game emulators but in the end I didn't really have any need for either of those things.
Instead I decided that I wanted to try something new where I could learn some new things and increase my knowledge of Python, preferably involving hardware of some description too.

I decided to try to implement some sort of system to play my Xbox 360 remotely whilst I am away from home.
This would involve a number of different coding stages to make it work and would also require modifying hardware.
The recent announcements from Microsoft regarding streaming Xbox One to Windows 10 devices and the backwards compatibility of the Xbox One have rendered this project redundant.
However, as this was more of a learning exercise than an alternative to these services, and given I started this in January, I've continued with the project.

In order for this project to work, I needed to integrate a number of features:

-  A way of detecting the inputs from a controller.
-  A way of transferring this information from a client to a server.
-  A way of replicating the inputs on the server side as outputs to the 360 console.
-  A way to view the gameplay.
-  A way to control the TV.

This is the checklist of essential features that I've worked on in an attempt to make this project succeed. This will be updated in subsequent posts as progress is made and some optional extras may be incorporated if feasible.
