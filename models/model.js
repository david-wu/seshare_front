var Model = function (){}
Model.extend = function(rootUrl){

  var CModel = function(attr){
    this.attr = (attr || {});
    this.rootUrl = rootUrl;
  }

  CModel.prototype.get = function(data){
    var that = this;
    var url = rootUrl + '/' + this.attr.id;
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