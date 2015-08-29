---
title: Getting Data from a Controller
description: How to use Python to get data from a controller.
category: Remote Xbox Project
tags: USB Python Raspberry-Pi
keywords: USB, Python, Raspberry-Pi
layout: post
---
In the previous post [we used Linux to find the Endpoints for the USB Xbox controller](/2015/getting-information-about-a-usb-device).
We also used [Tattiebogle's post on wired controller information](http://tattiebogle.net/index.php/ProjectRoot/Xbox360Controller/UsbInfo) to identify the purposes of the different Interfaces so we know which of the Endpoints to target for information.
This leaves us with the final step for the first item on the checklist; detecting the inputs from the controller. In order to achieve this, we need some way of interacting with the Endpoints.
Given I was planning on using Python for this project the module [PyUSB](https://github.com/walac/pyusb) seems like the logical choice. The previous link provides details for installing the module and there is a [PyUSB tutorial](https://github.com/walac/pyusb/blob/master/docs/tutorial.rst) available containing a wealth of information.

The main three lines of code we need from PyUSB are:
{% highlight python %}
>>> usb.core.find(idVendor=a, idProduct=b)
>>> dev.set_configuration()
>>> dev.read(x, y, z)
>>> dev.write(x, y, z)
{% endhighlight %}

The first line is used to detect if a USB device of the correct Vendor and Product identifiers is connected.
We obtained values for *a* and *b* in the previous post and found that *a* = 0x045e and *b* = 0x028e.
The second line is used to set the device's Configuration, as there is only one Configuration in this case there is no need to specify.
The final two lines are used to read and write data to the device respectively.
Here *x* is the Endpoint address, *y* is the number of bytes to read or the data to write and *z* is the timeout time.
Again, *x* and *y* were determined in the previous post as the *bEndpointAddress* and the *wMaxPacketSize* respectively.
The final thing left to do before probing the device for data is to pick the right Endpoint to query to get the controller status.
It turned out that this is slightly more tricksy than I initially thought.

From [Tattiebogle's controller information](http://tattiebogle.net/index.php/ProjectRoot/Xbox360Controller/UsbInfo) it was determined that Interface 0 is the one responsible for the status of the controller.
In the literature it was stated that typically each Interface would correspond to a single device function.
In this case, Interface 0 incorporates a number of sub-functions including the LED status and the mic status, as well as the control status. It is therefore necessary to query the same Endpoint several times to get to the pertinent information.
I've prepared some code to do exactly that below:

{% highlight python linenos %}
#Import PyUSB and sys
import usb.core
import usb.util
import sys

#Find device
dev = usb.core.find(idVendor=0x045e, idProduct=0x028e)
#Is the controller there or not?
if dev is None:
 sys.exit('Controller not present, please insert and try again.')
else:
 print('Controller present.')

#Configure device
dev.set_configuration()

#Get packets
for x in range(0,5):
 packet = dev.read(0x81, 32, 100)
 print('Packet', x+1,':', packet)
{% endhighlight %}

When running this code it may return *'usb.core.USBError: [Errno 16] Resource busy'*.
If this happens use <kbd>$ sudo rmmod xpad</kbd> to stop the default Xbox controller driver running.
This should return the following answer:

{% highlight bash %}
Controller present.
Packet 1 : array('B', [1, 3, 14])
Packet 2 : array('B', [2, 3, 0])
Packet 3 : array('B', [3, 3, 3])
Packet 4 : array('B', [8, 3, 0])
Packet 5 : array('B', [0, 20, 0, 0, 0, 0, 88, 253, 184, 7, 58, 3, 255, 0, 0, 0, 0, 0, 0, 0])
{% endhighlight %}

This matches up nicely with the information obtained by [Tattiebogle](http://tattiebogle.net/index.php/ProjectRoot/Xbox360Controller/UsbInfo) where Packet 1 is the LED status, Packet 4 is the mic status and Packet 5 is the status of the controls.
The format is a bit odd and it will require some work to make it usable but it is definitely the control status and ticks off the first item on the list of requirements.
I'm not going to analyse the contents of Packet 5 immediately, that can wait until item three on the list of requirements is addressed, but feel free to consult [Tattiebogle](http://tattiebogle.net/index.php/ProjectRoot/Xbox360Controller/UsbInfo) if you can't wait.
Instead I'm next going to address transferring data between a client and server.

### Checklist

-  ~~A way of detecting the inputs from a controller.~~
-  A way of transferring this information from a client to a server.
-  A way of replicating the inputs on the server side as outputs to the 360 console.
-  A way to view the gameplay.
-  A way to control the TV.
