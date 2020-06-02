(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define(['buoy'], factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(require('buoy'));
	} else {
		root.myPlugin = factory(root, root.buoy);
	}
})(typeof global !== "undefined" ? global : this.window || this.global, function (root) {

	'use strict';

	//
	// Variables
	//

	var myPlugin = {}; // Object for public APIs
	var supports = !!document.querySelector && !!root.addEventListener; // Feature test
	var settings; // Placeholder variables

	// Default settings
	var defaults = {
		someVar: 123,
		initClass: 'js-myplugin',
		callbackBefore: function () {},
		callbackAfter: function () {}
	};


	//
	// Methods
	//

	// @todo add plugin methods here

	/**
	 * Handle events
	 * @private
	 */
	var eventHandler = function (event) {
		// @todo Do something on event
	};

	/**
	 * Destroy the current initialization.
	 * @public
	 */
	myPlugin.destroy = function () {

		// If plugin isn't already initialized, stop
		if ( !settings ) return;

		// Remove init class for conditional CSS
		document.documentElement.classList.remove( settings.initClass );

		// @todo Undo any other init functions...

		// Remove event listeners
		document.removeEventListener('click', eventHandler, false);

		// Reset variables
		settings = null;

	};

	/**
	 * Initialize Plugin
	 * @public
	 * @param {Object} options User settings
	 */
	myPlugin.init = function ( options ) {

		// feature test
		if ( !supports ) return;

		// Destroy any existing initializations
		myPlugin.destroy();

		// Merge user options with defaults
		settings = buoy.extend( defaults, options || {} );

		// Add class to HTML element to activate conditional CSS
		document.documentElement.classList.add( settings.initClass );

		// @todo Do stuff...

		// Listen for click events
		document.addEventListener('click', eventHandler, false);

	};


	//
	// Public APIs
	//

	return myPlugin;

});