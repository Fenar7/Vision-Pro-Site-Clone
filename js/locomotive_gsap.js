gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  scroller: '#main',
  markers: false
});

var scroll = new LocomotiveScroll( {
    el: document.querySelector( '#main' ),
    smooth: true,
    multiplier: 1.0,
    getDirection: true,
});

// Update scroll position
scroll.on( 'scroll', ( instance ) => {
    ScrollTrigger.update();
    document.documentElement.setAttribute( 'data-scrolling', instance.direction );
});

// Scroll position for ScrollTrigger
ScrollTrigger.scrollerProxy( '#main', {
    scrollTop( value ) {
        return arguments.length ? scroll.scrollTo( value, 0, 0 ) : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector( '#main' ).style.transform ? "transform" : "fixed"
} );


ScrollTrigger.addEventListener( 'refresh', () => scroll.update() );
ScrollTrigger.refresh();


gsap.to("#page>video" ,{
    scrollTrigger:{
        trigger: `#page>video`,
        start: `3% top`,
        end: `bottom top`,
        markers: true,
        scroller:`#main`
    },
    onStart:()=>{
        document.querySelector("#page>video").play()
        console.log('triggered')
    }
})

gsap.to("#page",{
    scrollTrigger:{
        trigger: `#page`,
        start: `top top`,
        end: `bottom top`,
        scroller:`#main`,
        pin:true,
    }
})