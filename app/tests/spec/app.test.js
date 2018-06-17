describe("Testing makeRequest functions", function() {

    beforeEach(function() {
        spyOn(XMLHttpRequest.prototype, 'open').and.callThrough();
        spyOn(XMLHttpRequest.prototype, 'getAllResponseHeaders').and.callThrough();
        spyOn(XMLHttpRequest.prototype, 'send');
    });

    it("Function has been called", function() {
        spyOn(window, 'makeRequest');
        makeRequest();
        expect(makeRequest).toHaveBeenCalled();
    });

    it("A new XMLHTTPRequest instance is opened", function() {
        var callback = jasmine.createSpy("callback");
        makeRequest("/tickets.json?page=1&per_page=25", callback);
        expect(XMLHttpRequest.prototype.open).toHaveBeenCalled();
        
    });

    it("API Request is made", function() {
        var callback = jasmine.createSpy("callback");
        makeRequest("/tickets.json?page=1&per_page=25", callback);
        expect(XMLHttpRequest.prototype.send).toHaveBeenCalled();
    });
    
});