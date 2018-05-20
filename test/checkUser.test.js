const expect = require('chai').expect;
const checkUserMW = require('../middlewares/user/checkUser');

describe('checkUser middleware ', function () {

    it('ha minden rendben ment akkor üres error tömböt kapunk', function (done) {
        const req = {
            body: {
                email: 'valami',
                password: 'ezIsValami'
            }
        };
        const res = {
            tpl: {
                error: []
            }
        };
        const fakeUserModel = {
            findOne: function (some, cb) {
                cb(undefined, null)
            }
        };

        checkUserMW({
            userModel: fakeUserModel
        })(req, res, function (err) {
            expect(res.tpl.error).to.be.empty;
            expect(err).to.eql(undefined);
            done();
        });
    });

    it('ha az adatbázis hibával tér vissza akkor hibát kell kapnunk', function (done) {
        const req = {
            body: {
                email: 'valami',
                password: 'ezIsValami'
            }
        };
        const res = {
            tpl: {
                error: []
            }
        };
        const fakeUserModel = {
            findOne: function (some, cb) {
                cb('somethingWentWrong')
            }
        };

        checkUserMW({
            userModel: fakeUserModel
        })(req, res, function (err) {
            expect(res.tpl.error).to.include('adatbázis hiba');
            done();
        });
    });

    it('ha létezik már ilyen felhasználó akkor hibát kapunk', function (done) {
        const req = {
            body: {
                email: 'valami',
                password: 'ezIsValami'
            }
        };
        const res = {
            tpl: {
                error: []
            }
        };
        const fakeUserModel = {
            findOne: function (some, cb) {
                cb(undefined, { email: 'valami', password: 'ezIsValami' })
            }
        };

        checkUserMW({
            userModel: fakeUserModel
        })(req, res, function (err) {
            expect(res.tpl.error).to.include('Már létezik egy ilyen felhasználó');
            done();
        });
    });
});