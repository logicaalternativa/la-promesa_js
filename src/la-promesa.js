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

function promise() {	
	
	var bufferBeanFunct = [];
	
	var data;
	
	var error;
	
	var self;
	
	var createBeanFunction = function ( aresolveFunc, arejectFunc ) {
		
		return {"resolve" : aresolveFunc, "reject": arejectFunc } 
		
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
		
		var newPromise = functTrigger( aDataError );
		
		if ( ! newPromise
		      || ! newPromise.then ) {
					
			return {};
			
		}
		
		for ( i = ii + 1; i < abufferBeanFunct.length ; i++ ) {
			
			newPromise.then( abufferBeanFunct[i].resolve,  abufferBeanFunct[i].reject );		
			
		}
		
		return newPromise;
		
	}	
	
	var then = function( aresolveFunc, arejectFunc ) {	
		
		var nextPromise = null;
		
		bufferBeanFunct.push( createBeanFunction( aresolveFunc, arejectFunc ) );
		
		if ( data ) {
			
			nextPromise = triggerResolve( data, bufferBeanFunct );
						
		} else if ( error ) {
			
			nextPromise = triggerFunc( "reject", error, bufferBeanFunct );
			
		}
			
		if ( ! nextPromise ) {
			
			return self;
			
		} else if ( nextPromise
				&& nextPromise.then ) {
			
			return nextPromise;
			
		}
		
	}	
	
	var catchFunction = function( arejectFunc ) {
		
		return then( null, arejectFunc );
		
	}
	
	var triggerResolve = function( aData,  aBufferBeanFunct ){
		
		try {
			
			nextPromise = triggerFunc( "resolve", aData, aBufferBeanFunct );
				
		} catch(err) {
			
			nextPromise = triggerFunc( "reject", err, aBufferBeanFunct );			
		}		
		
		return nextPromise;
		
	}

	var resolve = function( adata ) {
		
		if ( error ) {
			
			throw( "The state is already rejected" );
			
		}
		
		data = adata;
		
		triggerFunc( "resolve", data,  bufferBeanFunct );
		
	}
	
	var reject = function( aerror ) {
		
		if ( data ) {
			
			throw( "The state is already resolved" );
			
		}
		
		error = aerror;
		
		triggerFunc( "reject", error,  bufferBeanFunct );
		
	}
	
	self = {
		"then"    : then,
		"catch"   : catchFunction,
		"resolve" : resolve,
		"rejec"   : reject
	}
	
	return self;
	
}



