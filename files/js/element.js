/**
 * This is required for element rendering to be possible
 * @type {PlatformElement}
 */
(function() {
    var LazyLoad = PlatformElement.extend({
        initialize: function() {
            this.ytlazyLoader();
            this.vmlazyLoader();
        },

				ytlazyLoader: function() {

          // YOUTUBE VIDEO LAZY LOADER
			    var youtube = document.querySelectorAll( ".ll-youtube" );
			    for (var i = 0; i < youtube.length; i++) {

            // console.log('There are ' +youtube.length+ ' youtube videos on this page');

  	        var source = "https://img.youtube.com/vi/"+ youtube[i].dataset.youtubeEmbed +"/sddefault.jpg";

  	        var image = new Image();
              image.src = source;
              image.addEventListener( "load", function() {
                  youtube[ i ].appendChild( image );
              }( i ) );


              youtube[i].addEventListener( "click", function() {

                  var iframe = document.createElement( "iframe" );

                  iframe.setAttribute( "frameborder", "0" );
                  iframe.setAttribute( "allowfullscreen", "" );
                  iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ this.dataset.youtubeEmbed +"?rel=0&showinfo=0&autoplay=1" );

                  this.innerHTML = "";
                  this.appendChild( iframe );
              } );
  			    }
					},

            vmlazyLoader: function() {

              // VIMEO VIDEO LAZY LOADER

    			    var vimeo = document.querySelectorAll( ".ll-vimeo" );
              for (var i = 0; i < vimeo.length; i++) {
              (function(i) {

                var vID = vimeo[i].dataset.vimeoEmbed;
                // Tell Vimeo what function to call
                var callback = 'embedVideo';

                  // Requires jQuery
                  var vimeoAPI = 'https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/' + vID + '?jsoncallback=?' + callback + '&width=640';

                  $.getJSON( vimeoAPI, {
                      format: "json",

                    })
                    .done(function( data ) {
                      console.log(i);
                      console.log(data.html);
                      console.log(data.thumbnail_url);




                // console.log('There are ' +vimeo.length + ' vimeo videos on this page');

      	        // var source = "https://img.youtube.com/vi/"+ youtube[i].dataset.youtubeEmbed +"/sddefault.jpg";
                //
                //
                //
                //
          	    //     // var image = new Image();
                //     // var vimeoThumby = vimeo[i].vimeoThumb;
                //     // var vimeoFramey = vimeo[i].vimeoFrame;
                //
                //     vimeoCall(vID);
                //
                //
                //
                //     console.log('Thumnail URL ' + vimeoThumb);
                //     console.log('Iframe ' + vimeoFrame);
                //
                //     // console.log(image.src + ' = image.src');
                //
                //
                //     $(document).ready(function() {
                //       $("img[data-vimeo-embed=" + vID + "]").attr('src', vimeo[i].vimeoThumb);
                //     });
                //
                //     vimeo[i].addEventListener( "click", function() {
                //
                //       var iframe = vimeoFrame + this.dataset.vimeoEmbed +"?&autoplay=1"
                //
                //       this.appendChild( iframe );
                //     } );

                });

              })(i)
              }
    					},
    });

    return LazyLoad;
})();
