var View = function(selector){
  this.template = $(selector)[0];
}
View.prototype.render = function(data){
  ele = this.template.getElementsByClassName("bbb");
  ele.innerHTML = data['variable']
  console.log(ele)
}

Seshare = {

  initialize: function(){



    var that = this;
    this.$main = $('#main');
    this.$container = $('#container');
    this.$errorMessages = $(' .error-messages');
    this.session_token = Cookie.get('session_token');
    this.refreshNavBar();
    // gets current tab's domain and url
    chrome.tabs.getSelected(null, function(tab){
      var tmp = document.createElement('a');
      tmp.href = tab.url;
      that.url = tab.url;
      that.domain = tmp.hostname;
    })

    $('.nav-element.cookie-mart').click(function(){
      that.swapView('#template-cookie-mart');
      var account = new AccountModel();
      account.index().done(function(res){
        _.each(account.collection, function(ele){
          if(ele.domain === that.domain){
            var url = ele.url;
            that.$main.append('<div class="col-xs-10 col-xs-offset-1"><div class="panel panel-default">'+ele.domain+'</div></div>')
            var cookies = JSON.parse(ele.cookie);
            _.each(cookies, function(cookie){
              cookie.url = url;
              delete cookie.hostOnly;
              delete cookie.session;
              console.log(cookie);

              chrome.cookies.set(cookie, function(coo){
                console.log(coo);
              })
            });
          }
        })
      });
    })

    $('.nav-element.share-cookie').click(function(){
      that.swapView('#template-share-cookie');
        that.$main.append(
          '<div class="col-xs-10 col-xs-offset-1">'+
            '<div class="panel panel-default">'+
              '<div class="panel-body">'+
                  that.domain+
                  '<button type="button" class="btn btn-primary share-btn">Share</button>'+
              '</div>'+
            '</div>'+
          '</div>');

        // get cookies on this page
        chrome.cookies.getAll({url: that.url}, function(res){
          var cookies = res
          $('.btn.share-btn').click(function(){
            var account = new AccountModel();
            account.create({account: {
              domain: that.domain,
              session_token: Cookie.get('session_token'),
              cookie: JSON.stringify(cookies),
              url: that.url
            }}).done(function(res){
              $('.error-messages').append('<div class="alert alert-success" role="alert">Shared cookie for '+that.domain+'!</div>');
            }).fail(function(res){
              console.log(res);
              $('.error-messages').append('<div class="alert alert-danger" role="alert">Failed to share cookies for '+that.domain+'!</div>');            })
            console.log(account)
          })
        });


    })

    $('.nav-element.about').click(function(){
      that.swapView('#template-about');
    })

    $('.nav-element.my-cookies').click(function(){
      that.swapView('#template-my-cookies');
    })

    $('.nav-element.sign-up-in').click(that.showSignUpIn);

    chrome.tabs.query({}, function(tab){
      console.log(tab[2])
    });

    $('.nav-element.cookie-mart').click();
  },
  // kind of janky
  showSignUpIn: function(){
    var that = this;
    that.swapView('#template-sign-up-in');
    $('.sign-up-btn').click(function(){
      $('.error-messages').html('');
      var user = new UserModel();
      var form_data = $('.loginup-form').serializeJSON()
      user.create(form_data).done(that.logInUser).fail(function(res){
        that.showErrors(res);
      });
    });

    $('.sign-in-btn').click(function(){
      $('.error-messages').html('');
      var user = new UserModel();
      var form_data = $('.loginup-form').serializeJSON()
      user.logIn(form_data).done(
        that.logInUser
        ).fail(function(res){
          that.showErrors(res);
        }
      )
    });
  },
  showErrors: function(res){
    _.each(res.responseJSON, function(error){
      $('.error-messages').append('<div class="alert alert-danger" role="alert"><a href="#" class="alert-link">'+error+'</a></div>');
    });
  },
  logInUser: function(res){
    Cookie.set('session_token', res.session_token);
    this.current_user = new UserModel(res);
    Seshare.refreshNavBar();
    $('.nav-element.share-cookie').click()
  },
  refreshNavBar: function(){
    var that = this;
    this.session_token = Cookie.get('session_token');
    if(this.session_token){
      console.log(that.session_token);
      $('#nav-bar-account').html('<span class="nav-element sign-out">SignOut</span>')
      $('.nav-element.sign-out').click(function(){
        console.log('asdf')
        Cookie.delete('session_token')
        that.session_token = false;
        that.current_user = false;
        that.refreshNavBar();
      })
    }else{
      $('#nav-bar-account').html('<span class="nav-element sign-up-in">SignIn/Up</span>')
      $('.nav-element.sign-up-in').click(function(){
        Seshare.showSignUpIn();
      })
      $('.nav-element.sign-up-in').click()
    }
  },
  swapView: function(selector){
    this.$errorMessages.html('');
    this.$container.append(this.$main.html());
    this.$main.html('');
    var template = $(selector)[0].outerHTML;
    $(selector)[0].remove()
    this.$main.html(template);
  }
}

$(document).ready(function(){
  Seshare.initialize();
});
