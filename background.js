setInterval(function(){

      $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/api/users',
        data: {'asdf'},
      }).done(function(res){
        console.log(res);
      }).fail(function(res){
        console.log(res.responseJSON.errors);
        _.each(res.responseJSON.errors, function(error){
          $('.error-messages').append(error);
        })
      });

	, 10000);