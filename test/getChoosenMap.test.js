const expect = require('chai').expect;
const getChoosenMap = require('../middlewares/reservations/getChoosenMap');

describe('getChoosenMap middleware ', function () {

    it('ha nem kaptunk URL-ben pályanevet akkor a res.tpl.maps 0. eleme lesz a választott', function (done) {
        const req = {
            query: {}
        };
        const res = {
            tpl: {
                maps: [{ name: 'aaa' }, { name: 'bbb' }, { name: 'ccc' }]
            }
        };

        getChoosenMap()(req, res, function (err) {
            expect(err).to.eql(undefined);
            expect(res.tpl.choosenMap.name).to.eql('aaa');
            done();
        });
    });

    it('ha kaptunk URL-ben pályanevet de nincs ilyen a maps tömbben akkor a res.tpl.maps 0. eleme lesz a választott', function (done) {
        const req = {
            query: { map: 'ddd' }
        };
        const res = {
            tpl: {
                maps: [{ name: 'aaa' }, { name: 'bbb' }, { name: 'ccc' }]
            }
        };

        getChoosenMap()(req, res, function (err) {
            expect(err).to.eql(undefined);
            expect(res.tpl.choosenMap.name).to.eql('aaa');
            done();
        });
    });

    it('ha kaptunk URL-ben pályanevet és van ilyen a tömbben akkor ez lesz a kiválasztott', function (done) {
        const req = {
            query: { map: 'bbb' }
        };
        const res = {
            tpl: {
                maps: [{ name: 'aaa' }, { name: 'bbb' }, { name: 'ccc' }]
            }
        };

        getChoosenMap()(req, res, function (err) {
            expect(err).to.eql(undefined);
            expect(res.tpl.choosenMap.name).to.eql('bbb');
            done();
        });
    });

});