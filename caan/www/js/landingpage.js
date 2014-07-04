function generateVideoTags(data, url)
{
	var outputVideo = '';
	// outputVideo += "<div class=\"col-sm-4 col-lg-4 col-md-4\"><div class=\"thumbnail\"><div class=\"span6\"><div class=\"flex-video widescreen\"><iframe src=\'";
	outputVideo += "<div class=\"col-sm-4 col-lg-4 col-md-4\"><div class=\"thumbnail\"><div class=\"span6\"><div class=\"flex-video widescreen\">";
	outputVideo += data.link;
	// outputVideo += "\' allowfullscreen></iframe></div><div class=\"caption\"><h4 class=\"pull-right\"></h4><h4><a href=\"#\">" + data.name + "</a></h4><p>" + data.description +  "</p></div><div class=\"ratings\"><p class=\"pull-right\">15 reviews</p><span class=\"glyphicon glyphicon-star\"></span><span class=\"glyphicon glyphicon-star\"></span><span class=\"glyphicon glyphicon-star\"></span><span class=\"glyphicon glyphicon-star\"></span></p></div></div></div></div>";
	outputVideo += "</div><div class=\"caption\"><h4 class=\"pull-right\"></h4><h4><a href=\"#\">" + data.name + "</a></h4><p>" + data.description +  "</p>";
	outputVideo += "<p><a href=\"";

	outputVideo +=	url + "/public_profile_page/load/" + data.u_id + "\">" + data.first + " " + data.last + "</a></p>";

	outputVideo += "</div>"; 
	// end .caption div

	// add like button below 
	//outputVideo += "<div class=\"fb-like\" data-href=\"";
	//outputVideo += "https://developers.facebook.com/docs/plugins/\"";

	//outputVideo += "data-layout=\"button\" data-action=\"like\" data-show-faces=\"true\" data-share=\"true\"></div>";

	// rating reviews 
	outputVideo += "<div class=\"ratings\"><p class=\"pull-right\">15 reviews</p><span class=\"glyphicon glyphicon-star\"></span><span class=\"glyphicon glyphicon-star\"></span><span class=\"glyphicon glyphicon-star\"></span><span class=\"glyphicon glyphicon-star\"></span></p></div></div></div></div>";
	return outputVideo;
}


function load (url) {
	// var result = <?php echo $category_name ?>
	// triger codeigniter controller to pick return
	$.ajaxSetup({
		timeout: 6000
	});
	console.log(url);
	$.getJSON( url + '/main_page/build_category', function(data){
		// console.log(data);
		// console.log(data[1].type);
		// console.log(data.length);
		var outputVideo = '';
		for (var i=0; i < data.length; i++) {
			outputVideo += generateVideoTags(data[i],url);
		};
		var outputType =  "<p class=\"lead\">Video Category</p><div id=\"category\" class=\"list-group\">";
		outputType += "<a href=\"all_type.html\" class=\"list-group-item\">All Category</a>";
		outputType += "<a href=\"" + data[0].type + ".html\" class=\"list-group-item\">" + data[0].type + "</a>";
		for (var i=1; i < data.length; i++) {
			if(data[i].type != data[i-1].type){
				outputType += "<a href=\""+ data[i].type +".html\" class=\"list-group-item\">";
				outputType += data[i].type;
				outputType += "</a>";
			}
		}
			outputType += "</div>";
			// console.log(outputVideo);
			$('#list_category').html(outputType);
			$('#list_video').html(outputVideo);
			
	
		$('#list_category').mouseenter(loadVideoByCategory);

		function loadVideoByCategory(){
			$('#category').find('a').on('click', function(e){
				e.preventDefault();
				var type = $(this).attr('href');
				var index = type.indexOf('.');
				type = type.slice(0, index);
				// console.log(type);
				var outputVideo = '';
				
				if (type == 'all_type'){
					for (var i=0; i<data.length; i++){
						outputVideo += generateVideoTags(data[i], url);
					}
				}else{
					for (var i=0; i < data.length; i++) {
						// console.log(data[i].type);
						if (type == data[i].type) {
							outputVideo += generateVideoTags(data[i], url);
						}
					}
				}	
				$('#list_video').html(outputVideo);
			})
		}
	
	
	}) // getJSON end 
}
