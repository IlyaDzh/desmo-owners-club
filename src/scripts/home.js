const partnersSlider = tns({
    container: "#gallery-slider",
    gutter: 6,
    controls: false,
    swipeAngle: false,
    mouseDrag: true,
    nav: false,
    loop: false,
    speed: 400,
    items: 2.5,
    responsive: {
        769: {
            gutter: 25
        },
        641: {
            gutter: 12
        }
    }
});
