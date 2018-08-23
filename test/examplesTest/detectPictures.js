require('../javascript/ball');
require('../javascript/examples');

describe('Test the picture gallery', function() {
    it("Should not have any errors during scroll", scrollingPictures().should.equal(true));
});
