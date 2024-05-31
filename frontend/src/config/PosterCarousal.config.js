const settings = {

    infinite: false,
    autoplay: false,
    slidesToShow: 5,
    slidesToScroll: 5,
    InitialSlide: 0,
    adaptiveHeight: true,
    responsive: [
        {
            breakpoint: 1280,   // for above 1024 pixels
            settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
            }
        },
        {
            breakpoint: 1024,   // upto 1024 pixels
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,

            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                arrows: true,
                // swipeToSlide: true,         
            }
        },
        {
            breakpoint: 400,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                arrows: true,
                // swipeToSlide: true,
            }
        },
    ]
}

export default settings
