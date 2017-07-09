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
          if (youtubeURL && youtubeURL != "Youtube Video URL") {

            // YouTube URL parser function
            function youtube_parser(url){
                var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
                var match = url.match(regExp);
                return (match&&match[7].length==11)? match[7] : false;
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

			    var youtube = document.querySelectorAll( ".youtube" );

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
