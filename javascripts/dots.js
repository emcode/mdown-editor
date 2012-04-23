$(function(){



    var Data = Backbone.Model.extend({

        defaults: {         
            data: "empty todo...",
        },

        initialize: function() {
            console.log("initializing model...");
        }

    });



    var SettingsPanel = Backbone.View.extend({

        initialize: function() {
            console.log("initializing settings panel...");
        },
        
        events: {
            "keyup #textarea": "updateData",
            "change input": "changeData"
        },
        
        updateData: function(event) {
            // Button clicked, you can access the element that was clicked with event.currentTarget
            console.log("updating data...");
            this.model.set("data", this.$el.find("textarea").val());
        },
        
        changeData: function(event) {
        },

        render: function() {
            console.log("rendering settings panel...");
        }

    });

    var DisplayPanel = Backbone.View.extend({

        initialize: function() {
            console.log("initializing display panel...");
            this.model.bind('change', this.render, this);
        },

        events: {

        },

        render: function() {
            console.log("rendering display panel...");
            this.$el.find("textarea").val(this.model.get('data'));  
        }

    });

    /*
    function draw() 
    {
      var canvas = $("#canvas");
      
      context = canvas.getContext("2d");
      
      context.canvas.width  = canvas.parent.attr("width");
      context.canvas.height = canvas.parent.attr("width");
      
    }
    */    
    
    var data = new Data();
    var display = new DisplayPanel({ el: $("#display-panel"), model: data });
    var settings = new SettingsPanel({ el: $("#settings-panel"), model: data });

});
