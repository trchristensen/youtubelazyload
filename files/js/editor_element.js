/**
 * This is required for element rendering to be possible
 * @type {PlatformElement}
 */
(function() {
    var SetURL = PlatformElement.extend({
        initialize: function() {
            this.parseURL();
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


        }

    });

    return SetURL;
})();
