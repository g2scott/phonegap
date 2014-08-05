function generateVideoTags(data, url)
{
	var outputVideo = '';
	outputVideo += "<div class=\"col-sm-4 col-lg-4 col-md-4\"><div class=\"thumbnail\"><div class=\"span6\"><div class=\"flex-video widescreen\">";
	var replace = /<iframe class='sproutvideo-player' src='/gi;
	var link = data.link.replace(replace, "<iframe class='sproutvideo-player' src='http:");
	replace = /type=sd'/gi;
	link = data.link.replace(replace, "type=sd&amp;regularColorTop=960000&amp;regularColorBottom=d70000'");
	outputVideo += link;
	outputVideo += "</div><div class=\"caption\"><h4 class=\"pull-right\"></h4><h4><a href=\"";
	outputVideo += url + "/video_controller/build_single_video_page/" + data.v_id;
	outputVideo +=	"\">" + data.name + "</a></h4><p>" + data.description +  "</p>";
	outputVideo += "<p><a href=\"";

	outputVideo +=	url + "/public_profile_page/load/" + data.u_id + "\">" + data.user_name + "</a></p>";

	outputVideo += "</div>"; 
	// end .caption div

	// add FACEBOOK like button below 

	outputVideo += "<iframe src=\"//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fcaanapp.ca/caan/main/index.php/video_controller/build_single_video_page/" + data.v_id + "&amp;width=20&amp;layout=button_count&amp;action=like&amp;show_faces=true&amp;share=false&amp;height=27&amp;appId=129704493787021\" scrolling=\"no\" frameborder=\"0\" style=\"border:none; overflow:hidden; width:100%; height:21px;\" allowTransparency=\"true\"></iframe>";
	
	// rating reviews 
	//outputVideo += "<div class=\"ratings\"><p class=\"pull-right\">15 Views</p><span class=\"glyphicon glyphicon-star\"></span><span class=\"glyphicon glyphicon-star\"></span><span class=\"glyphicon glyphicon-star\"></span><span class=\"glyphicon glyphicon-star\"></span></p></div></div></div></div>";
	outputVideo += "</div></div></div>";
	// console.log(link);
	return outputVideo;
}

function loadMenubar (url) {
	$.getJSON( url + '/main_page/check_login', function(data){
		// console.log(data);
		if (data.login != false) {
			var profile = "<a href=\"";
			profile += url + '/profile_page';
			profile += "\"><span class=\"glyphicon glyphicon-user\">Profile</a>";
			var logout = "<a href=\"";
			logout += url + '/account/logout_user';
			logout += "\" onclick=\"logout()\"><span class=\"glyphicon glyphicon-user\">Log-out</a>";
			$('#signin').html(profile);
			$('#signup').html(logout);
		} else {
			var signin = "<a href=\"";
			signin += url + '/account/load_login';
			signin += "\"><span class=\"glyphicon glyphicon-user\">Login</a>";
			var signup = "<a href=\"";
			signup += url + '/account/register_user';
			signup += "\"><span class=\"glyphicon glyphicon-user\">Register</a>";
			$('#signin').html(signin);
			$('#signup').html(signup);

		}
	}) // getJSON end
}

function loadVideoByCategory (data, url) {
	// console.log(data);
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
		// $('#list_video').replaceAll(outputVideo);
	})
}

function loadCategory (url) {
	$.getJSON( url + '/main_page/build_category', function(data){
		// console.log(data);
		// console.log(data[1].type);
		// console.log(data.length);
		var outputVideo = '';
		for (var i=0; i < data.length; i++) {
			outputVideo += generateVideoTags(data[i],url);
		};
		var outputType =  "<p class=\"lead\"></p><div id=\"category\" class=\"list-group\">";
		outputType += "<a href=\"all_type.html\" class=\"list-group-item\">Trending</a>";
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
			
		$('#list_category').mouseenter(loadVideoByCategory(data, url));
	
	}) // getJSON end 
}

function loadVideoStream (url) {
	var outputVideo = '';
	$('#stream').click(function(e){
		e.preventDefault();
		$.getJSON( url + '/main_page/build_video_stream', function(data){
			if (data.result != false) {
				$.each(data, function(){
					$.each(this, function(key, value){
						// console.log(value);
						outputVideo += generateVideoTags(value);
					})
				});
				// var element = document.getElementById('list_video');
				// element.innerHTML = outputVideo;
				$("#list_video").html(outputVideo);
				// $('#ul').show().html
			};
			// console.log(outputVideo);
			// console.log(data);
		})
	})
}		

function logout(){
	//alert("logout");
	tokenStore = window.sessionStorage;
	tokenStore.removeItem('fbtoken');
}


function load (url) {
	// var result = <?php echo $category_name ?>
	// triger codeigniter controller to pick return
	$.ajaxSetup({
		timeout: 6000
	});

	loadMenubar(url);

	loadCategory(url);

	$('#stream').mouseenter(loadVideoStream(url));
	
}
