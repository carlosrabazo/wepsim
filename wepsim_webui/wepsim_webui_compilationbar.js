/*
 *  Copyright 2015-2020 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
 *
 *  This file is part of WepSIM.
 *
 *  WepSIM is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  WepSIM is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with WepSIM.  If not, see <http://www.gnu.org/licenses/>.
 *
 */


        /*
         *  Compilation bar
         */

        /* jshint esversion: 6 */
        class ws_compilationbar extends HTMLElement
        {
              static get observedAttributes()
	      {
	            return [ 'name', 'components', 'icons' ] ;
	      }

	      get name ( )
	      {
                   return this.getAttribute('name') ;
	      }

	      set name ( value )
	      {
                   this.setAttribute('name', value) ;
	      }

	      get components ( )
	      {
                   return this.getAttribute('components') ;
	      }

	      set components ( value )
	      {
                   this.setAttribute('components', value) ;
	      }

	      get icons ( )
	      {
                   return this.getAttribute('icons') ;
	      }

	      set icons ( value )
	      {
                   this.setAttribute('icons', value) ;
	      }

	      constructor ()
	      {
		    // parent
		    super();
	      }

	      update_internal_attributes ( )
	      {
                    // name
                    this.name_str = this.getAttribute('name') ;
                    if (this.name_str === null)
                        this.name_str = 'id57' ;

                    // components
                    this.components_str = this.getAttribute('components') ;
                    if (this.components_str === null)
                        this.components_str = '' ;
                    this.components_arr = this.components_str.split(',') ;

                    // icons
                    this.icons_str = this.getAttribute('icons') ;
                    if (this.icons_str === null)
                        this.icons_str = 'no' ;
                    this.icons_str = this.icons_str.toLowerCase() ;
	      }

              render_icon ( icon_html )
              {     
                    var o = '' ;
              
                    o += (this.icons_str == 'no') ? ''     : icon_html ;
                    o += (this.icons_str == 'up') ? '<br>' : '&nbsp;' ;
              
                    return o ;
              }     

	      render ( )
	      {
                    // get updated attributes
	            this.update_internal_attributes() ;

                    // render toolbar elements
                    var o1 = '' ;
                    for (var i=0; i<this.components_arr.length; i++)
                    {
                         var name = this.components_arr[i] ;
                         o1 += this.render_btns(name) ;
                    }

                    this.innerHTML = o1 ;
	      }

	      render_btns ( name )
	      {
                    var o = '' ;

                    // load html
                    switch (name)
                    {
                       case "btn_mloadsave":
			     o += '<button style="border-width:1 1 1 1px; border-color: #CCCCCC;"' +
                                  '        onclick="wsweb_dialog_open(\'load_save_firmware\'); ' + 
                                  '                 return true;"' +
			          '	   class="btn btn-light shadow-sm col-auto m-0">' ;
                             o += this.render_icon('<em class="fas fa-file"></em>') ;
                             o += '<span class="font-weight-bold" data-langkey="Load/Save">Load/Save</span>' +
                                  '</button>' ;
                             break ;

                       case "btn_mcompile":
			     o += '<button style="background-color: #CCCCCC"' +
		                  '        id="mcc1"' +
		                  '        class="btn btn-light shadow-sm col-auto"' +
			          '	   data-transition="none" data-inline="true"' +
			          '	   onclick="wsweb_firmware_compile();' +
                                  '                 return false;">' ;
                             o += this.render_icon('<em class="fa fa-sign-out-alt"></em>') ;
                             o += '<strong><span class="d-none d-sm-inline-flex">&#181;<span data-langkey="compile">compile</span></span><span class="d-sm-none">&#181;c.</span></strong>' +
                                  '</button>' ;
                             break ;

                       case "btn_mshowbin":
			     o += '<button style="background-color: #DDDDDD"' +
		                  '        id="mob1"' +
		                  '        class="btn btn-light shadow-sm col-auto"' +
			          '	   onclick="wsweb_dialog_open(\'binary_fir\');' +
                                  '                 return false;">' ;
                             o += this.render_icon('<em class="fa fa-memory"></em>') ;
                             o += '<strong><span class="d-none d-sm-inline-flex"><span data-langkey="Show">Show</span>&nbsp;co2&#181;a.+c.m.</span><span class="d-sm-none">co2&#181;addr+c.m.</span></strong>' +
                                  '</button>' ;
                             break ;

                       case "btn_aloadsave":
			     o += '<button style="border-width:1 1 1 1px; border-color: #CCCCCC;"' +
			          '        class="btn btn-light shadow-sm col-auto m-0"' + 
                                  '        onclick="wsweb_dialog_open(\'load_save_assembly\'); ' + 
                                  '                 return true;">' ;
                             o += this.render_icon('<em class="fas fa-file"></em>') ;
                             o += '<strong><span data-langkey="Load/Save">Load/Save</span></strong>' +
			          '</button>' ;
                             break ;

                       case "btn_acompile":
		             o += '<button style="background-color: #CCCCCC"' +
                                  '        id="acc1"' +
		                  '        class="btn btn-light shadow-sm col-auto"' +
			          '	   data-transition="none" data-inline="true"' +
			          '	   onclick="wsweb_assembly_compile();' +
                                  '                 return false;">' ;
                             o += this.render_icon('<em class="fas fa-sign-out-alt"></em>') ;
                             o += '<strong><span data-langkey="Compile">Compile</span></strong>' +
                                  '</button>' ;
                             break ;

                       case "btn_ashowbin":
		             o += '<button style="background-color: #DDDDDD"' +
                                  '        id="aob1"' +
		                  '        class="btn btn-light shadow-sm col-auto"' +
			          '	     onclick="wsweb_dialog_open(\'binary_asm\');' +
                                  '                   return false;">' ;
                             o += this.render_icon('<em class="fas fa-memory"></em>') ;
                             o += '<strong><span class="d-none d-sm-inline-flex"><span data-langkey="Show Main Memory">Show Main Memory</span></span><span class="d-sm-none">Main Mem.</span></strong></button>' ;
                             break ;
                    }

                    return o ;
	      }

	      connectedCallback ()
	      {
		    this.render() ;
	      }

	      attributeChangedCallback (name, oldValue, newValue)
	      {
		    this.render() ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-compilationbar', ws_compilationbar) ;
        }

