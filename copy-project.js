(function(root, factory){
  // AMD Support
  if (typeof define === 'function' && define.amd) {
    define([], factory(root));
  }
  // RequireJS Support
  else if ( typeof exports === 'object') {
        module.exports = factory(root);
  }
  // Browser Support
  else {
    root.Copy = factory(root);
  }

})(typeof global !== "undefined" ? global : this.window || this.global, function (root) {

  'use strict';

  var Copy = {};
  var supports = !!document.querySelector && !!root.addEventListener; // Feature test
  var prismScript;
  var config;
  var prismTag;
  var prismParent;
  var theBtn;
  var allBtn;
  var range;
  var selectNode;
  var the_btn_class
  



  var defaults = {
      prismClass: '.language-markup',
      btnClass: '.copy'
  }


    function extend( a, b ) {
      for( var key in b ) { 
        if( b.hasOwnProperty( key ) ) {
          a[key] = b[key];
        }
      }
      return a;
    }


  Copy.init = function(options) {
    if (arguments[0] && typeof arguments[0] == "object"){
        this.options = extend( {}, this.options)
        extend( this.options, options)    
    } else {
        this.options = defaults;
    }

    console.log('init Copy js')
    // console.log('prismClass', document.querySelectorAll(this.options.prismClass))

    var the_class = document.querySelectorAll(this.options.prismClass);
    // console.log('the class', the_class);

    prismScript = Array.prototype.slice.call(the_class);
    prismTag = document.querySelectorAll(this.options.prismClass);
    the_btn_class = this.options.btnClass;

    _construct();

  }

  function _construct() {

    // console.log('construct')
    // console.log('prismScript', prismScript)

    var fragment = document.createDocumentFragment();

    prismScript.forEach(function(element, index){
      console.log('element', element);
      element.parentElement.setAttribute('data-parent-of', '#copy-'+ index);
      element.id = 'copy-'+ index;
      element.parentElement.style.position = 'relative';
      theBtn = document.createElement('a');
      theBtn.classList.add(the_btn_class.substr(1));
      theBtn.setAttribute('href', '#copy-'+ index);
      theBtn.innerHTML = '<i class="fa fa-clipboard" aria-hidden="true"></i>';
      fragment.appendChild(theBtn);
      element.parentElement.appendChild(fragment);
    })

    Copy.event();


  }
  Copy.event = function() {
         
         function getEvent(event, element, func) {
          if (element.addEventListener) {
            element.addEventListener(event, func, false);
          } else if (element.attachEvent) {
            element.attachEvent("on" + event, func);
          } else {
            element['on' + event] = func;
          }
      }

      var local_query = document.querySelectorAll(the_btn_class);

      allBtn = Array.prototype.slice.call(local_query);
      console.log(allBtn);
      allBtn.forEach(function(element, index){
      element.addEventListener('click', test, true);
      function test() {
          // console.log(this.hash === this.querySelectorAll('#copy-' + i));
          console.log(element.previousElementSibling.id)

          try {
            if (element.hash.substr(1) === element.previousElementSibling.id) {
              range = document.createRange();
              selectNode = range.selectNode(element.previousElementSibling);
              window.getSelection().addRange(range);
            }
            if (document.execCommand('copy')) {
              alert('le texte a été copié !')
            }

            window.getSelection().removeAllRanges()

          } catch(err) {
            alert("Il n'est pas possible de créer")
          }


        }
      })
      // getEvent('load', window, onloadLoader);
  }

  return Copy;




})