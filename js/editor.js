$(function() {

    var Data = Backbone.Model.extend({

        defaults: {         
            markdownText: "",
            parsingTime: 0,
            renderingTime: 0
        }
        
    });

    var MarkdownPanel = Backbone.View.extend({

        initialize: function(options) {
            //console.log("initializing markdown panel..."); 
            this.markdownContainer = this.$el.find('textarea');
        },
        
        events: {
            "keyup": "updateModel"
        },
        
        updateModel: function(event) {
            //console.log("updating model...");
            this.model.set("markdownText", this.markdownContainer.val());
        }
    });

    var PreviewPanel = Backbone.View.extend({

        initialize: function(options) {
            //console.log("initializing preview panel..."); 
            this.model.bind('change:markdownText', this.render, this);
            this.parser = options.parser;
            this.htmlContainer = this.$el[0];
            
            this.startTime = 0;
            this.parsingTime = 0;
            this.renderingTime = 0;
            this.text = '';
        },

        render: function() {
        
            //console.log("rendering display panel...");
            
            this.startTime = new Date().getTime();
            this.text = this.parser.makeHtml(this.model.get('markdownText'));
            this.parsingTime = new Date().getTime();
            this.model.set('parsingTime', this.parsingTime - this.startTime);
            
            this.startTime = new Date().getTime();
            this.htmlContainer.innerHTML = this.text;
            this.renderingTime = new Date().getTime();            
            this.model.set('renderingTime', this.renderingTime - this.startTime);
        }
        
    });
    
    var StatsPanel = Backbone.View.extend({

        initialize: function(options) {
            //console.log("initializing stats panel..."); 
            this.model.bind('change:parsingTime', this.render, this);
            this.htmlContainer = this.$el[0];
        },

        render: function() {
            //console.log("rendering stats panel..."); 
            this.htmlContainer.innerHTML = 'parsing: ' + this.model.get('parsingTime') + " ms / rendering: " + this.model.get('renderingTime') + " ms" ;
        }
        
    });

    var data = new Data();
    var parser = new Showdown.converter();
    var markdown = new MarkdownPanel({ el: $("#markdown"), model: data });
    var preview = new PreviewPanel({ el: $("#preview"), model: data, parser: parser });
    var stats = new StatsPanel({ el: $("#stats"), model: data });

    var textarea = $('#markdown').find('textarea');
    textarea.val(textarea.text());
    markdown.updateModel();
});
