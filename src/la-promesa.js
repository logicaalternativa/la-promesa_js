//      This program is free software; you can redistribute it and/or modify
//      it under the terms of the GNU General Public License as published by
//      the Free Software Foundation; either version 2 of the License, or
//      (at your option) any later version.
//      
//      This program is distributed in the hope that it will be useful,
//      but WITHOUT ANY WARRANTY; without even the implied warranty of
//      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//      GNU General Public License for more details.
//      
//      You should have received a copy of the GNU General Public License
//      along with this program; if not, write to the Free Software
//      Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
//      MA 02110-1301, USA.


var laPrms = (
	
	function() {	
		
		function deferObject() {	
	
			var bufferBeanFunct = [];
			
			var data;
			
			var error;
			
			var returnPromise;
			
			var nextPromise;
			
			var validateState = function (){
				
				if ( data ) {
					
					throw "The state is already resolved";
					
				} else if ( error ) {
					
					throw "The state is already rejected";
				}
				
			}
			
			var isValidPromise = function( futurPromise ) {
				
				return  futurPromise && futurPromise.then;
				
			}
			
			var triggerFunc = function( type, aDataError, abufferBeanFunct ) {
				
				if ( ! aDataError ) {
				
					return null;
							
				}	
				
				var ii = 0;		
				
				var functTrigger = null;
				
				for ( i = 0; i < abufferBeanFunct.length ; i++ ) {
					
					if ( abufferBeanFunct[i][ type ] )	{
						
						ii = i
						
						functTrigger = abufferBeanFunct[i][ type ];
						
						break;
						
					}
					
				}
				
				if ( ! functTrigger  ) {
				
					return null;
					
				}
				
				var futurPromise = functTrigger( aDataError );
				
				if ( ! isValidPromise( futurPromise ) ) {
							
					return {};
					
				}
				
				for ( i = ii + 1; i < abufferBeanFunct.length ; i++ ) {
					
					futurPromise = futurPromise.then( abufferBeanFunct[i].resolve,  abufferBeanFunct[i].reject );		
					
					if ( ! isValidPromise( futurPromise ) ) {
							
						return {};
						
					}
					
				}
				
				return futurPromise;
				
			}
			
			var triggerResolve = function( aData,  aBufferBeanFunct ){
				
				try {
					
					nextPromise = triggerFunc( "resolve", aData, aBufferBeanFunct );
						
				} catch( err ) {
					
					nextPromise = triggerFunc( "reject", err, aBufferBeanFunct );			
				}		
				
				return nextPromise;
				
			}
			
			var addBeanFunction = function ( aresolveFunc, arejectFunc, aBufferBeanFunct ) {
				
				var bean =  {"resolve" : aresolveFunc, "reject": arejectFunc } ;
				
				aBufferBeanFunct.push( bean );
				
			}
			
			var then = function( aresolveFunc, arejectFunc ) {	
				
				if ( nextPromise ) {
					
					if ( isValidPromise( nextPromise ) ) {
					
						var futurPromise =  nextPromise.then( aresolveFunc, arejectFunc );
						
						nextPromise = isValidPromise( futurPromise )
												? futurPromise
													: {};					
					}  else {
						
						throw "This object is not valid promise";
					}
					
				} else {
				
					addBeanFunction( aresolveFunc, arejectFunc, bufferBeanFunct );
					
					if ( typeof data !== "undefined" ) {
						
						nextPromise = triggerResolve( data, bufferBeanFunct );
									
					} else if ( typeof error !== "undefined"  ) {
						
						nextPromise = triggerFunc( "reject", error, bufferBeanFunct );
						
					}
					
				}
				
				if ( ! nextPromise ) {
					
					return returnPromise;
					
				} else if ( isValidPromise( nextPromise ) ) {
					
					return nextPromise;
					
				} 
				
				return null;
				
			}	
			
			var catchFunction = function( arejectFunc ) {
				
				return then( null, arejectFunc );
				
			}

			var resolve = function( adata ) {
				
				validateState();
				
				data = adata;
				
				nextPromise = triggerResolve( data, bufferBeanFunct );
				
			}
			
			var reject = function( aerror ) {
				
				validateState();
				
				error = aerror;
				
				nextPromise = triggerFunc( "reject", error,  bufferBeanFunct );
				
			}
			
			returnPromise = {
				"then"    : then,
				"catch"   : catchFunction
			}
			
			return {
				"promise" : returnPromise,
				"resolve" : resolve,
				"reject"  : reject
			}
			
		}
		
		var defer = function () {
		
			return new deferObject();
			
		}
		
		return {
		
			"defer" : defer
			
		}
		
	}
) ();
