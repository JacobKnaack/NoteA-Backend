'use strict';

process.env.MONGO_URI = 'mongodb://localhost/notetest';

const request = require('superagent-use')(require('superagent'));
const superPromise = require('superagent-promise-plugin');
const expect = require('chai').expect;

const Note = require('../model/note');
require('../server');

request.use(superPromise);

describe('testing the note router', function() {
  describe('testing a POST to api/note', function(){
    after((done) => {
      Note.remove({}).then(() => done()).catch(done);
    });

    it('should create a note', (done) => {
      request.post('localhost:3000/api/note')
      .send({
        name: 'test note',
        content: 'this is my test note'
      })
      .then(res => {
        let note = res.body;
        expect(res.status).to.eql(200);
        expect(note.name).to.eql('test note');
        expect(note.content).to.equal('this is my test note');
        done();
      })
      .catch(done);
    });
  });

  describe('testing GET to api/note', function() {
    before((done) => {
      Promise.all([
        new Note({name: 'one note', content: 'noted'}).save(),
        new Note({name: 'two note', content: 'duly noted'}).save()
      ])
      .then(() => done()).catch(done);
    });

    after((done) => {
      Note.remove({}).then( () => done()).catch(done);
    });

    it('should return a note', (done) => {
      request.get('localhost:3000/api/note')
      .then(res => {
        let notes = res.body;
        expect(res.status).to.eql(200);
        expect(notes[0].name).to.eql('one note');
        expect(notes[1].name).to.eql('two note');
        done();
      })
      .catch(done);
    });
  });
});
