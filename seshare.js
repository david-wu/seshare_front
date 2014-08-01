var Model = function (){}
Model.extend = function(options){
  var CModel = function(attr){
    this.attr = (attr || {});
  }
  CModel.prototype.rootUrl = options.url;
  CModel.prototype.get = function(data){
    var that = this;
    var url = this.rootUrl+'/'+this.attr.id;
    var promise = $.ajax({
      type: 'GET',
      url: url,
      data: data || {},
    }).done(function(res){
      that.attr = res
    })
    return promise;
  }
  CModel.prototype.create = function(data){
    var that = this;
    var url = this.rootUrl;
    var promise = $.ajax({
      type: 'POST',
      url: url,
      data: data || {},
    }).done(function(res){
      that.attr = res
    })
    return promise;
  }
  return CModel
}

UserModel = Model.extend({
  url: 'http://localhost:3000/api/users'
})
UserModel.prototype.logIn = function(data){
  var that = this;
  var url = this.rootUrl+'/login';
  var promise = $.ajax({
    type: 'POST',
    url: url,
    data: data || {},
  }).done(function(res){
    that.attr = res
  })
  return promise;
}



      // $.ajax({
      //   type: 'POST',
      //   url: 'http://localhost:3000/api/users',
      //   data: $('.loginup-form').serializeJSON(),
      // }).done(function(res){
      //   console.log(res);
      // }).fail(function(res){
      //   console.log(res.responseJSON.errors);
      //   _.each(res.responseJSON.errors, function(error){
      //     $('.error-messages').append(error);
      //   })
      // });
// user.get().done(function(res){
//   console.log(res)
// }).done(function(res){
//   console.log(res)
// });

Seshare = {
  swapView: function(name){
    this.$container.append(this.$main.html());
    this.$main.html('');
  },
  initialize: function(){
    var that = this;
    this.$main = $('#main');
    this.$container = $('#container');

    this.current_user;
    accounts = [];


    // var navBarView = Seshare.navBarView();
    // $('#nav-bar').html(navBarView);
    // console.log(this.loginView({}));

    $('.nav-element.cookie-mart').click(function(){
      that.$container.append(that.$main.html());
      that.$main.html('');
    })

    $('.nav-element.share-cookie').click(function(){
    })

    $('.nav-element.my-cookies').click(function(){
    })

    $('.nav-element.sign-in-up').click(function(){
      that.$container.append(that.$main.html());
      that.$main.html('');

      var template = $('#template-sign-up-in')[0].outerHTML;
      $('#template-sign-up-in').remove()

      that.$main.html(template);

      $('.sign-up-btn').click(function(){
        $('.error-messages').html('');
        var user = new UserModel();
        var form_data = $('.loginup-form').serializeJSON()
        user.create(form_data).done(function(res){
          $('.error-messages').append('<div class="alert alert-success" role="alert"><a href="#" class="alert-link">Welcome '+res.email+'!</a></div>');
          Seshare.current_user = new UserModel(res);
        }).fail(function(res){
          console.log(res.responseJSON);
          _.each(res.responseJSON, function(error){
           $('.error-messages').append('<div class="alert alert-danger" role="alert"><a href="#" class="alert-link">'+error+'</a></div>');
          })
        });
      });

      $('.sign-in-btn').click(function(){
        $('.error-messages').html('');
        var user = new UserModel();
        var form_data = $('.loginup-form').serializeJSON()
        user.logIn(form_data).done(function(res){
          $('.error-messages').append('<div class="alert alert-success" role="alert"><a href="#" class="alert-link">Welcome '+res.email+'!</a></div>');
          Seshare.current_user = new UserModel(res);
        }).fail(function(res){
          console.log(res);
          _.each(res.responseJSON, function(error){
            $('.error-messages').append('<div class="alert alert-danger" role="alert"><a href="#" class="alert-link">'+error+'</a></div>');
          })
        });
      });

    })

    $('.sign-up-btn').click(function(){
      $('.error-messages').html('');
      var user = new UserModel();
      var form_data = $('.loginup-form').serializeJSON()
      user.create(form_data).done(function(res){
        $('.error-messages').append('<div class="alert alert-success" role="alert"><a href="#" class="alert-link">Welcome '+res.email+'!</a></div>');
        Seshare.current_user = new UserModel(res);
      }).fail(function(res){
        console.log(res.responseJSON);
        _.each(res.responseJSON, function(error){
         $('.error-messages').append('<div class="alert alert-danger" role="alert"><a href="#" class="alert-link">'+error+'</a></div>');
        })
      });
    });

    $('.sign-in-btn').click(function(){
      $('.error-messages').html('');
      var user = new UserModel();
      var form_data = $('.loginup-form').serializeJSON()
      user.logIn(form_data).done(function(res){
        $('.error-messages').append('<div class="alert alert-success" role="alert"><a href="#" class="alert-link">Welcome '+res.email+'!</a></div>');
        Seshare.current_user = new UserModel(res);
      }).fail(function(res){
        console.log(res);
        _.each(res.responseJSON, function(error){
          $('.error-messages').append('<div class="alert alert-danger" role="alert"><a href="#" class="alert-link">'+error+'</a></div>');
        })
      });
    });

    chrome.tabs.query({}, function(tab){
      console.log(tab[2])
    });



  },
  navBarView: function(options){

    var template = 'f'

    console.log(template)
    return template
  },


}



$(document).ready(function(){
  Seshare.initialize();
});

chrome.cookies.getAll({url: 'http://www.egghead.io'},
  function(res){console.log(res)}
);

// document.body.innerHTML = res