---
title: An Introduction to USB Protocol
description: A basic introduction to USB devices and how they transfer data.
category: An Introduction to...
tags: USB Protocol Transfers
keywords: USB, Protocol, Transfers
layout: post
---
In order to begin fulfilling the first item on the Remote Xbox checklist a I needed to find an input controller.
Fortunately, I happened to have a wired Xbox 360 controller that I could use.
That left me with having to figure out how to extract the inputs using the raspberry pi.
It turns out that there are plenty of using pre-existing solutions to solve this problem, including using [xboxdrv](http://pingus.seul.org/~grumbel/xboxdrv/) combined with [pygame](http://www.pygame.org/hifi.html) as described here by [Martin O'Hanlon in his post on using an Xbox controller to control a robot](http://www.stuffaboutcode.com/2014/10/raspberry-pi-xbox-360-controller-python.html).
However, it seemed like it would be more fun to figure things out from the beginning myself and as such would require me to carry out some research on how USB devices actually work.
This led me to the websites [USB Made Simple](http://www.usbmadesimple.co.uk/index.html), [Beyond Logic's USB in a NutShell](http://www.beyondlogic.org/usbnutshell/usb4.shtml#Control) and [Microsoft's Concepts for all USB developers ](https://msdn.microsoft.com/en-us/library/windows/hardware/dn303352(v=vs.85).aspx).

These sources provided me with a rudimentary knowledge of USB devices, enough to get started with anyway. Essentially, in addition to a Vendor and Product identifiers, USB devices feature configurations, interfaces and endpoints, a combination of which control how the device works.
The top level is the configuration which controls what the device does.
Whilst a device can have more than one configuration associated with it, only one can be active at any time, and it is selected by the device driver.
A given configuration can have a number of interfaces which specifies the functions of the device, usually one function per interface.
Again, interfaces can have alternate settings associated with them and only one can be active at once.
Finally, interfaces have endpoints which are used to transfer the data in and out of the device and cannot be shared between interfaces.

<figure>
<center><a href="/assets/images/USBdevice.png"><img src="/assets/images/USBdevice.png" align="middle" width="500" ></a></center>
<figcaption>
<b>Figure 1:</b>
<i>An example of a USB device. This device has one configuration and two interfaces, one of which has an alternate setting. The interfaces have different endpoints associated with them. Endpoint 0 is the control endpoint used to configure the device.</i>
</figcaption>
</figure>

Every USB device must assign a bidirectional control endpoint at the 0 address.
This is so information about the device can be obtained and the configuration for the device can be set.
The data endpoints are unidirectional (IN or OUT) and have one of four types (control, interrupt, isochronous and bulk).
IN and OUT are relative to the host, so IN is a transfer from the device to the host whilst OUT is a transfer from the host to the device.
A typical example of a USB device using Figure 1 would be that of a webcam with a built-in microphone and speaker.
Here Interface 0 would correspond to the camera of the device.
The Alternate Setting 0 would be active when the camera is not in use to save bandwidth as it has no Endpoint associated with it.
Alternative Setting 1 would be active when the camera is in use and the IN endpoint is used to transfer the video data from the camera to the host.
Interface 1 would correspond to the microphone and speaker, where endpoint 1 would take noise detected by the microphone and transfer it the host whilst endpoint two would take data from the host and output it from the speaker.

As mentioned above, there are four different types of transfer available for an endpoint.
The transfer types each have their own properties which makes them suitable for different applications.
Control transfers are used by Endpoint 0 when configuring the device and are used for command and status operations.
Interrupt transfers are used to provide regular status updates from a device and have included error checking so the data arrives error free.
Isochronous transfers are used to transfer large amounts of time sensitive data, such as video or audio streams, where it is less important if a packet of data is dropped on the way.
Bulk transfers are also used to transfer large amounts of data, however, they are assigned the remaining bandwidth that has not already been allocated to interrupt and isochronous transfers.
As such, they are primarily used for non-time critical applications, such as print jobs, and they are error checked with guaranteed delivery unlike isochronous transfer.
