/* Models / Collections */

var Activity = Backbone.Model.extend( );

var Activities = Backbone.Collection.extend({
  model: Activity
});

var Challenge = Backbone.Model.extend({
  initialize: function(obj) {
    this.set('activities',  new Activities());
    _(obj.activities).each(function(activity) {
      this.get('activities').add(activity);
    }, this);
    this.get('activities').on('selected', function() {
      console.log('Activity selected! Let\'s go...');
    });
  }
});

var Challenges = Backbone.Collection.extend({
  model: Challenge,
  url: "http://happify-test-api.herokuapp.com/api/challenges",
  initialize: function() {
    this.fetch({ reset: true });
  }
});

/* Views */

// Abstract
CollectionView = Backbone.View.extend({
  tagName: 'ul',
  initialize: function() {
    this.collection.on('reset', this.render, this);
  },
  renderOne: function(model) {
    var modelView = new this.ModelView({
      model: model
    });
    this.$el.append(modelView.render().el );
  },
  render: function() {
    this.$el.empty();
    this.collection.each(this.renderOne, this);
    return this;
  }
});

ActivityView = Backbone.View.extend({
  tagName: 'li',
  className: 'activity',
  template: _.template("<%= name %>"),
  events: {
    "click": "select"
  },
  select: function() {
    this.model.trigger("selected");

    // Optimistic
    this.$el.toggleClass("selected");
  },
  render: function() {
    this.$el.html( this.template(this.model.toJSON() ) );
    return this;
  }
});

ActivitiesView = CollectionView.extend({
  tagName: 'ul',
  className: 'activities',
  ModelView: ActivityView
});

ChallengeView = Backbone.View.extend({
  tagName: 'li',
  className: 'challenge',
  template: _.template("" + 
    "<h1><%= name %></h1>" + 
  ""),
  events: {
    "click h1": "toggle"
  },
  toggle: function() {
    this.$el.find(".activities").toggleClass("open");
  },
  render: function() {
    var activitiesView = new ActivitiesView({
      collection: this.model.get('activities')
    });
    this.$el.html( this.template(this.model.toJSON() ) );
    this.$el.append(activitiesView.render().el );
    return this;
  }
});

ChallengesView = CollectionView.extend({
  tagName: 'ul',
  className: 'challenges',
  ModelView: ChallengeView
});


function init() {
  challenges = new Challenges();
  challengesView = new ChallengesView({
    collection: challenges,
    el: $("#app")
  });
}

init();
