var Challenge = Backbone.Model.extend({
});
var Challenges = Backbone.Collection.extend({
  model: Challenge,
  url: "http://happify-test-api.herokuapp.com/api/challenges",
  initialize: function() {
    this.fetch({ reset: true });
  }
});

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
  }
});

ActivityView = Backbone.View.extend({
  tagName: 'li',
  className: 'activity',
  template: _.template("hi")
});

ActivitiesView = CollectionView.extend({
  tagName: 'ul',
  className: 'activities',
  ModelView: ActivityView
});

ChallengeView = Backbone.View.extend({
  tagName: 'li',
  className: 'challenge',
  template: _.template("hi"),
  render: function() {
    console.log('asdf');
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
