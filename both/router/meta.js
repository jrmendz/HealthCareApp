if(Meteor.isClient) {
  Meta.config({
      options: {
        // Meteor.settings[Meteor.settings.environment].public.meta.title
        title: 'Healthcare App',
        suffix: 'Healthcare'
      }
  });
}
