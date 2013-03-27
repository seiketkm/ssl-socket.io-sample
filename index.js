$(function(){
  var socket = io.connect('//' + window.location.host);
  socket.on('update', function (data) {
    console.log(data.date);
    socket.emit('update', {});
    $('body').trigger('socketio_update', data.date);
  });
  socket.on('message', function(data){
    console.log(data.message);
  });

  var ListView = Backbone.View.extend({
    el: $('body'),

    events: {
      'socketio_update': 'addItem'
    },
    initialize: function(){
      _.bindAll(this, 'render', 'addItem');
      this.render();
    },
    render: function(){
      $(this.el).append("<ul></ul>");
    },
    addItem: function(e,data){
      $('ul', this.el).append("<li>" + data + "</li>");
    }
  });
  var listView = new ListView();
});
