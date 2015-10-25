'use strict';

$(function() {

    //settings for slider
    var width = 920;
    var animationSpeed = 1000;
    var pause = 3000;
    var currentSlide = 1;

    //cache DOM elements
    var $slider = $('#slider');
    var $slideContainer = $('.slides', $slider);
    var $slides = $('.slide', $slider);
    var $cell = $('td') ; 
    var $button = $('input') ; 
    var $preButton = $('#previousButton_wrapper');
    var $nextButton = $('#nextButton_wrapper');
    var $table = $('.slider_table'); 
    var imageCount = $slides.length-1 ; 
	 // Interval function 
    var interval;

	 // Timer for slider 
    function startSlider() {
        interval = setInterval(function() {nextSlide();}, pause);
    }
    // pause slider 
    function pauseSlider() {
        clearInterval(interval);
    }
    // handle nextSlide function 
    var nextHandle = function() {
    	  nextSlide();
    }
    // handle previous function 
    var preHandle = function() {
    	  preSlide();
    }
    
    // Reset the slider 
    function resetSlider() {
    	currentSlide = 1;
    	updateTable(currentSlide);
    	var newMargin = (imageCount-1) * width ; 
       $slideContainer.css('margin-left', 0);
    }
    // When on last slide 
    function lastSlide() {
    	currentSlide = imageCount;
    	updateTable(currentSlide);
    	var newMargin = (imageCount) * width * -1; 
    	$slideContainer.css('margin-left', newMargin);
        $slideContainer.animate({'margin-left': '+='+width},animationSpeed);
        $preButton.bind( "click",preHandle);
    }
    // Move slides 
    function nextSlide() {
    	$nextButton.unbind( "click",nextHandle);
    	$slideContainer.animate({'margin-left': '-='+width}, animationSpeed, function() {
    		    currentSlide++ ; 
    			 updateTable(currentSlide);
    			 $nextButton.bind( "click",nextHandle);
                if (currentSlide > imageCount) {
							resetSlider(); 
							return ; 
                }
            });
        }
        
    // Move slides back
    function preSlide() {
    	$preButton.unbind( "click",preHandle);
        currentSlide-- ; 
    		if (currentSlide < 1) {
				lastSlide(); 
				return ; 
      	     }
     $slideContainer.animate({'margin-left': '+='+width}, animationSpeed, function() {
   	 updateTable(currentSlide);
   	 $preButton.bind( "click",preHandle);
            });
        }

	// When cell is clicked, move to the corresponding image in the slider 
    $cell.click(function(){
    	  // get the index value of what value was clicked 
        var slideIndex = $(this).index() ;
        var tempWidth  = width * -1; 
        tempWidth *= slideIndex ; 
        currentSlide = slideIndex+1 ; 
        updateTable(currentSlide);
        $slideContainer.css('margin-left',tempWidth);
             
    });
    
    /* Update table, so that the td is highlighted to the corresponding image 
       This could also be done with a list of images instead of an emtpy table
       ,and it will highlight the corresponding image*/
    function updateTable(slideImage){
    	var tempString= "td:nth-child(" + slideImage+ ")" ;
    	// Make sure the rest of them stay white 
    	$cell.css("background-color", "white");
    	$(tempString).css("background-color", "yellow");
    }
    
    function buttonHide() {
    	$button.css('visibility', 'hidden');
    	$table.css('visibility', 'hidden');
    }
    function buttonUnhide() {
    	$button.css('visibility', 'visible');
    	$table.css('visibility', 'visible');
    }
    
    
	 // Pause slider if mouse is over 
    $slideContainer
        .on('mouseenter', function () {pauseSlider();buttonUnhide();})
        .on('mouseleave', function () {startSlider();buttonHide();});
     $preButton
     	  .on('mouseenter',function () {pauseSlider();buttonUnhide();} )
        .on('mouseleave',function () {startSlider();buttonHide();} );
     $nextButton
     	  .on('mouseenter',function () {pauseSlider();buttonUnhide();} )
        .on('mouseleave',function () {startSlider();buttonHide();} );
     $table
     	  .on('mouseenter',function () {pauseSlider();buttonUnhide();} )
        .on('mouseleave',function () {startSlider();buttonHide();} );
        
	// Initialize init
	updateTable(currentSlide); 
    startSlider();
    buttonHide();
    $nextButton.bind( "click",nextHandle);
	$preButton.bind( "click",preHandle);
});