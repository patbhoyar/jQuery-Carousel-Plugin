jQuery-Carousel-Plugin
======================

A Simple jQuery Carousel Plugin. 

This Carousel Plugin can be used like below:

var opts = {<br>
timeBetweenImages: 5,<br>
    transition: 'slide',<br>
    imageList: ['1.JPG', '2.JPG', '3.JPG', '4.JPG', '5.JPG', '6.JPG'],<br>
    imageTitle: ["AAA", "BBB", "CCC", "DDD", "EEE", "FFF"]<br>
};

$("#carouselContainer").carousel(opts);


Options for the "Transition" include: fade, slide, flash
