var audio;
var playList;
var JSON_PATH = "./data.json";
var MUSIC_PATH = "./music/";
var EXT = ".mp3";
var IMG_PATH = MUSIC_PATH + "images/";
var NO_IMG = "./img/no_image.png";
var newIdx;
var interval;
var songDuration;

$(function() {
  audio = $(".mb-audio");
  var idx = 0;
  initAudio();
  initPlayList();

  $(document).on("click", ".mb-playListArea_ul_li", function(e) {
    idx = parseInt(this.getAttribute("data-idx"));
    play(playList[idx]);
  });

  audio.on("ended", function() {
    if (idx == playList.length - 1) {
      idx = 0;
    } else {
      idx++;
    }
    play(playList[idx]);
  });


  $("#play").click(function() {
    if (audio.prop("paused")) {
      audio.trigger("play");
      $("#play i").removeClass("fa-play").addClass("fa-pause");
    } else {
      audio.trigger("pause");
      $("#play i").removeClass("fa-pause").addClass("fa-play");
    }
  });

  $("#next").click(function() {
    if (idx + 1 > playList.length - 1) {
      play(playList[playList.length - 1]);
    } else {
      play(playList[idx + 1]);
      idx++;
    }
  });

  $("#prev").click(function() {
    if (idx - 1 < 0) {
      play(playList[0]);
    } else {
      play(playList[idx - 1]);
      idx--;
    }
  });

  $("#repeat").click(function() {
    if (!audio.prop("loop")) {
      audio.prop("loop", true);
      $("#repeat i").addClass("mb-repeat");
    } else {
      audio.prop("loop", false);
      $("#repeat i").removeClass("mb-repeat");
    }
  });

  $('#progress').on('click', function(e) {
    var x = e.pageX - this.offsetLeft;
    var clickedValue = x / this.offsetWidth;
    audio.prop("currentTime", clickedValue * songDuration);
    $(this).val(clickedValue * 100);
  });

  $("#volume").click(function() {
    $("#volumeProgress").fadeToggle("slow", "linear");
  });

  $("#volumeProgress").click(function(e) {
    var x = e.pageX - this.offsetLeft;
    var clickedValue = x / this.offsetWidth;
    audio.prop("volume", clickedValue);
    $(this).val(clickedValue);

    if (clickedValue == 1) {
      if ($("#volume i").hasClass("fa-volume-down")) {
        $("#volume i").removeClass("fa-volume-down").addClass("fa-volume-up");
      } else {
        $("#volume i").removeClass("fa-volume-off").addClass("fa-volume-up");
      }
    } else if (clickedValue == 0) {
      if ($("#volume i").hasClass("fa-volume-down")) {
        $("#volume i").removeClass("fa-volume-down").addClass("fa-volume-off");
      } else {
        $("#volume i").removeClass("fa-volume-up").addClass("fa-volume-off");
      }
    } else {
      if ($("#volume i").hasClass("fa-volume-up")) {
        $("#volume i").removeClass("fa-volume-up").addClass("fa-volume-down");
      } else {
        $("#volume i").removeClass("fa-volume-off").addClass("fa-volume-down");
      }
    }
  });

});

function initAudio() {
  audio.prop("volume", 0.5);
}

function initIScroll() {
  var myScroll = new IScroll("#playListArea", {
    mouseWheel: true,
    scrollbars: true,
    fadeScrollbars: true,
    interactiveScrollbars: true
  });
}

function initPlayList() {
  $.getJSON(JSON_PATH, function() {
    console.log("Read Json Success");
  }).done(function(data) {
    playList = data;
    var ul = $(".mb-playListArea_ul");

    for (var i in data) {
      var song = data[i];
      song.durationFomatted = formatDuration(song.duration);

      var li = $("<li/>").attr({ class: "mb-playListArea_ul_li", "data-idx": i });
      ul.append(li);

      var songCover = $("<div/>").attr({ class: "mb-songCover" });

      // Process if cover is null
      var imgCover;
      if (song.picture == null) {
        imgCover = NO_IMG;
      } else {
        imgCover = IMG_PATH + song.picture;
      }
      var img = $("<img/>").attr({ src: imgCover, width: "50", height: "50" });
      songCover.append(img);

      var songContent = $("<div/>").attr({ class: "mb-songContent" });
      var songTitle = $("<div/>").attr({ class: "mb-songTitle" }).html(song.title);

      // Process if artist is null
      var artist;
      if (song.artist == null || song.artist == "") {
        artist = "Unknow Artist";
      } else {
        artist = song.artist
      }

      // Process if album is null
      var album;
      if (song.album == null || song.album == "") {
        album = "Unknow Album";
      } else {
        album = song.album
      }

      var songArtist = $("<div/>").attr({ class: "mb-songArtist" }).html(artist + " | " + album + " | " + song.durationFomatted);
      songContent.append(songTitle);
      songContent.append(songArtist);

      li.append(songCover);
      li.append(songContent);
    }

    // After display playlist -> init iScroll
    initIScroll();

    //Auto play
    // var randomIdx = Math.floor((Math.random() * (playList.length - 1)) + 1);
    // play(playList[randomIdx]);
  });
}

function play(song) {
  // Setting tilte, artist, cover
  $(".mb-songName").html(song.title);
  $(".mb-artist").html(song.artist);
  $(".mb-endTime").html(song.durationFomatted);
  $(".mb-control").css("background-image", "url(" + IMG_PATH + song.picture + ")");
  $("#play i").removeClass("fa-play").addClass("fa-pause");
  songDuration = song.duration;


  var src = $("<source/>").attr({ src: MUSIC_PATH + song.fileName + EXT, type: "audio/mp3" });
  audio.html(src);
  audio.trigger('load');
  audio.trigger('play');
  setCurrentTimePlaying();
}

function setCurrentTimePlaying() {
  if (interval !== null) {
    clearInterval(interval);
  }

  interval = setInterval(function() {
    var currentTime = audio.prop("currentTime");
    var progress = 0;
    if (!isNaN(songDuration)) {
      progress = (currentTime / songDuration) * 100;
    }

    $(".mb-currentTime").html(formatDuration(audio.prop("currentTime")));

    $("#progress").val(progress);
  }, 100);
}

function formatDuration(duration) {
  var hour = Math.floor(duration / 3600);
  var minute = Math.floor((duration - hour * 3600) / 60);
  var second = Math.floor(duration - hour * 3600 - minute * 60);
  var result = addZero(minute) + ':' + addZero(second);
  if (hour > 0) {
    result = addZero(hour) + ':' + result;
  }
  return result;
}

function addZero(num) {
  if (num < 10) return '0' + num;
  return num;
}
