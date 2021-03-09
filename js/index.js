"use strict";

document.addEventListener('DOMContentLoaded', function() {

$(window).scroll(function() {
    var nav = $('.navbar');
    var top = 100;
    if ($(window).scrollTop() >= top) {
        nav.addClass('show-menu');
    } else {
        nav.removeClass('show-menu');
    }
});




//------------------------------------------------------------------------
//						OWL CAROUSEL OPTIONS
//------------------------------------------------------------------------

$('.carousel-4item-nogutters').owlCarousel({
    loop: false,
    margin: 0,
    nav: true,
    navText: ['',''],
    dotsEach: true,
    autoplay: true,
    autoplayHoverPause: true,
    rewind: true,
    startPosition:1,
    responsive: {
        0: {
            items: 1
        },
        500: {
            items: 2
        },
        1200: {
            items: 4
        }
    }

});




//------------------------------------------------------------------------
//						OWL CAROUSEL OPTIONS
//------------------------------------------------------------------------

$('.carousel-5item-nogutters').owlCarousel({
    loop: false,
    margin: 0,
    nav: true,
    navText: ['',''],
    dotsEach: true,
    autoplay: true,
    autoplayHoverPause: true,
    rewind: true,
    startPosition:1,
    responsive: {
        0: {
            items: 1
        },
        400: {
            items: 3
        },
        700: {
            items: 3
        },
        1200: {
            items: 5
        }
    }

});




//------------------------------------------------------------------------------------
//						CONTACT FORM VALIDATION'S SETTINGS
//------------------------------------------------------------------------------------
$('#subscribe-block-form').validate({
    onfocusout: false,
    onkeyup: false,
    rules: {
		NAME: "required",
		PHONE: "required",
		EMAIL: "required",
	},
    errorPlacement: function (error, element) {

        if ((element.attr("type") == "radio") || (element.attr("type") == "checkbox")) {
            error.appendTo($(element).parents("div").eq(0));
        } else {
            error.insertAfter(element);
        }
    }
});

//------------------------------------------------------------------------------------
//								CONTACT FORM SCRIPT
//------------------------------------------------------------------------------------

$('#subscribe-block-form').submit(function () {
    // submit the form
    //data area
    var data = [];
    var $fields = $(this).find('.form-group, div.radio');
    $fields.each(function(indx, el){
        if ($( el ).hasClass('radio')) {
            var name = $( el ).find('.label-name').html();
            var $radioinput = $(el).find('input');
            $( el).find('input').each(function(indx, el){
                if ( $(el)[0].checked) {
                    var value = $(el).parent().find('span.lbl').html();
                    data.push({ name: name, value: value, name_attr: $radioinput.attr('name') });
                    return;
                }
            });
        } else if ($( el ).find('input').attr('type') === 'checkbox') {
            var $input = $( el ).find( 'input' );
            data.push( {name: $input.attr( 'placeholder' ), value: $input[0].checked ? 'checked' : 'unchecked', name_attr: $input.attr('name')} );
        } else if ($( el ).find('select')[0]) {
            var name = $( el ).find('select option' ).val();
            var $select = $(el).find('select');
            data.push({ name: name, value: $select.val(), name_attr: $select.attr('name')});
        } else if ($( el ).find('textarea')[0]) {
            var $textarea = $(el).find('textarea');
            data.push({ name: $textarea.attr('placeholder'), value: $textarea.val(), name_attr: $textarea.attr('name') });
        } else {
            var $input = $(el).find('input');
            data.push({ name: $input.attr('placeholder'), value: $input.val(), name_attr: $input.attr('name') });
        }
    });
    //end data area
    if ($(this).valid()) {
        $(this).find('[type=submit]').button('loading');
        var form = new FormData();
        var $inputFiles = $('.inputfile');
        $inputFiles.each(function(indx, inputFile){
            $.each(inputFile.files, function(i, file) {
                form.append('file-' + indx + '-' + i, file);
            });
        });
        form.append('data', JSON.stringify(data));
        form.append('id', this.id);
        var action = $(this).attr('action');
        $.ajax({
            url: action,
            type: 'POST',
            data: form,
            cache: false,
            contentType: false,
            processData: false,
            success: function () {
                $('#subscribe-block-form').find('[type=submit]').button('complete');
            },
            error: function () {
                $('#subscribe-block-form').find('[type=submit]').button('reset');
            }
        });
    } else {
        //if data was invalidated
    }
    return false;
});
	var base_url="https://slimweb.vn/";
	var total=0;
	var current=0;
	//get uid
	var uid = $("body").attr("uid");
	var valert=1;
	if(getParam('uid')){
	    uid=getParam('uid');
	    valert=0;
	}
	//end
	//get cate_id
	var cate_id=$(".blog-dynamic").attr("cate_id");
	
	var url=base_url+'json3/'+uid+'/'+cate_id;
	
	
	$.getJSON(url+'?page=0', function(data) {    
	    if(!data.pager.pages){ 
	       if(alert==1){alert('Bạn chưa có bài viết blog nào ! Dữ liệu bạn đang xem chỉ là demo.');}
	    }
	    
	   
	    
		total=parseInt(data.pager.pages);
		current=parseInt(data.pager.page);
		$('.blog-dynamic .blog-item').each(function( index ) {
			if(data.nodes[index] != undefined){
				$(this).find( ".item-title h4.title" ).text(data.nodes[index].node.title);
				$(this).find( ".item-title p.date" ).text(data.nodes[index].node.date);
				$(this).find( ".item-title p.desc" ).text(data.nodes[index].node.content);
				$(this).find( "a" ).attr("href",data.nodes[index].node.link);
				$(this).find( "a .item-img" ).attr("src",data.nodes[index].node.image);
			}
		});
	});
	
var button = document.getElementById("view_more");
	button.addEventListener("click",function(){
	    if(uid = $("body").attr("uid")){
	        view_more();
	    }
		
	});
	//start view_more
function view_more(){
    var uid = $("body").attr("uid");
    var clone;
    var next=current+1;
    var base_url=url+'?page='+next;
	$.getJSON(base_url, function(data) {
	    current=parseInt(data.pager.page);
	    
	    if(parseInt(data.pager.pages)==1){
              $("#view_more" ).css('display','none');
        }
	    
	    $.each(data.nodes, function(key, value) {
	        clone=$('.blog-dynamic .blog-item:last').clone();
          	$(clone).find( ".item-title h4.title" ).text(data.nodes[key].node.title);
			$(clone).find( ".item-title p.date" ).text(data.nodes[key].node.date);
			$(clone).find( ".item-title p.desc" ).text(data.nodes[key].node.content);
			$(clone).find( "a" ).attr("href",data.nodes[key].node.link);
			$(clone).find( "a .item-img" ).attr("src",data.nodes[key].node.image);
            $(clone).appendTo( ".blog-dynamic div.row" );
            if(current + 1 == parseInt(data.pager.pages)){
              $("#view_more" ).css('display','none');
            }
           
        });
        
	});
	
}//end view_more

	
	function getParam(k){
     var p={};
     window.top.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(s,k,v){p[k]=v})
     return k?p[k]:p;
   }




$(document).on('click', '.btbg', function() {
    $(this).find('.social_chat').toggleClass('hidden');
});


});
