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