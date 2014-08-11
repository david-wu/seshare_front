var Model = function (){}
Model.extend = function(url){

  var CModel = function(attr){
    this.attr = (attr || {});
  }

  CModel.find = function(id, data){
    var promise = $.ajax({
      type: 'GET',
      url: url,
      data: data || {},
    })
    console.log(promise);
    return promise;
  }

  CModel.prototype.rootUrl = url;

  // Fetches CModel with attr.id and returns promise
  // cModel.get({token: 'asd2fa13sdf', timeout: 23})
  CModel.prototype.get = function(data){
    var that = this;
    var url = this.rootUrl + '/' + this.attr.id;
    var promise = $.ajax({
      type: 'GET',
      url: url,
      data: data || {},
    }).done(function(res){
      that.attr = res
    })
    return promise;
  }

  // 
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

  // This should be a CCollection method
  CModel.prototype.index = function(data){
    var that = this;
    var url = this.rootUrl;
    var promise = $.ajax({
      type: 'GET',
      url: url,
      data: data || {},
    }).done(function(res){
      that.collection = res
    })
    return promise;
  }


  return CModel
}