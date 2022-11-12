(
  () => {
    let currentVideo = "";
    let currentVideoNumber = 0;
    let playButton = document.querySelector(".ytp-play-button");
    let video = document.querySelector("video");




    if (!video) {
      video = document.querySelector("video");
    }




    function closeLastTab() {
      chrome.runtime.sendMessage({
          msg: "tab_close_msg"
        },
        function (response) {
          console.log("response from the bg", response)
        }
      );
    }
    const fetchVideosPlayed = () => {
      return new Promise((resolve) => {
        chrome.storage.sync.get([currentVideo], (obj) => {
          console.log("obj", obj);
          resolve(obj[currentVideo] ? obj[currentVideo] : 0);
        });
      });
    };
    const addNewVideoEventHandler = async () => {


      currentVideoNumber = await fetchVideosPlayed();
      currentVideoNumber++;
      if (currentVideoNumber > 6) {
        chrome.storage.sync.set({
          [currentVideo]: 0
        });
      } else {
        chrome.storage.sync.set({
          [currentVideo]: currentVideoNumber
        });
      }
    };
    addNewVideoEventHandler()






    setInterval(() => {
      video = document.querySelector("video");
      playButton = document.querySelector(".ytp-play-button");
      console.log("video", video.autoplay);
      if (video.ended) {
        if (currentVideoNumber > 5) {
          closeLastTab();
        } else {
          window.open(location.href, "_self", "");
          addNewVideoEventHandler()
        }

      }

    }, 500);





    //every 5 seconds check if the video is paused
    setInterval(() => {
      console.log("checking if video is paused", video.ended);
      if (video.paused && playButton) {
        playButton.click();
      }
    }, 5000);

  })();
