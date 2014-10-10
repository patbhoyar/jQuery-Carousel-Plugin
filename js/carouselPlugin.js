;(function($){

    $.fn.carousel = function(options){

        var imageNumber = 1;
        var zindex = 999;
        var whosvisible = 1;
        var displayTitleNumber = 0;
        var timeout;
        var settings = $.extend({
            timeBetweenImages: 3,
            transition: 'fade', //fade, slide, flash
            imageList: ['1.JPG', '2.JPG', '3.JPG', '4.JPG', '5.JPG'],
            imageTitle: ["Mee", "LA Valley during Day", "During Night", "HorshoeBend", "Some Blvd"]
        }, options);

        var changeImage = function(){
            setInterval(function(){
                if(++imageNumber > settings.imageList.length-1){
                    imageNumber = 0;
                }

                if(imageNumber === 0){
                    displayTitleNumber = 4;
                }else{
                    displayTitleNumber = imageNumber-1;
                }

                switch(settings.transition){
                    case 'fade':
                        if(whosvisible === 1){
                            $("#carouselImage1").fadeOut('slow', function(){
                                whosvisible = 2;
                                $("#carouselImage1").css({display: 'block', 'z-index': --zindex}).attr('src', 'images/'+settings.imageList[imageNumber]);
                            });
                        }else{
                            $("#carouselImage2").fadeOut('slow', function(){
                                whosvisible = 1;
                                $("#carouselImage2").css({display: 'block', 'z-index': --zindex}).attr('src', 'images/'+settings.imageList[imageNumber]);
                            });
                        }
                        clearTimeout(timeout);
                        timeout = setTimeout(function() {
                            $("#imageTitle").text(settings.imageTitle[displayTitleNumber]);
                        }, 50);
                        break;
                    case 'flash':
                        $("#carouselImage1").attr('src', 'images/'+settings.imageList[imageNumber]);
                        clearTimeout(timeout);
                        timeout = setTimeout(function() {
                            $("#imageTitle").text(settings.imageTitle[imageNumber]);
                        }, 50);
                        break;
                    case 'slide':
                        $("#carouselImage1").attr('src', 'images/'+settings.imageList[imageNumber]).fadeOut('slow');
                        break;
                }
            }, settings.timeBetweenImages*1000);
        };

        $("#carouselImage1").attr('src', 'images/'+settings.imageList[0]);
        $("#carouselImage2").attr('src', 'images/'+settings.imageList[1]);
        $("#imageTitle").text(settings.imageTitle[0]);

        changeImage();
    };
})(jQuery);