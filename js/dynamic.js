//^^^^^^blog code=====
$('.blog-dynamic').each(function() {
  if($('body').hasClass('run')){
  //do nothing
   }else{
    filldata_blog(this);
  }
});

function filldata_blog(_this){
    var col=$(_this).data('col')?$(_this).data('col'):console.log('Thiếu thuộc tính [data-col] trong khối [product-dynamic]');
    var json_url='json'+col;
    var base_url="https://slimweb.vn/";
	var total_page=0;
	var current_page=0;
	var count_row=0;
	//get uid
	var uid = $("body").attr("uid");
	var valert=1;
	if(getParam('uid')){
	    uid=getParam('uid');
	    valert=0;
	}
	//end
	//get cate_id===
	var cate_id=$(_this).attr("cate_id");
	var demo=(uid==4316)?'1':'0';//is demo account
	
	if(demo=='1'){
		cate_id=$(_this).attr("cate_id_demo");
	}
    
    var cateid_param=getParam('cateid');
	if (typeof cateid_param !== "undefined") {
		cate_id=cateid_param;
	}
	
	var url_product=base_url+json_url+'/'+uid+'/'+cate_id;
		
	$.getJSON(url_product+'?page=0', function(data) {  
	    if(!data.pager.pages){ 
	       if(alert==1){alert('Bạn chưa có sản phẩm nào ! Dữ liệu bạn đang xem chỉ là demo.');}
	    }
	    total_page=parseInt(data.pager.pages);
		current_page=parseInt(data.pager.page);
		count_row = parseInt(data.pager.count);

		if($(_this).find('#view_more_blog')){
		    $(_this).find('#view_more_blog').data('current_page',current_page);
		    $(_this).find('#view_more_blog').data('col',col);
		    $(_this).find('#view_more_blog').data('cateid',cate_id);
		    $(_this).find('#view_more_blog').data('uid',uid);
		}
		

		$(_this).find('.blog-item').each(function( index ) {
			if(data.nodes[index] != undefined){
				$(this).find( ".title" ).text(data.nodes[index].node.title);
				$(this).find( ".date" ).text(data.nodes[index].node.date);
				$(this).find( ".desc" ).text(data.nodes[index].node.content);
				$(this).find( ".category" ).text(data.nodes[index].node.category);
				$(this).find( "a" ).attr("href",data.nodes[index].node.alias+".html");
				$(this).find( ".blog-img" ).attr("src",data.nodes[index].node.image);
			}
			else{
			    if($('body').hasClass('run')){
			     //do nothing
			    }
			    else{
        		 $(this).hide();
        		 $(this).find('#view_more_blog').hide(); 
			    }
    		}
		});
		
		var button = $(_this).find('#view_more_blog');
		button.click(function() {
            if(uid = $("body").attr("uid")){
		        view_more_blog(this);
	        }
        });
	});
}//end fill

function view_more_blog(_this){
    var current_page=$(_this).data('current_page');
    var uid=$(_this).data('uid');
    var cate_id=$(_this).data('cateid');
    
    var col=$(_this).data('col');
    var json_url='json'+col;
    var base_url="https://slimweb.vn/";
    var url_product=base_url+json_url+'/'+uid+'/'+cate_id;

    var clone;
    var next=parseInt(current_page)+1;
	var base_url=url_product+'?page='+next;
	
	$.getJSON(base_url, function(data) {
	    if(!data.pager.pages){ 
	       $(_this).hide();
	    }
	    
	    if(parseInt(data.pager.pages)==1){
              $(_this).css('display','none');
        }
	    
	    current_page=parseInt(data.pager.page);
	    $(_this).data('current_page',current_page);
        
	    
	    $.each(data.nodes, function(key, value) {
	        clone_section=$("#view_more_blog").closest(".blog-dynamic" ).clone();
            clone=clone_section.find('.blog-item:last');
            
			$(clone).find( ".title" ).text(data.nodes[key].node.title);
			$(clone).find( ".date" ).text(data.nodes[key].node.date);
			$(clone).find( ".desc" ).text(data.nodes[key].node.content);
			$(clone).find( ".category" ).text(data.nodes[key].node.category);
			$(clone).find( "a" ).attr("href",data.nodes[key].node.alias+".html");
			$(clone).find( ".blog-img" ).attr("src",data.nodes[key].node.image);

            $(clone).appendTo($("#view_more_blog").closest(".blog-dynamic").find('.row'));
            if(current_page + 1 == parseInt(data.pager.pages)){
              $(_this).css('display','none');
            }
        });
        
	});
	
}//end view_more_blog
//^^^^^^shop code=====
$('.product-dynamic').each(function() {
  if($('body').hasClass('run')){
  //do nothing
   }else{
    filldata_shop(this);
  }
});

function filldata_shop(_this){
    var col=$(_this).data('col')?$(_this).data('col'):console.log('Thiếu thuộc tính [data-col] trong khối [product-dynamic]');
    var json_url='json'+col+'_sanpham';
    var base_url="https://slimweb.vn/";
	var total_page=0;
	var current_page=0;
	var count_row=0;
	//get uid
	var uid = $("body").attr("uid");
	var valert=1;
	if(getParam('uid')){
	    uid=getParam('uid');
	    valert=0;
	}
	//end
	//get cate_id===
	var cate_id=$(_this).attr("cate_id");
	var demo=(uid==4316)?'1':'0';//is demo account
	
	if(demo=='1'){
		cate_id=$(_this).attr("cate_id_demo");
	}
    
    var cateid_param=getParam('cateid');
	if (typeof cateid_param !== "undefined") {
		cate_id=cateid_param;
	}
	
	var url_product=base_url+json_url+'/'+uid+'/'+cate_id;
		
	$.getJSON(url_product+'?page=0', function(data) {  
	    if(!data.pager.pages){ 
	       if(alert==1){alert('Bạn chưa có sản phẩm nào ! Dữ liệu bạn đang xem chỉ là demo.');}
	    }
	    total_page=parseInt(data.pager.pages);
		current_page=parseInt(data.pager.page);
		count_row = parseInt(data.pager.count);

		if($(_this).find('#view_more_product')){
		    $(_this).find('#view_more_product').data('current_page',current_page);
		    $(_this).find('#view_more_product').data('col',col);
		    $(_this).find('#view_more_product').data('cateid',cate_id);
		    $(_this).find('#view_more_product').data('uid',uid);
		}
		
		$(_this).find('.product-item').each(function( index ) {
			if(data.nodes[index] != undefined){
				$(this).find( ".title-product" ).text(data.nodes[index].node.title);
				$(this).find( ".title-product" ).attr("title",data.nodes[index].node.title);
				$(this).find( ".cate-product" ).text(data.nodes[index].node.field_sanpham_nhom);
				$(this).find( ".price-product" ).text(data.nodes[index].node.field_sanpham_gia);
				$(this).find( ".date" ).text(data.nodes[index].node.date);
				$(this).find( ".desc-product" ).text(data.nodes[index].node.content);
				$(this).find( ".state" ).text(data.nodes[index].node.field_sanpham_tinhtrang);
				$(this).find( "a:not(.my-cart-btn)" ).attr("href",data.nodes[index].node.link);
				//$(this).find( "a" ).attr("href",data.nodes[index].node.link);
				$(this).find( ".my-cart-btn" ).attr("data-id",data.nodes[index].node.nid_1);
				$(this).find( ".my-cart-btn" ).attr("data-name",data.nodes[index].node.title);
				$(this).find( ".my-cart-btn").attr("data-price",fomatPrice(data.nodes[index].node.field_sanpham_gia));				
				$(this).find( ".my-cart-btn" ).attr("data-image",data.nodes[index].node.field_sanpham_anh);
				//$(this).find( "a" ).attr("href",data.nodes[index].node.alias+'.html');
				$(this).find( ".product-img" ).attr("src",data.nodes[index].node.field_sanpham_anh);
			}
			else{
			    if($('body').hasClass('run')){
			     //do nothing
			    }
			    else{
        		 $(this).hide();
        		 $(this).find('#view_more_product').hide(); 
			    }
    		}
		});
		
		var button = $(_this).find('#view_more_product');
		button.click(function() {
            if(uid = $("body").attr("uid")){
		        view_more_product(this);
	        }
        });
	});
}//end fill

function view_more_product(_this){
    var current_page=$(_this).data('current_page');
    var uid=$(_this).data('uid');
    var cate_id=$(_this).data('cateid');
    
    var col=$(_this).data('col');
    var json_url='json'+col+'_sanpham';
    var base_url="https://slimweb.vn/";
    var url_product=base_url+json_url+'/'+uid+'/'+cate_id;

    var clone;
    var next=parseInt(current_page)+1;
	var base_url=url_product+'?page='+next;
	
	$.getJSON(base_url, function(data) {
	    if(!data.pager.pages){ 
	       $(_this).hide();
	    }
	    
	    if(parseInt(data.pager.pages)==1){
              $(_this).css('display','none');
        }
	    
	    current_page=parseInt(data.pager.page);
	    $(_this).data('current_page',current_page);
        
	    
	    $.each(data.nodes, function(key, value) {
	        clone_section=$("#view_more_product").closest(".product-dynamic" ).clone();
            clone=clone_section.find('.product-item:last');
          	$(clone).find( ".title-product" ).text(data.nodes[key].node.title);
          	$(clone).find( ".title-product" ).attr("title",data.nodes[key].node.title);
          	$(clone).find( ".cate-product" ).text(data.nodes[key].node.field_sanpham_nhom);
          	$(clone).find( ".price-product" ).text(data.nodes[key].node.field_sanpham_gia);
          	$(clone).find( ".date" ).text(data.nodes[key].node.date);
          	$(clone).find( ".desc-product" ).text(data.nodes[key].node.content);
          	$(clone).find( ".state" ).text(data.nodes[key].node.field_sanpham_tinhtrang);
            //$(clone).find( "a" ).attr("href",data.nodes[key].node.link);
            $(clone).find( "a:not(.my-cart-btn)" ).attr("href",data.nodes[key].node.link);
            $(clone).find( ".my-cart-btn" ).attr("data-id",data.nodes[key].node.nid_1);
			$(clone).find( ".my-cart-btn" ).attr("data-name",data.nodes[key].node.title);
			$(clone).find( ".my-cart-btn" ).attr("data-price",fomatPrice(data.nodes[key].node.field_sanpham_gia));
			$(clone).find( ".my-cart-btn" ).attr("data-image",data.nodes[key].node.field_sanpham_anh);
            //$(clone).find( "a" ).attr("href",data.nodes[key].node.alias+".html");
            $(clone).find( ".product-img" ).attr("src",data.nodes[key].node.field_sanpham_anh);
            $(clone).appendTo($("#view_more_product").closest(".product-dynamic").find('.row'));
            if(current_page + 1 == parseInt(data.pager.pages)){
              $(_this).css('display','none');
            }
        });
        
	});
	
}//end view_more_product
//end shop code===
//COMMON function
function getParam(k) {
    var p = {};
    window.top.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(s, k, v) {
        p[k] = v
    })
    return k ? p[k] : p;
}

function fomatPrice(price){
  return Number(price.replace(/[^0-9.-]+/g,""));
}