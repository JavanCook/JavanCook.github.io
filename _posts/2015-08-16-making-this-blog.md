---
title: Making This Blog
description: The sources and guides used to make this blog
category: Blog
tags: HTML CSS Jekyll
keywords: HTML, CSS, Jekyll
layout: post
---
I first heard about Github pages from my friend [Matt](http://mattsumme.rs/) whilst looking for a place to host a blog for free that I could use to document my progress on various projects.
As I wanted to be able to produce content using my Windows based laptop I initially followed a [guide](http://jekyll-windows.juthilo.com/]) by [@juthilo](https://twitter.com/juthilo) which worked really well.
The only point at which I found this guide lacking is for if you plan to use pygments for syntax highlighting.
When posting samples of code, I found initially that pygments wasn't working despite being installed sucessfully.
After visiting the [pygments website](http://pygments.org/) I found that I needed to generate a stylesheet first.

I first used the following code in the Python command line to check which styles were already installed:

{% highlight python %}
>>> from pygments.styles import STYLE_MAP
>>> STYLE_MAP.keys()
{% endhighlight %}

From the list this provided I selected paraiso-dark, based on some [experimentation on the pygments website](http://pygments.org/demo/).
Having selected my style of preference I then needed to generate my CSS stylesheet.
To do this I put the following line into the command prompt:

<kbd>pygmentize -S style -f html >output.css</kbd>

Where  "style" is the name of the style obtained earlier and "output.css" is the output file.

The majority of the rest of the blog was produced using the documentation on [Jekyll](http://jekyllrb.com/) and [Bootstrap](http://getbootstrap.com/) in conjuction with the [Andrew Munsell tutorial](http://learn.andrewmunsell.com/learn/jekyll-by-example/tutorial).
The search bar was modified from [Dave Taylor's site](http://www.askdavetaylor.com/how_can_i_add_a_google_search_box_to_my_web_site/) whilst the tag and category search function was modified from [Alex Pearce's site](https://alexpearce.me/2012/04/simple-jekyll-searching/).
Finally, the next and previous post buttons were adapted from [David Elbe's site](http://david.elbe.me/jekyll/2015/06/20/how-to-link-to-next-and-previous-post-with-jekyll.html) and my favicon was generated using [Favic-o-matic](http://www.favicomatic.com/).

As you can see, most of the elements of this blog have been cannibalised from other people's sites. However, being new to HTML, CSS and Javascript, it has been fun learning experience to adapt them to my needs and make them all work together.
