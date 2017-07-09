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
        videoSize: function() {
          // Retrieve SIZE setting
          var size = this.settings.get('size');
          // depending on the selected size, will return a class name for the video container.
          switch(size) {
              case "Small":
                  size = "ll-youtube-size-small";
                  return size;
                  break;
              case "Medium":
                  size = "ll-youtube-size-medium";
                  return size;
                  break;
              case "Large":
                  size = "ll-youtube-size-large";
                  return size;
                  break;
              case "Extra Large":
                  size = "ll-youtube-size-xl";
                  return size;
                  break;
              case "HD":
                  size = "ll-youtube-size-hd";
                  return size;
                  break;
              default:
              // Auto - dont add a class
                  null
          }
        },


				lazyLoader: function() {

			    var youtube = document.querySelectorAll( ".ll-youtube" );

			    for (var i = 0; i < youtube.length; i++) {

            // Add Size Class, depending on user selected option
            this.VideoSize().parent().addClass("width", videoSize());

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
