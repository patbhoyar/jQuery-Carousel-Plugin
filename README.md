jQuery-Carousel-Plugin
======================

A Simple jQuery Carousel Plugin. 

This Carousel Plugin can be used like below:

var opts = {
    timeBetweenImages: 5,
    transition: 'slide', //fade, slide, flash
    imageList: ['1.JPG', '2.JPG', '3.JPG', '4.JPG', '5.JPG', '6.JPG'],
    imageTitle: ["AAA", "BBB", "CCC", "DDD", "EEE", "FFF"]
};

$("#carouselContainer").carousel(opts);
