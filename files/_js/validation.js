var domain = window.location.hostname;
var already = {
    startFilling: false,
    mistakeFilling: false,
    successFilling: false
};

var feed = {
	submit: function(e, elem, field) {
		var form = $(elem);
		var phone = form.find('[name=phone]').val();
		var name = form.find('[name=name]').val();
		var rephone = /^[0-9\-\+\(\) ]*$/i;
		var cookie_life = new Date(new Date().getTime() + 300 * 1000); // 5 мин
		
		$('.errorMessage').remove();
	
		if(!name.length || name.length < 3){
			e.preventDefault();
			return feed.errorMessage(form.find('[name=name]'), 'Вы не представились', field);
		}

		if(!phone.length || phone.length < 5){
			e.preventDefault();
			return feed.errorMessage(form.find('[name=phone]'), 'Вы не заполнили поле "Телефон"', field);
		}
		
		if(!rephone.test(phone)){
			e.preventDefault();
			return feed.errorMessage(form.find('[name=phone]'), 'Неверно заполнено поле "Телефон"', field);
		}

		formIsSubmitted = true; 
		document.cookie = "formIsSubmitted=true; path=/; expires=" + cookie_life.toUTCString();
		
        feed.reachGoal("successFilling");
	},

	errorMessage: function(elem, msg, field) {

		if (field.length) {
			field.text(msg).slideDown(300);
		} else {
			$('<div class="errorMessage">' + msg + '</div>').appendTo('body').css({
				'left': $(elem).offset().left,
				'top': $(elem).offset().top + 30
			});
		}

        feed.reachGoal("mistakeFilling");

		return false;
	},

    reachGoal: function(goal) {
        try {
            var params = {};
            params[domain] = goal;

            if(already[goal] != true) {
                yaCounter22765945.reachGoal("formFilling", params);
                already[goal] = true;
            }
        } catch(e) {}
    }
};

$(document).ready(function(){
	$(document).on('submit', '.orderformcdn', function(e) {
		var $errField = $(this).find('.errField');
		feed.submit(e, this, $errField);
	});


	$('input[type="text"]').on('focus', function(){
		$('.errorMessage').remove();
		$('.errField').slideUp();
        feed.reachGoal("startFilling");
	});
});