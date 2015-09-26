import E from 'ember';

export default E.Mixin.create({

  state: E.inject.service(),

  notifyState: E.on('init', function(){

    const attributes = ['isDeleted'];

    this.eachAttribute(key => {
      attributes.push(key);
    });

    this.eachRelationship(key => {
      attributes.push(key);
    });

    attributes.forEach(attr => {
      this.addObserver(attr, () => {
        this.get('state').fetchNewState();
      });
    });
  })

});
