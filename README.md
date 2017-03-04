# La-Promesa_js

My implementation  of Promise pattern

## Use

### Create a defer object

``
var defer = laPrms.defer();
``


#### Get promise from defer object

``
defer.promise
``

#### Comprehensive example: 

``
var dumyFuncResolve = function ( step ){
	
		var defer = laPrms.defer();

		var functionTimeOut = function(){

				defer.resolve( "resolve msg " + step );

			}

		setTimeout( functionTimeOut, 	10 );
				
		return defer.promise;	
	};
``


### Use interface promise

You can use __then__ and __catch__ functions

#### Comprehensive example

``
var prom1 = dumyFuncResolve(1)
			.then(   
					function ( data ) { 			

						data1 = data;
						

					} 
			).catch ( 
				function( error ) {

					error3 = error;					
					
				}
			);  
``


 
