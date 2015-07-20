//This is where we setup the inital plugin.
'use strict';

var server = 'http://localhost:1337';

//HUD basic Structure
var hud = '\
<!-- Inserted by SourceCheck™ Chrome Extension -->\
<div id="sc-ownership-banner" style="display:none" class="sc-ownership-banner sc-active sc-bad">\
  <div class="sc-wrap">\
    <div class="sc-icon"></div>\
    <div class="sc-data">\
      <div class="sc-data-wrap">\
        <div class="sc-tld"></div>\
        <div class="sc-ownership-chain"></div>\
        <div class="sc-more-info"></a></div>\
      </div>\
    </div>\
  </div>\
</div>';

//Sheild Icon
var shield = document.createElement('img'); 
var iconUrl = chrome.extension.getURL("images/WhiteSheildIcon.png"); 
shield.src = iconUrl;
$(shield).addClass("sc-shield");

chrome.extension.sendMessage({}, function(response) {
	var loadInterval = setInterval(function() {
		clearInterval(loadInterval);

    $.ajax({
      type: "GET",
      url: server + "/sources/find?host=" + window.location.hostname,
      success: function (result) {

        console.log("Result");
        console.log(result);
        if (result.sources.length > 0) {
          //TODO: API Call processing
          var source = result.sources[0];
          var direct_owner = result.organizations[0];
          //Add HUD to document
          $(document.body).prepend(hud);

          console.log("Host: %s", source.host);
          console.log("Owner: %s", direct_owner.name);
          console.log($(hud).find(".sc-tld"));

          //Ownership - Todo: Add Parents
          var owner_label = direct_owner.name;

          $(".sc-tld").html(source.host);
          $(".sc-icon").html(shield);
          $(".sc-ownership-chain").html(owner_label);
          $("#sc-ownership-banner").show();
        } else {
          //$("#sourcecheck_hud").text("Could not find any data relating to this site. Contribute?");        
        }
      }
    });

	}, 10);
})