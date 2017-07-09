/**
 * This is required for element rendering to be possible
 * @type {PlatformElement}
 */
(function() {
    var LazyLoad = PlatformElement.extend({
        initialize: function() {
            this.parseURL();
            this.lazyLoader();
        },

        parseURL: function() {
          // Retrieve youTube URL setting
          var youtubeURL = this.settings.get('youtubeURL');
          // If the setting has a value and it is not the default value
          if (youtubeURL && youtubeURL != "") {

            // YouTube URL parser function
            function youtube_parser(url){
              url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
              return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
            }

            //set the youtube id as a variable
            var ytid = youtube_parser(youtubeURL);

            // Set the setting to the new value
            this.settings.set("youtubeURL", ytid);
            // Save the setting
            this.settings.save();
          } else {
            // Save the setting as an empty string.
          }


        },


				lazyLoader: function() {

			    var youtube = document.querySelectorAll( ".ll-youtube" );

			    for (var i = 0; i < youtube.length; i++) {

			        var source = "https://img.youtube.com/vi/"+ youtube[i].dataset.embed +"/sddefault.jpg";

			        var image = new Image();
			                image.src = source;
			                image.addEventListener( "load", function() {
			                    youtube[ i ].appendChild( image );
			                }( i ) );

			                youtube[i].addEventListener( "click", function() {

			                    var iframe = document.createElement( "iframe" );

			                            iframe.setAttribute( "frameborder", "0" );
			                            iframe.setAttribute( "allowfullscreen", "" );
			                            iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ this.dataset.embed +"?rel=0&showinfo=0&autoplay=1" );

			                            this.innerHTML = "";
			                            this.appendChild( iframe );
			                } );
				    };

					}
    });

    return LazyLoad;
})();
