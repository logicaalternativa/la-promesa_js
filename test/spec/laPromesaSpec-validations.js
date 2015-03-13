
describe("Test la-promesa_js validations", function( ) {	
		
	it( "Test It calls 'reject' two times - defered", function( ) {	
		
		var error; 	
		
		var dumyFuncReject = function ( step ){
		
			var defer = laPrms.defer();
			
			defer.reject( "reject msg " + step );
			defer.reject( "reject msg " + step );

			return defer.promise;
			
		};
		
		try {
			
			dumyFuncReject() 
			
		} catch ( err ) {
			
			error = err;
		}
		
		expect( "The promise is already rejected" ).toEqual( error );
		

	});
	
	it( "Test It calls 'reject' two times - prms", function( ) {	
		
		var error; 	
		
		var dumyFuncReject = function ( step ){
		
			var prmsFunc = function ( resolve, reject ) {
			
				reject( "resolve msg " + step );
				reject( "resolve msg " + step );
				
			}		
					
			return laPrms.createPromise( prmsFunc );	
			
		};
		
		try {
			
			dumyFuncReject() 
			
		} catch ( err ) {
			
			error = err;
		}
		
		expect( "The promise is already rejected" ).toEqual( error );
		

	});
	
	it( "Test It calls 'resolve' two times - defered", function( ) {	
		
		var error; 	
		
		var dumyFuncResolve = function ( step ){
		
			var defer = laPrms.defer();
			
			defer.resolve( "resolve msg " + step );
			defer.resolve( "resolve msg " + step );

			return defer.promise;
			
		};
		
		try {
			
			dumyFuncResolve() 
			
		} catch ( err ) {
			
			error = err;
		}
		
		expect( "The promise is already resolved" ).toEqual( error );
		

	});
	
	it( "Test It calls 'resolve' two times - prms", function( ) {	
		
		var error; 	
		
		var dumyFuncResolve = function ( step ){
		
			var prmsFunc = function ( resolve, reject ) {
			
				resolve( "resolve msg " + step );
				resolve( "resolve msg " + step );
				
			}		
					
			return laPrms.createPromise( prmsFunc );	
			
		};
		
		try {
			
			dumyFuncResolve() 
			
		} catch ( err ) {
			
			error = err;
		}
		
		expect( "The promise is already resolved" ).toEqual( error );
		

	});
	
});
