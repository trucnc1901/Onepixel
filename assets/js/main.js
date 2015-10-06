//     // $('#content').fullpage({
//     //             menu: '#menu',
//     //             anchors: ['firstPage', 'secondPage', '3rdPage'],
//     //             // sectionsColor: ['#C63D0F', '#1BBC9B', '#7E8F7C'],
//     //             autoScrolling: false
//     //         });
// });
 $(document).ready(function() {
  var owl = $('#brand-carousel');
  owl.owlCarousel({
    margin: 10,
    nav: true,
    loop: true,
    autoplay:true,
    autoplayTimeout:1500,
    autoplayHoverPause:true,
    responsive: {
      0: {
        items: 2
      },
      600: {
        items: 4
      },
      1000: {
        items: 8
      }
    }
  });

     $('.custom1').owlCarousel({
      animateOut: 'slideOutDown',
      animateIn: 'flipInX',
      responsiveClass:true,
      responsiveRefreshRate : 200,
      responsiveBaseElement: window,
      autoplay:true,
      autoplayTimeout:4000,
      autoplayHoverPause:true,
      nav: true,
      loop:true,
      navText:[
      "<i class='fa fa-2x fa-angle-left'></i>",
      "<i class='fa fa-2x fa-angle-right'></i>"
      ],
      items: 1,
      smartSpeed: 450

    });
})
