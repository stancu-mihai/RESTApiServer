var should = require('should');
//var assert = require("chai").assert;
var child_process = require('child_process');
var request = require('supertest');
  mongoose = require('mongoose'),
  Post = require('../api/models/Model'),

describe('Blog RESTful API', function() {
	var url = 'http://localhost:3000/posts';
	var id, server;
	before(function(done) { // Before running the tests
		if(server)
			{
				server.kill();
			}
		server = child_process.exec('node server.js' , function(err, stdout,stderr){})
		mongoose.connect('mongodb://localhost/Testdb', function(){
            mongoose.connection.db.dropDatabase(function(){
                done()
            })    
        })
	})
	after(function(done) { // After running the tests
		server.kill();
		done()
	})
  describe('Basic tests', function() {
    it('GET ' + url + ' on an empty db should return []', function(done){
			request(url)
				.get('/')
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(200) //Status code
				.end(function(error, response) {
					var expectedResult = JSON.stringify([]);
					var actualResult = JSON.stringify(response.body);
					actualResult.should.equal(expectedResult);
					done();
				});
		});

		it('PUT ' + url + ' on an empty db should add a post and return it\'s properties', function(done){
		var body = {
			name: 'test'
		};
		request(url)
			.put('/')
			.send(body)
			.expect('Content-Type', 'application/json; charset=utf-8')
			.expect(200) //Status code
			.end(function(error,response) {
				response.body.should.have.property('_id');
				response.body.should.have.property('name');
				response.body.should.have.property('Created_date');
				response.body.should.have.property('status');
				response.body.name.should.equal('test');
				var expectedResult = JSON.stringify(['active']);
				var actualResult = JSON.stringify(response.body.status);
				actualResult.should.equal(expectedResult);
				id = response.body._id;
				done();
			});
		});

		it('GET ' + url + ' should return the list of posts', function(done){
		request(url)
			.get('/')
			.expect('Content-Type', 'application/json; charset=utf-8')
			.expect(200) //Status code
			.end(function(error,response) {
				response.body[0].should.have.property('_id');
				response.body[0].should.have.property('name');
				response.body[0].should.have.property('Created_date');
				response.body[0].should.have.property('status');
				response.body[0].name.should.equal('test');
				var expectedResponse = JSON.stringify(['active']);
				var actualResponse = JSON.stringify(response.body[0].status);
				actualResponse.should.equal(expectedResponse);
				var expectedId = id;
				var actualId = response.body[0]._id;
				actualId.should.equal(expectedId);
				done();
			});
		});

		it('GET ' + url + '/[ID] should return the specified post\'s properties', function(done){
		var body = {
			name: 'test'
		};
		request(url)
			.get('/' + id)
			.send(body)
			.expect('Content-Type', 'application/json; charset=utf-8')
			.expect(200) //Status code
			.end(function(error,response) {
				response.body.should.have.property('_id');
				response.body.should.have.property('name');
				response.body.should.have.property('Created_date');
				response.body.should.have.property('status');
				response.body.name.should.equal('test');
				var expectedResult = JSON.stringify(['active']);
				var actualResult = JSON.stringify(response.body.status);
				actualResult.should.equal(expectedResult);
				id = response.body._id;
				done();
			});
		});

		it('POST ' + url + '/[ID] on an empty db should return the modified post\'s properties', function(done){
		var body = {
			name: 'test modified'
		};
		request(url)
			.post('/' + id)
			.send(body)
			.expect('Content-Type', 'application/json; charset=utf-8')
			.expect(200) //Status code
			.end(function(error,response) {
				response.body.should.have.property('_id');
				response.body.should.have.property('name');
				response.body.should.have.property('Created_date');
				response.body.should.have.property('status');
				response.body.name.should.equal('test modified');
				var expectedResult = JSON.stringify(['active']);
				var actualResult = JSON.stringify(response.body.status);
				actualResult.should.equal(expectedResult);
				id = response.body._id;
				done();
			});
		});

		it('DELETE ' + url + '/[ID] on an empty db should delete the post', function(done){
		request(url)
			.delete('/' + id)
			.expect('Content-Type', 'application/json; charset=utf-8')
			.expect(200) //Status code
			.end(function(error,response) {
				response.body.should.have.property('message');
				response.body.message.should.equal('Post successfully deleted');
				done();
			});
		});

		it('GET ' + url + ' on an empty db should return []', function(done){
			request(url)
				.get('/')
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(200) //Status code
				.end(function(error, response) {
					var expectedResult = JSON.stringify([]);
					var actualResult = JSON.stringify(response.body);
					actualResult.should.equal(expectedResult);
					done();
				});
		});
  });
});