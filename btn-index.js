url = "https://api.lever.co/v0/postings/solestial?mode=json";

//Setting up the structure for each job posting
function createJobs(_data) {
  //Checking for potential Lever source or origin parameters
  var pageUrl = window.location.href;
  var leverParameter = "";
  var trackingPrefix = "?lever-";

  if (pageUrl.indexOf(trackingPrefix) >= 0) {
    // Found Lever parameter
    var pageUrlSplit = pageUrl.split(trackingPrefix);
    leverParameter = "?lever-" + pageUrlSplit[1];
  }
  if (options.includeCss) {
    function addCss(fileName) {
      var head = document.head
        , link = document.createElement("link");

      link.type = "text/css";
      link.rel = "stylesheet";
      link.href = fileName;

      head.appendChild(link);
    }
    addCss("https://gitwunderbread.github.io/btn-style.css");
  }

  for (i = 0; i < _data.length; i++) {
    var posting = _data[i];
    var title = posting.text;
    var description = posting.description;
    //Making each job description shorter than 250 characters
    var shortDescription =
      $.trim(description).substring(0, 250).replace("\n", " ") + "...";
    var location = posting.categories.location;
    var commitment = posting.categories.commitment;
    var team = posting.categories.team;
    var link = posting.hostedUrl + leverParameter;

    $("#jobs-container .jobs-list").append(
      '<div class="job ' +
        team +
        " " +
        location +
        " " +
        commitment +
        '">' +
        '<a class="job-title" href="' +
        link +
        '"">' +
        title +
        "</a>" +
        '<p class="tags"><span>' +
        team +
        "</span><span>" +
        location +
        "</span><span>" +
        commitment +
        "</span></p>" +
        '<p class="description">' +
        shortDescription +
        "</p>" +
        '<a class="btn" href="' +
        link +
        '">Learn more</a>' +
        "</div>"
    );
  }
}

//Fetching job postings from Lever's postings API
$.ajax({
  dataType: "json",
  url: url,
  success: function (data) {
    createJobs(data);
  }
});
