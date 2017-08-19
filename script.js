//search bar handler
function search(){
  $('#results').html("");
  $("#buttons").html("");

  //Get Form input
  var q = $("#query").val();

  //Make our get request
  $.get(
    "https://www.googleapis.com/youtube/v3/search",{
        part : 'snippet , id',
        q : q,
        type : 'video',
        key : "AIzaSyCwA8LI3Ps7y76_LWgy7zDUKUwIbKKnpT0"},
        function(data){
          var nextPageToken = data.nextPageToken;
          var prevPageToken = data.prevPageToken;
          $.each(data.items,function(i,item){
            var output = getOutput(item);
            $("#results").append(output);
          });
        }
  )
}

function getOutput(item){
  var id = item.id.videoId;
  var title = item.snippet.title;
  var description = item.snippet.description;
  var thumb = item.snippet.thumbnails.high.url;
  var channelTitle = item.snippet.channelTitle;
  var videoDate = item.snippet.publishedAt;

  
  //Build our output:
  var link = getLink(id);
  var output = "<li>" +
  "<div class='list-left'>" +
  "<img src = '"+ thumb +"'>" +
  "</div>" +
  "<div class='list-right'>" +
  "<h3>" + title + "</h3>" +
  "<small> By " + "<span class='cTitle'>" + channelTitle + "</span>" + " on " + videoDate + "</small>" +
 "<audio controls preload='none'>" +
 "<source src='"+ link +"' type='audio/mpeg'>"+
 "</audio>"+
  "</div>" +
  "</li>" +
  "<div class='clearfix'></div>" ;

  return output;
}

function getLink(id){
 var link = null;
 $.ajax({
  url: "https://www.youtubeinmp3.com/fetch/?format=JSON&video=https://www.youtube.com/watch?v=" + id +"",
  dataType: 'json',
  async: false,
  success: function(data){
       link = data.link;
  }
});
  return link;
  console.log(link);
}
