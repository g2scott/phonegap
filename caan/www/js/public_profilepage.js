function generateVideoTags(data)
{
	var outputVideo = '';
	outputVideo += "<div class=\"col-sm-6 col-lg-6 col-md-6\"><div class=\"thumbnail\"><div class=\"span6\"><div class=\"flex-video widescreen\">";
	var replace = /<iframe class='sproutvideo-player' src='/gi;
	
	var link = data.link.replace(replace, "<iframe class='sproutvideo-player' src='http:");
	
	outputVideo += link;
	
	outputVideo += "</div><div class=\"caption\"><h4 class=\"pull-right\"></h4><h4><a href=\"#\">" + data.name + "</a></h4><p>" + data.description +  "</p></div>";
	//FACEBOOK
	outputVideo += "<iframe src=\"//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fcaanapp.ca/caan/main/index.php/video_controller/build_single_video_page/" + data.v_id + "&amp;width=20&amp;layout=button_count&amp;action=like&amp;show_faces=true&amp;share=false&amp;height=27&amp;appId=129704493787021\" scrolling=\"no\" frameborder=\"0\" style=\"border:none; overflow:hidden; width:100%; height:21px;\" allowTransparency=\"true\"></iframe>";
	
	//outputVideo += "<div class=\"ratings\"><p class=\"pull-right\">15 reviews</p><span class=\"glyphicon glyphicon-star\"></span><span class=\"glyphicon glyphicon-star\"></span><span class=\"glyphicon glyphicon-star\"></span><span class=\"glyphicon glyphicon-star\"></span></p></div></div></div></div>";
	outputVideo += "</div></div></div>";
	return outputVideo;
}

function load (url, userId)
{
	$.ajaxSetup({
		timeout: 6000
	});
	//console.log(url);
	$.getJSON(url + '/public_profile_page/build_public_profile/' + userId, function(data){
		var userName = data[0].user_name;
		var aboutMe = data[0].about_me_text;
		//console.log(userName);
		//console.log(aboutMe);
		$('#user_name').html(userName);
		$('#about_me').html(aboutMe);
	});
	
	$.getJSON(url + '/public_profile_page/build_public_video_list/' + userId, function(data){
		//console.log(data);
		var outputVideo = '';
		for (var i=0; i < data.length; i++) {
			outputVideo += generateVideoTags(data[i]);
		}
		$('#list_video').html(outputVideo);
	});

	$.getJSON(url + '/public_profile_page/build_follow_button/' + userId, function(data){
		var output = '';
		var tester = data.data;
		console.log(data.data);
		if (tester != null) {	
		// build output by adding variable data(data is the text of follow or unfollow)
			if (tester == true) {
				output = "<a class=\"btn btn-primary\" href=\"" + url + "/public_profile_page/unfollow/" + userId + "\">unfollow</a>";
			} else {
				output = "<a class=\"btn btn-primary\" href=\"" + url + "/public_profile_page/follow/" + userId +"\">Follow</a>";
			} 
		}
		console.log(output);
		console.log("output");
		$('#follow').html(output);
	});

	$.getJSON(url + '/public_profile_page/find_user_img_path/' + userId, function(data){
		// console.log(data);
		// console.log(data.file);
		if ( data.file!= null) {
			var img_path = data.file;
			$('#profile_img :first-child').attr('src', img_path);
		};
	});



}