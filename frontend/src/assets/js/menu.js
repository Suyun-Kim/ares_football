$(document).ready(function(){
	$("#attendance_list").click(function(){
		$(location).attr("href", "/attendance_list");
	})
	
	$("#latecomer_list").click(function(){
		$(location).attr("href", "/latecomer_list");
	})
	
	$("#member_list").click(function(){
		$(location).attr("href", "/member_list");
	})
})