/*
PLUGIN EXAMPLE

I want to create a plugin called clickMe.js that adds a class to a link when the link is clicked. 
The class will vary from link to link, and not all links will trigger this behavior. 
I use the [data-click-me] data attribute to identify links that should trigger the 
class-adding behavior. I also use this attribute to pass in the class that should be added.

When the browser is resized, I want to print a message in the console log. 
It will be same message every time.

*/

(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define(['buoy'], factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(require('buoy'));
	} else {
		root.clickMe = factory(root, root.buoy);
	}
})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {

	'use strict';

	//
	// Variables
	//

	var clickMe = {}; // Object for public APIs
	var supports = !!document.querySelector && !!root.addEventListener; // Feature test
	var settings; // Placeholder variables

	// Default settings
	var defaults = {
		resizeLog: 'The window was resized!',
		callbackBefore: function () {},
		callbackAfter: function () {}
	};


	//
	// Methods
	//

	/**
	 * Add a class to a link when it's clicked
	 * @private
	 * @param {Event} event The click event
	 */
	var addClass = function ( event ) {

		// Get the thing that was clicked
		var toggle = event.target;

		// Check if the thing that was clicked has the [data-click-me] attribute
		if ( toggle && toggle.hasAttribute( 'data-click-me' ) ) {

			// Prevent default click event
			if ( toggle.tagName.toLowerCase() === 'a') {
				event.preventDefault();
			}

			// Set the [data-click-me] value as a class on the link
			toggle.classList.add( toggle.getAttribute( 'data-click-me' ) );

		}

	};

	/**
	 * Handle events
	 * @private
	 */
	var eventHandler = function (event) {

		// Callback before the event handler runs
		settings.callbackBefore;

		// On click
		if ( event.type === 'click' ) {
			addClass( event );
		}

		// On resize
		if ( event.type === 'resize' ) {
			console.log( settings.resizeLog );
		}

		// Callback after the event handler runs
		settings.callbackAfter;

	};

	/**
	 * Destroy the current initialization.
	 * @public
	 */
	clickMe.destroy = function () {

		// If plugin isn't already initialized, stop
		if ( !settings ) return;

		// Remove all added classes
		var links = document.querySelectorAll( '[data-click-me]' );
		for ( var i = 0, len = links.length; i < len; i++  ) {
			links[i].classList.remove( links[i].getAttribute( 'data-click-me' ) );
		}

		// Remove event listeners
		document.removeEventListener('click', eventHandler, false);
		window.removeEventListener('resize', eventHandler, false);

		// Reset variables
		settings = null;

	};

	/**
	 * Initialize Plugin
	 * @public
	 * @param {Object} options User settings
	 */
	clickMe.init = function ( options ) {

		// feature test
		if ( !supports ) return;

		// Destroy any existing initializations
		clickMe.destroy();

		// Merge user options with defaults
		settings = buoy.extend( defaults, options || {} );

		// Listen for click events
		document.addEventListener('click', eventHandler, false);
		window.addEventListener('resize', eventHandler, false);

	};


	//
	// Public APIs
	//

	return clickMe;

});