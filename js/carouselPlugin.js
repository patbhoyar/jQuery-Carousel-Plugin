;(function($){

    $.fn.carousel = function(options){

        var imageNumber = 1;
        var zindex = 999;
        var whosvisible = 1;
        var displayTitleNumber = 0;
        var timeout, carousel;
        var settings = $.extend({
            timeBetweenImages: 3,
            transition: 'fade', //fade, slide, flash
            imageList: ['1.JPG', '2.JPG', '3.JPG', '4.JPG', '5.JPG'],
            imageTitle: ["Mee", "LA Valley during Day", "During Night", "HorshoeBend", "Some Blvd"]
        }, options);

        if(settings.transition === "flash"){
            imageNumber = 0;
        }

        (function(){
            for(var i=0; i<settings.imageList.length; i++){
                $("#circlesInnerContainer").append("<div class='circles' data-id='"+i+"' title='"+settings.imageTitle[i]+"'></div>");
            }
        })();

        var changeImage = function(thisImage, stopCarousel){

            /*
            If thisImage is set, means, the user requested to load a particular image. So, stop the current carousel and start a new one with the requested image as the first image
             */
            if(thisImage != -1){
                if((stopCarousel == 1) && (thisImage < settings.imageList.length)){
                    clearInterval(carousel);
                    console.log("On Top"+ getSlideonTop());
                    var onTop = getSlideonTop();
                    var zi = getZIndex(onTop);
                    var nextImage = (thisImage + 1) > settings.imageList.length-1?0:thisImage+1;

                    $(".circles").css("backgroundColor", "#ccc");
                    $("[data-id='" + thisImage + "']").css('background', '#333');
                    switch(settings.transition){
                        case 'fade':
                            if(onTop == 1){
                                $("#carouselImage2").attr('src', 'images/'+settings.imageList[thisImage]).css({'z-index': --zindex});
                                $("#carouselImage1").fadeOut('slow', function(){
                                    $("#carouselImage1").css({display: 'block', 'z-index': --zindex}).attr('src', 'images/'+settings.imageList[nextImage]);
                                    $("#imageTitle").text(settings.imageTitle[thisImage]);
                                    whosvisible = 2;
                                });
                            }else{
                                $("#carouselImage1").attr('src', 'images/'+settings.imageList[thisImage]).css({'z-index': --zindex});
                                $("#carouselImage2").fadeOut('slow', function(){
                                    $("#imageTitle").text(settings.imageTitle[thisImage]);
                                    $("#carouselImage2").css({display: 'block', 'z-index': --zindex}).attr('src', 'images/'+settings.imageList[nextImage]);
                                    whosvisible = 1;
                                });
                            }
                            imageNumber = nextImage;
                            break;
                        case 'flash':
                            $("#carouselImage1").attr('src', 'images/'+settings.imageList[thisImage]);
                            clearTimeout(timeout);
                            timeout = setTimeout(function() {
                                $("#imageTitle").text(settings.imageTitle[thisImage]);
                            }, 50);
                            imageNumber = thisImage;
                            break;
                        case 'slide':
                            $("#carouselImage1, #carouselImage2").css('display', 'none');
                            $('#imageTitle').fadeOut('slow');
                            $(".next").first().attr('src', 'images/'+settings.imageList[thisImage]);
                            $("#slider").animate({'margin-left' : '-=1000'}, 2000, function(){
                                $(this).find('img').removeClass('next');
                                $(this).find('img').first().appendTo("#slider").addClass('next');
                                $('.next').attr('src', 'images/'+settings.imageList[nextImage]);
                                $("#imageTitle").css('display', 'block').text(settings.imageTitle[thisImage]);
                                $(this).removeAttr('style');
                            });
                            imageNumber = nextImage;
                            break;
                    }
                }
            }

            /*
            * This is the regular Carousel
            */
            carousel = setInterval(function(){
                if(++imageNumber > settings.imageList.length-1){
                    imageNumber = 0;
                }

                if(imageNumber === 0){
                    displayTitleNumber = settings.imageList.length-1;
                }else{
                    displayTitleNumber = imageNumber-1;
                }

                if(thisImage != -1){console.log(imageNumber+", title: "+displayTitleNumber);}

                $(".circles").css("backgroundColor", "#ccc");
                switch(settings.transition){
                    case 'fade':
                        $("#imageTitle").fadeOut('slow');
                        if(whosvisible === 1){
                            $("#carouselImage1").fadeOut('slow', function(){
                                whosvisible = 2;
                                $("#imageTitle").text(settings.imageTitle[displayTitleNumber]).css('display', 'block');
                                $("#carouselImage1").css({display: 'block', 'z-index': --zindex}).attr('src', 'images/'+settings.imageList[imageNumber]);
                            });
                        }else{
                            $("#carouselImage2").fadeOut('slow', function(){
                                whosvisible = 1;
                                $("#imageTitle").text(settings.imageTitle[displayTitleNumber]).css('display', 'block');
                                $("#carouselImage2").css({display: 'block', 'z-index': --zindex}).attr('src', 'images/'+settings.imageList[imageNumber]);
                            });
                        }
                        $("[data-id='" + displayTitleNumber + "']").css('background', '#333');
                        break;
                    case 'flash':
                        $("#carouselImage1").attr('src', 'images/'+settings.imageList[imageNumber]);
                        clearTimeout(timeout);
                        timeout = setTimeout(function() {
                            $("#imageTitle").text(settings.imageTitle[imageNumber]);
                        }, 50);
                        $("[data-id='" + imageNumber + "']").css('background', '#333');
                        break;
                    case 'slide':
                        $("#carouselImage1, #carouselImage2").css('display', 'none');
                        $('#imageTitle').fadeOut('slow');
                        $("#slider").animate({'margin-left' : '-=1000'}, 2000, function(){
                            $(this).find('img').removeClass('next');
                            $(this).find('img').first().appendTo("#slider").addClass('next');
                            $('.next').attr('src', 'images/'+settings.imageList[imageNumber]);
                            $("#imageTitle").css('display', 'block').text(settings.imageTitle[displayTitleNumber]);
                            $(this).removeAttr('style');
                        });
                        $("[data-id='" + displayTitleNumber + "']").css('background', '#333');
                        break;
                }
            }, settings.timeBetweenImages*1000);

        };

        function getSlideonTop(){
            if($("#carouselImage1").css('z-index') > $("#carouselImage2").css('z-index'))
                return 1;
            else
                return 2;
        }

        function getZIndex(ofSlide){
            return $("#carouselImage"+ofSlide).css('z-index');
        }

        $("[data-id='0']").css('background', '#333');
        $("#carouselImage1").attr('src', 'images/'+settings.imageList[0]);
        $("#carouselImage2").attr('src', 'images/'+settings.imageList[1]);
        $("#imageTitle").text(settings.imageTitle[0]);

        changeImage(-1);
        return changeImage;
    };
})(jQuery);