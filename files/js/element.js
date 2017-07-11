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
    var youtube = $( "#youtube-"+ this.element_id );
    if(youtube.length > 0) {
      var source = "https://img.youtube.com/vi/"+ youtube[0].dataset.youtubeEmbed +"/sddefault.jpg";
      var image = new Image();
      image.src = source;

      image.addEventListener( "load", function() {
          youtube[0].appendChild( image );
      }() );

      youtube[0].addEventListener( "click", function() {
        var iframe = document.createElement( "iframe" );
        iframe.setAttribute( "frameborder", "0" );
        iframe.setAttribute( "allowfullscreen", "" );
        iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ this.dataset.youtubeEmbed +"?rel=0&showinfo=0&autoplay=1" );
        this.innerHTML = "";
        this.appendChild( iframe );
        });
      }
		},

    vmlazyLoader: function() {
      // VIMEO VIDEO LAZY LOADER
	    var vimeo = $( "#vimeo-"+ this.element_id );

      for (var h = 0; h < vimeo.length; h++) {
        (function(h) {

          var vimeoID = vimeo[0].dataset.vimeoEmbed;
          // Tell Vimeo which function to call
          var callback = 'embedVideo';
          var vimeoAPI = 'https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/' + vimeoID + '?jsoncallback=?' + callback + '&width=640';

          $.getJSON( vimeoAPI, {
            format: "json",
          })
          .done(function( data ) {
            var vimThumb = data.thumbnail_url;
            var vimIframe = data.html;
            console.log(data.thumbnail_url);
            console.log(data.html);

            var image = new Image();
            image.src = vimThumb;

            image.addEventListener( "load", function() {
                vimeo[0].appendChild( image );
            }() );

            var autoPlay = '?autoplay=1';

            function autoplayIframe(iframe, add) {
              // search for 'src' in the iframe
              var startFromSrc = iframe.slice(iframe.search('src'));
              // isolate the url in the iframe
              var sourceURL    = startFromSrc.slice(5, startFromSrc.search(' ') - 1);
              // add the string argument to the end of the url
              var str2 = sourceURL.concat(add);
              // replace the string with the new url
              var replace = iframe.replace(sourceURL, str2);
              // return
              return replace;
            }

            autoplayIframe(vimIframe, autoPlay);

            vimeo[0].addEventListener( "click", function() {
              console.log('clicked' + this);
              $(this).append( vimIframe );

              });

          });
        })(h);
      }
		},
  });

  return LazyLoad;
})();
