$(".n_cshe .m_list ul li").on("click", function() {
	$(this).find(".n_usre").addClass("n_showP")
	$(this).siblings().find(".n_usre").removeClass("n_showP")
})
$(".n_cshe .m_list ul li").on("click", function() {
	$(this).find(".n_usre").addClass("n_showP")
	$(this).siblings().find(".n_usre").removeClass("n_showP")
})

$(".subt").on("click",function(){
				var val= $("#nsize").val()
				
					if(val==1){
					alert("已经是最小了")
					return false
				}else{
					val--
					$("#nsize").val(val)
				}	
			})
			$(".nadd").on("click",function(){
				
				var val=$("#nsize").val()
				val++
				 $("#nsize").val(val)
			
			})
