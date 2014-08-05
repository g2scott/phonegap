function generateVideoTags(data, url)
{
	var outputVideo = '';
	// outputVideo += "<div class=\"col-sm-6 col-lg-6 col-md-6\"><div class=\"thumbnail\"><div class=\"span6\"><div class=\"flex-video widescreen\"><iframe src=\'";
	outputVideo += "<div class=\"col-sm-6 col-lg-6 col-md-6\"><div class=\"thumbnail\"><div class=\"span6\"><div class=\"flex-video widescreen\">";
	var replace = /<iframe class='sproutvideo-player' src='/gi;
	var link = data.link.replace(replace, "<iframe class='sproutvideo-player' src='http:");
	outputVideo += link;
	// outputVideo += "\' allowfullscreen></iframe></div><div class=\"caption\"><h4 class=\"pull-right\"></h4><h4><a href=\"#\">" + data.name + "</a></h4><p>" + data.description +  "</p></div><div class=\"ratings\"><p class=\"pull-right\">15 reviews</p><span class=\"glyphicon glyphicon-star\"></span><span class=\"glyphicon glyphicon-star\"></span><span class=\"glyphicon glyphicon-star\"></span><span class=\"glyphicon glyphicon-star\"></span></p></div></div></div></div>";
	
	//HYPERLINK TO SINGLE VIDEO PAGE OR EDIT PAGE
	outputVideo += "</div><div class=\"caption\"><h4 class=\"pull-right\"></h4><h4><a href=\"#\">" + data.name + "</a></h4><p>" + data.description +  "</p>";
	outputVideo += "<p><a class=\"btn btn-xs btn-danger\" href=\"";
	outputVideo += url + "/profile_page/delete/" + data.v_id;
	outputVideo += "\" onclick=\"return confirm('Are you sure?') \"><i class=\"fa fa-trash-o fa-lg\"></i>Delete</span></a></p></div>";
	
	var source = data.link.replace(replace, "https:");
	source = source.substring(0,source.lastIndexOf("?"));
	//SHARE
	outputVideo += "<a  onclick=\"share('" + url + "/video_controller/build_single_video_page/" + data.v_id + "', '" + data.poster_frame + "', '" + source + "', '" + data.name + "', '" + data.description + "')\" class=\"btn btn-facebook\" style=\"color:#3B5999;\"><i class=\"fa fa-facebook\"></i> Share on Facebook</a>";
	
	//outputVideo += "<div class=\"ratings\"><p class=\"pull-right\">15 reviews</p><span class=\"glyphicon glyphicon-star\"></span><span class=\"glyphicon glyphicon-star\"></span><span class=\"glyphicon glyphicon-star\"></span><span class=\"glyphicon glyphicon-star\"></span></p></div></div></div></div>";
	outputVideo += "</div></div></div>";
	return outputVideo;
}

//	\"http://caanapp.ca/caan/main/index.php/video_controller/build_single_video_page/\"" + data.v_id + ", ";
//	outputVideo += data.thumbnail + "

function load (url) 
{
	$.ajaxSetup({
		timeout: 6000
	});
	//console.log(url);

	$.getJSON(url + '/profile_page/build_profile', function(data){
		// console.log(data);
		var userName = data[0].user_name;
		var aboutMe = data[0].about_me_text;
		// console.log(userName);
		//console.log(aboutMe);
		$('#user_name').html(userName);
		$('#about_me').html(aboutMe);
	});
	
	$.getJSON(url + '/profile_page/build_video_list', function(data){
		// console.log(data);
		var outputVideo = '';
		if (data != null) {
			for (var i=0; i < data.length; i++) {
			outputVideo += generateVideoTags(data[i],url);
			}
			$('#list_video').html(outputVideo);
		};
	});

	$.getJSON(url + '/profile_page/find_user_img_path', function(data){
		// console.log(data);
		// console.log(data.file);
		if ( data.file != null) {
			//var file = data.file;
			//var img_path = data.url + 'assets/img/profile/' + data.file;
			
			var img_path = data.file;
			if ( data.file!= null) {
				$('#profile_img :first-child').attr('src', img_path);
			}
		};
	});

}
