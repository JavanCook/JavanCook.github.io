---
title: Getting Information about a USB Device
description: How to use Linux to get data from a USB device.
category: Remote Xbox Project
tags: USB Linux Raspberry-Pi
keywords: USB, Linux, Raspberry-Pi
layout: post
---
In the previous post [an introduction to USB protocol](/2015/an-introduction-to-usb-protocol) was presented.
Given what was learnt in that post, the next step for the Remote Xbox Project is to both figure out how to extract data from the wireless Xbox controller and make sense of it.
The first step in this process is to identify the different Interfaces and Endpoints within the device.
To do this the I used [lsusb from usbutils](https://github.com/gregkh/usbutils) on my raspberry pi obtained using
<kbd>$ sudo apt-get install usbutils</kbd>.
After connecting the controller, I then used the command
<kbd>$ lsusb</kbd>, which returned the list of USB devices currently connected to my raspberry pi and looked like this:

{% highlight bash %}
Bus 001 Device 002: ID 0424:9514 Standard Microsystems Corp.
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 001 Device 003: ID 0424:ec00 Standard Microsystems Corp.
Bus 001 Device 005: ID 045e:028e Microsoft Corp. Xbox360 Controller
Bus 001 Device 004: ID 148f:5370 Ralink Technology, Corp. RT5370 Wireless Adapter
{% endhighlight %}

As you can see, the Xbox controller is Device number 5 and has a Vendor id of 045e and a Product id of 028e in hex. We can now use lsusb to inspect it in more detail using the command
<kbd>$ lsusb -d 045e:028e -v</kbd>
, where
<kbd>-d</kbd>
shows only the device of the specified vendor and product id and
<kbd>-v</kbd>
provides more detail.

{% highlight bash %}
Bus 001 Device 005: ID 045e:028e Microsoft Corp. Xbox360 Controller
Couldn't open device, some information will be missing
Device Descriptor:
  bLength                18
  bDescriptorType         1
  bcdUSB               2.00
  bDeviceClass          255 Vendor Specific Class
  bDeviceSubClass       255 Vendor Specific Subclass
  bDeviceProtocol       255 Vendor Specific Protocol
  bMaxPacketSize0         8
  idVendor           0x045e Microsoft Corp.
  idProduct          0x028e Xbox360 Controller
  bcdDevice            1.14
  iManufacturer           1
  iProduct                2
  iSerial                 3
  bNumConfigurations      1
  Configuration Descriptor:
    bLength                 9
    bDescriptorType         2
    wTotalLength          153
    bNumInterfaces          4
    bConfigurationValue     1
    iConfiguration          0
    bmAttributes         0xa0
      (Bus Powered)
      Remote Wakeup
    MaxPower              500mA
    Interface Descriptor:
      bLength                 9
      bDescriptorType         4
      bInterfaceNumber        0
      bAlternateSetting       0
      bNumInterfaces           2
      bInterfaceClass       255 Vendor Specific Class
      bInterfaceSubClass     93
      bInterfaceProtocol      1
      iInterface              0
      ** UNRECOGNIZED:  11 21 00 01 01 25 81 14 00 00 00 00 13 01 08 00 00
      Endpoint Descriptor:
        bLength                 7
        bDescriptorType         5
        bEndpointAddress     0x81  EP 1 IN
        bmAttributes            3
          Transfer Type            Interrupt
          Synch Type               None
          Usage Type               Data
        wMaxPacketSize     0x0020  1x 32 bytes
        bInterval               4
      Endpoint Descriptor:
        bLength                 7
        bDescriptorType         5
        bEndpointAddress     0x01  EP 1 OUT
        bmAttributes            3
          Transfer Type            Interrupt
          Synch Type               None
          Usage Type               Data
        wMaxPacketSize     0x0020  1x 32 bytes
        bInterval               8
    Interface Descriptor:
      bLength                 9
      bDescriptorType         4
      bInterfaceNumber        1
      bAlternateSetting       0
      bNumEndpoints           4
      bInterfaceClass       255 Vendor Specific Class
      bInterfaceSubClass     93
      bInterfaceProtocol      3
      iInterface              0
      ** UNRECOGNIZED:  1b 21 00 01 01 01 82 40 01 02 20 16 83 00 00 00 00 00 00 16 03 00 00 00 00 00 00
      Endpoint Descriptor:
        bLength                 7
        bDescriptorType         5
        bEndpointAddress     0x82  EP 2 IN
        bmAttributes            3
          Transfer Type            Interrupt
          Synch Type               None
          Usage Type               Data
        wMaxPacketSize     0x0020  1x 32 bytes
        bInterval               2
      Endpoint Descriptor:
        bLength                 7
        bDescriptorType         5
        bEndpointAddress     0x02  EP 2 OUT
        bmAttributes            3
          Transfer Type            Interrupt
          Synch Type               None
          Usage Type               Data
        wMaxPacketSize     0x0020  1x 32 bytes
        bInterval               4
      Endpoint Descriptor:
        bLength                 7
        bDescriptorType         5
        bEndpointAddress     0x83  EP 3 IN
        bmAttributes            3
          Transfer Type            Interrupt
          Synch Type               None
          Usage Type               Data
        wMaxPacketSize     0x0020  1x 32 bytes
        bInterval              64
      Endpoint Descriptor:
        bLength                 7
        bDescriptorType         5
        bEndpointAddress     0x03  EP 3 OUT
        bmAttributes            3
          Transfer Type            Interrupt
          Synch Type               None
          Usage Type               Data
        wMaxPacketSize     0x0020  1x 32 bytes
        bInterval              16
    Interface Descriptor:
      bLength                 9
      bDescriptorType         4
      bInterfaceNumber        2
      bAlternateSetting       0
      bNumEndpoints           1
      bInterfaceClass       255 Vendor Specific Class
      bInterfaceSubClass     93
      bInterfaceProtocol      2
      iInterface              0
      ** UNRECOGNIZED:  09 21 00 01 01 22 84 07 00
      Endpoint Descriptor:
        bLength                 7
        bDescriptorType         5
        bEndpointAddress     0x84  EP 4 IN
        bmAttributes            3
          Transfer Type            Interrupt
          Synch Type               None
          Usage Type               Data
        wMaxPacketSize     0x0020  1x 32 bytes
        bInterval              16
    Interface Descriptor:
      bLength                 9
      bDescriptorType         4
      bInterfaceNumber        3
      bAlternateSetting       0
      bNumEndpoints           0
      bInterfaceClass       255 Vendor Specific Class
      bInterfaceSubClass    253
      bInterfaceProtocol     19
      iInterface              4
      ** UNRECOGNIZED:  06 41 00 01 01 03
{% endhighlight %}

As you can see from the results above the controller has one Configuration with four Interfaces and no Alternate Settings to worry about.
Interface 0 has two Endpoints, one IN and one OUT; Interface 1 has four Endpoints, two IN and two OUT; Interface 2 has one Endpoint, an IN; and Interface 3 has no Endpoints.
Also of interest is the fact that all the Endpoints are of the interrupt transfer type.
Now that we've established the details of the different Interfaces and Endpoints, and most importantly their addresses, we need to figure out what processes they correspond to and where to extract the controller inputs from.

Fortunately, this has already been done within [Tattiebogle's post on wired controller information](http://tattiebogle.net/index.php/ProjectRoot/Xbox360Controller/UsbInfo).
He found that Interface 0 corresponds to the data from the controller, including the status of components such as the rumble motors, the LED ring and whether the headset is present, as well as the controls status.
He also speculates that Interface 1 is for the audio data for the mic and speaker in the headset and Interface 3 is a security measure used by Microsoft to check that the controller is licensed.
This latter point makes sense due to the lack of Endpoint associated with Interface 3 and the presence of what appears to be a proprietary chip on the controller circuit board.
This also has implications for item three on the checklist, replicating the inputs on the server side as outputs to the 360 console, and as such will be discussed in more detail in a later post.
No speculation is offered for the role of Interface 2.
As it possesses only a solitary IN Endpoint, I reckon it could be for the chatpad accessory.
This is something I'll be investigating further, once I acquire a chatpad, along with extracting data from the Endpoints in the next post.
