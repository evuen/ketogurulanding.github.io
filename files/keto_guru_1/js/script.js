$(document).ready(function(e) {

    $('[name="country"]').on('change', function() {
        var geoKey = $(this).find('option:selected').val();
        var data = $jsonData.prices[geoKey];
        var price = data.price;
        var oldPrice = data.old_price;
        var currency = data.currency
        $("[value = "+geoKey+"]").attr("selected", true).siblings().attr('selected', false);

        $('.price_land_s1').text(price);
        $('.price_land_s2').text(oldPrice);
        $('.price_land_curr').text(currency);
    });

    $('.toform').click(function() {
        $("html, body").animate({
            scrollTop: $("#order_form").offset().top - 300
        }, 1000);
        return false;
    });

    $('.review_slider').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        accessibility: false,
        centerPadding: '30px',
        responsive: [{
            breakpoint: 991,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
                adaptiveHeight: true
            }
        }]
    });

    $('.slider_3').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        accessibility: false,
        centerPadding: '30px',
        responsive: [{
            breakpoint: 991,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                // infinite: true,
                dots: true,
                adaptiveHeight: true
            }
        }]
    });

    $('.slider_2').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 6,
        slidesToScroll: 6,
        accessibility: false,
        centerPadding: '30px',
        // vertical: true,
        responsive: [{
            breakpoint: 991,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                // infinite: true,
                dots: true,
                adaptiveHeight: true
            }
        }]
    });

    new WOW().init();
    var rellax = new Rellax('.rellax');

    var tabs = function() {
        var itemEl = '.question_item',
            tabEl = '.question_button',
            tailEl = '.answer_item',
            openedClass = 'opened';

        $(tabEl).on('click', function(event) {
            event.preventDefault();
            $(this).closest(itemEl).toggleClass(openedClass).find(tailEl).slideToggle(500)
        });

        $(itemEl).eq(0).addClass(openedClass).find(tailEl).slideToggle(500)
    }

    tabs();
    
});
