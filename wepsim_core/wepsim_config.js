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
     * Config management
     */

    function table_config_html ( config )
    {
	var e_type        = "" ;
	var e_u_class     = "" ;
	var e_code_cfg    = "" ;
	var e_description = "" ;
	var e_id          = "" ;

        var fmt_toggle    = "" ;
        var fmt_header    = "" ;

        // first pass: build data
        var row = "" ;
        var config_groupby_type = {} ;
        for (var n=0; n<config.length; n++)
        {
		e_type        = config[n].type ;
		e_u_class     = config[n].u_class ;
		e_code_cfg    = config[n].code_cfg ;
		e_description = config[n].description ;
		e_id          = config[n].id ;

		// related row
	        if (fmt_toggle === "")
	            fmt_toggle = "bg-light" ;
	       else fmt_toggle = "" ;

		row = '<div class="row py-1 ' + fmt_toggle + ' ' + e_u_class + '" id="' + e_type + '">' +
		      '<div class="col-md-auto">' +
		      '    <span class="badge badge-pill badge-light">' + (n+1) + '</span>' +
		      '</div>' +
		      '<div class="col-md-4">'  + e_code_cfg   + '</div>' +
		      '<div class="col-md collapse7 show align-items-center"><c>' + e_description + '</c></div>' +
		      '</div>' ;

		// indexing row
		if (typeof config_groupby_type[e_type] === "undefined") {
		    config_groupby_type[e_type] = [] ;
		}

		config_groupby_type[e_type].push({'row':     row,
			                          'u_class': e_u_class}) ;
       }

       // second pass: build html
       var o  = '<div class="container grid-striped border border-light">' ;
       var u  = '' ;
       var l  = '' ;
       var l1 = [] ;
       var l2 = {} ;
       for (var m in config_groupby_type)
       {
	        u  = '' ;
	        l2 = {} ;
                for (n=0; n<config_groupby_type[m].length; n++)
                {
		     u = u + config_groupby_type[m][n].row ;

	             l1 = config_groupby_type[m][n].u_class.split(' ') ;
		     for (var li=0; li<l1.length; li++)
	             {
			  if (typeof l2[l1[li]] === 'undefined') {
			      l2[l1[li]] = 0 ;
			  }
			  l2[l1[li]]++ ;
		     }
                }

	        l = '' ;
	        for (var lj in l2)
	        {
		     if (l2[lj] === config_groupby_type[m].length) {
			 l += lj + ' ' ;
		     }
		}

		o = o + "<div class='float-none text-right text-capitalize font-weight-bold col-12 border-bottom border-secondary bg-white sticky-top " + l + "'>" +
			"<span data-langkey='" + m + "'>" + m + "</span>" +
			"</div>" + u ;
       }
       o = o + '</div>' ;

       return o ;
    }

    function wepsim_show_breakpoint_icon_list ( )
    {
	var o = "<div class='container' style='max-height:65vh; overflow:auto; -webkit-overflow-scrolling:touch;'>" +
	        "<div class='row'>" ;

	var prev_type = "" ;
	for (var elto in breakpoint_icon_list)
	{
		if (breakpoint_icon_list[elto].type != prev_type)
		{
                    o = o + "</div>" +
			    "<div class='row p-1'>" +
		            "<div class='float-none text-left text-capitalize font-weight-bold col-12 border-bottom border-secondary'>" + breakpoint_icon_list[elto].type + "</div>" +
		            "</div>" +
		            "<div class='row'>" ;
		    prev_type = breakpoint_icon_list[elto].type ;
		}

		o = o + "<img src='images/stop/stop_" + elto + ".gif' alt='" + elto + " icon' " +
		        "     class='img-thumbnail col-3 mx-2 d-block " + breakpoint_icon_list[elto].addclass + "'" +
		        "     style='height:6vh; min-height:30px;'" +
		        "     onclick=\"$('#img_select1').attr('src',        'images/stop/stop_" + elto + ".gif');" +
		        "               $('#img_select1').attr('class',      '" + breakpoint_icon_list[elto].addclass + "');" +
		        "               $('#img_select1').attr('data-theme', '');" +
		        "	        set_cfg('ICON_theme','" + elto + "'); save_cfg();" +
                        "               $('#breakpointicon1').popover('hide');" +
                        "               wepsim_uicfg_apply();\">" ;
	}

        o = o + '</div>' +
	        '</div>';

	return o ;
    }

    function wepsim_show_breakpoint_icon_template ( )
    {
	var o = '<div class="popover" role="tooltip">' +
		'<div class="arrow"></div><h3 class="popover-header"></h3>' +
		'<div class="popover-body"></div>' +
		'<div class="popover-footer">' +
	        '  <div class="m-0 p-2" style="background-color: #f7f7f7">' +
                '  <button type="button" id="close" data-role="none" ' +
                '          class="btn btn-sm btn-danger w-100 p-0" ' +
                '          onclick="$(\'#breakpointicon1\').popover(\'hide\');"><span data-langkey="Close">Close</span></button>' +
		'  </div>' +
		'</div>' +
		'</div>' ;

	return o ;
    }

    function wepsim_config_dialog_title ( name, color, str_onchange )
    {
	 return "<div class='dropdown btn-group'>" +
                "<button type='button' " +
		"   class='btn btn-outline-" + color + " px-3 py-1 dropdown-toggle' " +
		"   data-toggle='dropdown' id='dropdown-title1' " +
		"   aria-expanded='false' aria-haspopup='true'>" +
		"<span class='font-weight-bold' data-langkey='" + name + "'>" + name + "</span>" +
		"</button>" +
		"<div class='dropdown-menu' " +
		"     style='overflow-y:auto; max-height:55vh; z-index:100000;' " +
		"     aria-labelledby='dropdown-title1'>" +
                // details
		" <form class='px-3 m-0'><div class='form-group m-0'>" +
		" <label for='wsdt" + name + "'><span data-langkey='details'>details</span></label>" +
		" <button class='btn btn-outline-secondary btn-block py-1' " +
                "         type='button' id='wsdt" + name + "' " +
		"         onclick='$(\".collapse7\").collapse(\"toggle\");'>" +
		" <span class='text-truncate'>&plusmn; <span data-langkey='Description'>Description</span></span>" +
		" </button>" +
                " </div></form>"+
                // idioms
		"<div class='dropdown-divider m-1'></div>" +
		" <form class='px-3 m-0'><div class='form-group m-0'>" +
		" <label for='dd2'><span data-langkey='idiom'>idiom</span></label>" +
                  i18n_get_select('select7b' + name, str_onchange) +
                " </div></form>"+
		"</div>" +
		"</div>" ;
    }

    function wepsim_config_dialog_dropdown ( color, base_buttons, str_onchange )
    {
	 return "<div class='dropdown btn-group'>" +
		base_buttons +
		"<button type='button' " +
		"   data-toggle='dropdown' id='dropdown-title1' " +
		"   aria-expanded='false' aria-haspopup='true' " +
		"   class='btn btn-" + color + " dropdown-toggle dropdown-toggle-split'" +
		"><span class='sr-only'>Toggle Dropdown</span>" +
		"</button>" +
		"<div class='dropdown-menu' " +
		"     style='overflow-y:auto; max-height:55vh; z-index:100000;' " +
		"     aria-labelledby='dropdown-title1'>" +
                // details
		" <form class='px-3 m-0'><div class='form-group m-0'>" +
		" <label for='wsdt" + name + "'>details</label>" +
		" <button class='btn btn-outline-secondary btn-block py-1' " +
                "         type='button' id='wsdt" + name + "' " +
		"         onclick='$(\".collapse7\").collapse(\"toggle\");'>" +
		" <span>&plusmn; <span data-langkey='Description'>Description</span></span>" +
		" </button>" +
                " </div></form>"+
                // idioms
		"<div class='dropdown-divider m-1'></div>" +
		" <form class='px-3 m-0'><div class='form-group m-0'>" +
		" <label for='dd2'>idiom</label>" +
                  i18n_get_select('select7b' + name, str_onchange) +
                " </div></form>"+
		"</div>" +
		"</div>" ;
    }

