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
          var url = this.settings.get('videoURL');

          function parseVideo (url) {
          var url = url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

           if (RegExp.$3.indexOf('youtu') > -1) {
               var type = 'youtube';
           } else if (RegExp.$3.indexOf('vimeo') > -1) {
               var type = 'vimeo';
           }


            return {
                    type: type,
                    id: RegExp.$6
                };
            }

          // If the setting has a value and it is not the default value
          if (url && url != "") {

            var videoObj = parseVideo(url);
            var videoID = videoObj.id;
            var videoType = videoObj.type;


            // Set the setting to the new value
            this.settings.set("videoURL", videoID);
            this.settings.set("videoType", videoType);
            // Save the setting
            this.settings.save();
          } else {
            // Save the setting as an empty string.
          }


        }

    });

    return SetURL;
})();
