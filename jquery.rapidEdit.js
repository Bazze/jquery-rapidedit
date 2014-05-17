/**
 * RapidEdit (for jQuery)
 * Version: 1.3.2 (2012-09-08)
 * @requires jQuery v. 1.6.X or later
 * @supports TinyMCE jQuery Package (http://www.tinymce.com/download/download.php)
 * @supports InnovaStudio LiveEditor (http://www.innovastudio.com/)
 * @supports MetaData plugin (http://docs.jquery.com/Plugins/Metadata)
 *
 * Copyright © 2009-2012 SN Solutions [ hello@snsolutions.se ]
 * 
 * Plugin Description:
 * 
 * The RapidEdit plugin makes it possible to edit any content on your website without
 * reloading the page even once. The plugin provides a simple edit-link on elements marked
 * with the class 'editable' (this is the default class, can be changed) which opens up an editor
 * in a lightbox-alike manner, where the content can be edited. It is also possible to preview
 * your changes before saving them. The plugin comes with out-of-the-box support for TinyMCE jQuery
 * package and InnovaStudio's LiveEditor. To make the plugin as customizable as possible, loads of
 * settings are provided so you can change it to fit your needs and it also supports the MetaData plugin.
 *
 * Notes:
 *
 * Make sure you don't activate the plugin for an unathorized user and that
 * you perform a server-side check on the user before saving anything
 * to the database or even handling the data, since JavaScript is easy manipulated.
 *
 * If you want to use the TinyMCE feature, download TinyMCE jQuery package from http://www.tinymce.com/download/download.php
 * and move the tinymce/jscripts/tiny_mce folder to the same folder as your jquery.rapidEdit(.min).js.
 *
 * Usage:
 *  
 * $(document).ready(function() {
 * 	 //submitTo is the path to the file which will receive the AJAX request when saving. [options] is optional.
 *   $.rapidEdit(submitTo[, options]); 
 * });
 *
 * Example:
 * 
 * <script type="text/javascript">
 * $(document).ready(function() {
 *   var options = { 
 *       editLinkImagePath: "../images/edit.png",
 *		 editLinkHoverAttribute: "background-color",
 *		 editLinkHoverValue: "red",
 *		 tinymce: true
 *	 };
 *   $.rapidEdit("ajax/saveContent.php", options); 
 * });
 * </script>
 *
 * <div class="header">
 *   This is a header.
 * </div>
 * <div class="main">
 * 
 *   <!-- Editable header -->
 *   <h1 class="editable">Main Content</h1>
 * 
 *   <!-- Editable paragraph -->
 *   <p class="editable">
 *     Lorum ipsum dolor sit amet, consectetuer adipiscing elit.
 *     <!-- Editable span -->  
 *     <span class="author editable">John Doe</span>
 *   </p>
 *
 *   <!-- Editable div which will have a green background
 *        when hovering over the edit-link (using MetaData plugin) -->
 *   <div class="editable { editLinkHoverValue: "green" }">
 *     Lorum ipsum dolor sit amet, consectetuer adipiscing elit.
 *   </div>
 *
 * </div>
 *
 * Data sent on save:
 *
 * @id - Contains the id of the edited element.
 * @class - Contains the classes of the edited element.
 * @content - Contains the textarea content.
 *
 * Example on received data with PHP (using setting submitType: "POST"):
 *
 * print_r($_POST);
 * //output
 * Array (
 * 			"id" => "header",
 *			"class" => "editable anotherClass",
 *			"content" => "Lorum ipsum dolor sit amet, consectetuer adipiscing elit."
 * )
 *
 * PHP-script should return an empty JSON-array on success and the following on error:
 *
 * {"error":"This is where your error message should be which will be displayed to the user."}
 * (In PHP-code: <?php echo json_encode(array("error" => "This is where your error message should be which will be displayed to the user.")); ?>)
 * 
 * Default settings (they can all be changed):
 *
 * rapidEditClass: 'editable',
 * submitTo: '',
 * submitType: 'POST',
 * extraData: {},
 * editLinkImagePath: 'edit.png',
 * editLinkImageTitle: 'Edit',
 * editLinkClass: 'rapidEdit-link',
 * editLinkHoverAttribute: '',
 * editLinkHoverValue: '',
 * editLinkPosX: 'right',
 * editLinkPosY: 'top',
 * editLinkDistX: '0',
 * editLinkDistY: '0',
 * overlayId: 'rapidEdit-overlay',
 * overlayClass: 'rapidEdit-overlay',
 * overlayFadeInSpeed: 400,
 * overlayFadeInEasing: "linear",
 * overlayFadeOutSpeed: 0,
 * overlayFadeOutEasing: "linear",
 * overlayStyle: "cursor:pointer;position:fixed;top:0;left:0;height:100%;width:100%;background:#000;opacity:0;filter:alpha(opacity=0);z-index:5000;",
 * overlayContainerWidth: 695,
 * overlayContainerMinHeight: 400,
 * overlayContainerId: 'rapidEdit-container',
 * overlayContainerClass: 'rapidEdit-container',
 * overlayContainerFadeInSpeed: 400,
 * overlayContainerFadeInEasing: "linear",
 * overlayContainerStyle: "position:fixed;opacity:0;filter:alpha(opacity=0);left:-9999em;z-index:5001;background-color:#fff;padding:10px;border:3px solid #cdcdcd;text-align:left;border-radius:10px;",
 * liveEditor: false,
 * liveEditorObject: 'oEdit1',
 * liveEditorDivId: 'rapidEdit-liveEditor',
 * liveEditorOptions: {
 * 	   width: 689,
 * 	   height: 360,
 * 	   groups: [
 * 	       ["group1", "", ["Bold", "Italic", "Underline", "FontDialog", "ForeColor", "TextDialog", "RemoveFormat"]],
 * 	       ["group2", "", ["Bullets", "Numbering", "JustifyLeft", "JustifyCenter", "JustifyRight"]],
 * 	       ["group3", "", ["LinkDialog", "ImageDialog", "YoutubeDialog", "TableDialog", "Emoticons"]],
 * 	       ["group4", "", ["Undo", "Redo", "FullScreen", "SourceDialog"]]        
 * 	   ],
 * 	   css: "LiveEditor/styles/default.css"
 * },
 * tinymce: false,
 * tinymceOptions: {
 * 	   script_url: "tiny_mce/tiny_mce.js",
 * 	   theme: "advanced",
 * 	   theme_advanced_toolbar_location: "top",
 * 	   plugins : "autolink,lists,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,advlist",
 * 	   theme_advanced_buttons1 : "save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect",
 * 	   theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
 * 	   theme_advanced_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
 * 	   theme_advanced_buttons4 : "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak",
 * 	   theme_advanced_statusbar_location : "bottom",
 * 	   forced_root_block: false
 * },
 * textareaWidth: 695,
 * textareaHeight: 360,
 * textareaId: 'rapidEdit-textarea',
 * textareaClass: 'rapidEdit-textarea',
 * textareaStyle: '',
 * submitButtonClass: 'rapidEdit-submit',
 * submitButtonValue: 'Save',
 * submitButtonStyle: 'margin:5px 5px 0 0;background-color: #F7F7F7;border-color: #CCCCCC;border-radius: 11px 11px 11px 11px;border-style: solid;border-width: 1px;color: #464646;cursor: pointer;font-size: 12px !important;line-height: 15px;padding: 3px 10px;text-shadow: 0 1px 0 #FFFFFF;white-space: nowrap;width: auto;',
 * previewButtonClass: 'rapidEdit-preview',
 * previewButtonValue: 'Preview',
 * previewButtonStyle: 'margin:5px 5px 0 0;background-color: #F7F7F7;border-color: #CCCCCC;border-radius: 11px 11px 11px 11px;border-style: solid;border-width: 1px;color: #464646;cursor: pointer;font-size: 12px !important;line-height: 15px;padding: 3px 10px;text-shadow: 0 1px 0 #FFFFFF;white-space: nowrap;width: auto;',
 * endPreviewButtonId: 'rapidEdit-endpreview', 
 * endPreviewButtonValue: 'End preview',
 * endPreviewButtonStyle: 'margin:0;background-color: #F7F7F7;border-color: #CCCCCC;border-radius: 11px 11px 11px 11px;border-style: solid;border-width: 1px;color: #464646;cursor: pointer;font-size: 12px !important;line-height: 15px;padding: 3px 10px;text-shadow: 0 1px 0 #FFFFFF;white-space: nowrap;width: auto;',
 * endPreviewContainerStyle: 'padding:5px;position:fixed;bottom:0;left:100px;border:3px solid #cdcdcd;border-bottom:0;border-radius:10px 10px 0 0;background-color:#fff;z-index:9999;',
 * previewConfirmText: 'You are currently previewing the changes of another element, would you like to end the preview and edit this element instead?',
 * cancelButtonClass: 'rapidEdit-cancel',
 * cancelButtonValue: 'Cancel',
 * cancelButtonStyle: 'margin-top:5px;background-color: #F7F7F7;border-color: #CCCCCC;border-radius: 11px 11px 11px 11px;border-style: solid;border-width: 1px;color: #464646;cursor: pointer;font-size: 12px !important;line-height: 15px;padding: 3px 10px;text-shadow: 0 1px 0 #FFFFFF;white-space: nowrap;width: auto;',
 * setParentPositionRelative: true
 *
 */

(function($) {

	$.rapidEdit = function(submitTo, options) {
		var settings = $.extend({}, $.rapidEdit.defaults, options);
		settings.submitTo = submitTo;
		$.rapidEdit.settings = settings;
		
		return $("." + $.rapidEdit.settings.rapidEditClass).each(function() {
			$.rapidEdit.attachEditLink($(this));
		});
	}
	
	$.rapidEdit.bindClick = function(element) {
		var $el = $(element);
		var settings = $.rapidEdit.metadata(element);
		$el.find("."+settings.editLinkClass).bind('click', function() {
			if ($.rapidEdit.preview != true || ($.rapidEdit.preview == true && confirm(settings.previewConfirmText))) {
				if ($.rapidEdit.preview == true) {
					$("#" + settings.endPreviewButtonId).click();
					$("." + settings.overlayContainerClass + " ." + settings.cancelButtonClass).click();
				}
				$.rapidEdit.startOverlay(settings, element);
				$.rapidEdit.editElement(element, $el.attr("id"));
			}
		});
		// Bind hover function if values been set for it
		if (settings.editLinkHoverAttribute != '' && settings.editLinkHoverValue != '') {
			$el.children("."+settings.editLinkClass).hover( function() {
				$el.css(settings.editLinkHoverAttribute, settings.editLinkHoverValue);
			}, function() {
				$.rapidEdit.resetHover(element);
			});
		}
	}
	
	$.rapidEdit.bindSubmit = function(element, id) {
		var settings = $.rapidEdit.metadata(element);
		var $el = $(element);
		$("." + settings.overlayContainerClass + " ." + settings.submitButtonClass).bind('click', function() {
			var value = $.rapidEdit.getEditorValue(settings);
			var extraData = "";
			$.each(settings.extraData, function(key, val) {
				extraData += "&" + key + "=" + val;
			});
			$.ajax({
				url: settings.submitTo,
				type: settings.submitType,
				data: "id=" + id + "&class=" + $el.attr("class") + "&content=" + encodeURIComponent( (settings.tinymce == true || settings.liveEditor ? value : $.rapidEdit.nl2br(value)) ) + extraData,
				dataType: 'json',
				success: function(json) {
					if (json.error != undefined) {
						alert(json.error);
					} else {
						$.rapidEdit.restoreElement(value, element);
					}
				},
				error: function(obj, arg, errorThrown) {
					alert("Something went wrong. Save was unsuccessful. ("+errorThrown+")");
				}
			});
			
		});
	}
	
	$.rapidEdit.bindPreview = function(element, id) {
		var settings = $.rapidEdit.metadata(element);
		var $el = $(element);
		$("." + settings.overlayContainerClass + " ." + settings.previewButtonClass).bind('click', function() {
			$.rapidEdit.preview = true;
			var oldContent = $el.html();
			var newContent = $.rapidEdit.getEditorValue(settings);
			$el.html(newContent);
			$.rapidEdit.hideOverlay();
			$("body").css({"overflow":"visible"});
			$("body").append('<div style="' + settings.endPreviewContainerStyle + '"><input id="' + settings.endPreviewButtonId + '" type="button" value="' + settings.endPreviewButtonValue + '" style="' + settings.endPreviewButtonStyle + '" /></div>');
			$("#" + settings.endPreviewButtonId).bind('click', function() {
				$el.html(oldContent);
				$(this).parent().remove();
				$.rapidEdit.showOverlay();
				$.rapidEdit.preview = false;
				$("body").css({"overflow-y":"hidden"});
			});
		});
	}
	
	$.rapidEdit.bindCancel = function(oldContent, element) {
		var settings = $.rapidEdit.metadata(element);
		$("." + settings.overlayContainerClass + " ." + settings.cancelButtonClass).bind('click', function() {
			$.rapidEdit.restoreElement(oldContent, element, true);
		});
	}
	
	$.rapidEdit.resetHover = function(element) {
		var settings = $.rapidEdit.metadata(element);
		$(element).css(settings.editLinkHoverAttribute, "");
	}

	$.rapidEdit.attachEditLink = function(element) {
		var settings = $.rapidEdit.metadata(element);
		var $el = $(element);
		if (settings.setParentPositionRelative == true) {
			//To make sure the link will positioned correctly we set the current element position to relative
			$el.css("position", "relative");
		}
		var editLink = '<div class="' + settings.editLinkClass + '" style="cursor: pointer; position: absolute; ' + settings.editLinkPosY + ': ' + settings.editLinkDistY + '; ' + settings.editLinkPosX + ': ' + settings.editLinkDistX + ';"><img src="' + settings.editLinkImagePath + '" alt="' + settings.editLinkImageTitle + '" title="' + settings.editLinkImageTitle + '" /></div>';
		$el.append(editLink);
		$.rapidEdit.bindClick(element);
	}
	
	$.rapidEdit.editElement = function(element, id) {
		var settings = $.rapidEdit.metadata(element);
		var $el = $(element);
		$.rapidEdit.resetHover(element);
		$el.find("." + settings.editLinkClass).remove();

		var oldContent = (settings.tinymce == true || settings.liveEditor == true ? $el.html() : $.rapidEdit.br2nl($el.html()));
		var textarea = (settings.liveEditor == true ? '<div id="' + settings.liveEditorDivId + '"></div>' : '') + '<textarea id="'+settings.textareaId+'" name="'+settings.textareaClass+'" class="' + settings.textareaClass + '" style="width: ' + settings.textareaWidth + 'px; height: ' + settings.textareaHeight + 'px;' + settings.textareaStyle + '">' + oldContent + '</textarea>';
		var submitButton = '<input type="submit" class="' + settings.submitButtonClass + '" value="' + settings.submitButtonValue +'" style="' + settings.submitButtonStyle + '" />';
		var previewButton = '<input type="button" class="' + settings.previewButtonClass + '" value="' + settings.previewButtonValue +'" style="' + settings.previewButtonStyle + '" />';
		var cancelButton = '<input type="button" class="' + settings.cancelButtonClass + '" value="' + settings.cancelButtonValue + '" style="' + settings.cancelButtonStyle + '" />';
		$("." + settings.overlayContainerClass).html(textarea + submitButton + previewButton + cancelButton);
		$.rapidEdit.bindSubmit(element, id);
		$.rapidEdit.bindPreview(element, id);
		$.rapidEdit.bindCancel(oldContent, element);
		$.rapidEdit.initiateWYSIWYG(settings);
	}
	
	$.rapidEdit.restoreElement = function(content, element, nochange) {
		var settings = $.rapidEdit.metadata(element);
		$.rapidEdit.restoreTinyMCE(settings);
		if (nochange != true) {
			$(element).html(content);
		}
		$.rapidEdit.removeOverlay();
		$.rapidEdit.attachEditLink(element);
	}
	
	$.rapidEdit.getEditorValue = function(settings) {
		var newContent = "";
		if (settings.tinymce == true) {
			newContent = $("." + settings.textareaClass).html();
		} else if (settings.liveEditor == true) {
			newContent = eval(settings.liveEditorObject + '.getXHTMLBody();');
		} else {
			newContent = $("." + settings.textareaClass).val();
		}
		return newContent;
	}
	
	$.rapidEdit.metadata = function(element) {
		var settings = $.rapidEdit.settings;
		return $.metadata ? $.extend({}, settings, $(element).metadata()) : settings;
	}
	
	$.rapidEdit.restoreTinyMCE = function(settings) {
		if (settings.tinymce == true) {
			$("." + settings.textareaClass).tinymce().remove();
		}
	}
	
	$.rapidEdit.initiateWYSIWYG = function(settings) {
		$.rapidEdit.initiateTinyMCE(settings);
		$.rapidEdit.initiateLiveEditor(settings);
	}
	
	$.rapidEdit.initiateTinyMCE = function(settings) {
		if (settings.tinymce == true) {
			$("." + settings.textareaClass).tinymce(settings.tinymceOptions)
		}
	}
	
	$.rapidEdit.initiateLiveEditor = function(settings) {
		if (settings.liveEditor == true) {
			eval(settings.liveEditorObject + ' = new InnovaEditor("' + settings.liveEditorObject + '");');
			$.each(settings.liveEditorOptions, function(key, value) {
				eval(settings.liveEditorObject + '[key] = value;');
			});
			eval(settings.liveEditorObject + '.REPLACE(settings.textareaId, settings.liveEditorDivId)');
			
			// Fix for full screen mode
			var container = document.getElementById(settings.overlayContainerId);
			var tmpLeft = container.style.left; var tmpTop = container.style.top;
			var tmpMarginLeft = container.style.marginLeft; var tmpMarginTop = container.style.marginTop;
			eval(settings.liveEditorObject + ".onFullScreen = function () {container.style.left='0';container.style.top='0';container.style.marginLeft='-'+$(container).css('border-left-width');container.style.marginTop='-'+$(container).css('border-top-width');};");
			eval(settings.liveEditorObject + '.onNormalScreen = function () {container.style.left=tmpLeft;container.style.top=tmpTop;container.style.marginLeft=tmpMarginLeft;container.style.marginTop=tmpMarginTop;};');
		}
	}
	
	$.rapidEdit.nl2br = function(str) { 
		var breakTag = '<br />';
		str = (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
		return str;
	}
	
	$.rapidEdit.br2nl = function(str) {
		str = (str + '').replace(/<br \/>/g, "\n");
		str = (str + '').replace(/<br>/g, "\n");
		return str;
	}
	
	$.rapidEdit.startOverlay = function(settings, element) {
		//add the elements to the dom
		$("body")
			.append('<div id="' + settings.overlayId + '" class="' + settings.overlayClass + '" style="' + settings.overlayStyle + '"></div><div id="' + settings.overlayContainerId + '" class="' + settings.overlayContainerClass + '" style="' + settings.overlayContainerStyle + '"></div>')
			.css({"overflow-y":"hidden"});

		//animate the semitransparant layer
		$("." + settings.overlayClass).animate({"opacity":settings.overlayOpacity}, settings.overlayFadeInSpeed, settings.overlayFadeInEasing);

		//add the lightbox image to the DOM
		$("." + settings.overlayContainerClass).html('help');

		//position it correctly
		$("." + settings.overlayContainerClass)
			.css({
				"top":        "50%",
				"left":       "50%",				
				"width":      settings.overlayContainerWidth,
				"min-height": settings.overlayContainerMinHeight,
				"margin-top": -(settings.overlayContainerMinHeight/2),
				"margin-left":-(settings.overlayContainerWidth/2) //to position it in the middle

			})
			.animate({"opacity":"1"}, settings.overlayContainerFadeInSpeed, settings.overlayContainerFadeInEasing);

			// you need to initiate the removeoverlay function here, otherwise it will not execute.
			$("." + settings.overlayClass).click(function(){
				$.rapidEdit.removeOverlay();
				$.rapidEdit.attachEditLink(element);
			});
	}
	
	$.rapidEdit.removeOverlay = function() {
		var settings = $.rapidEdit.settings;
		var $el = $("." + settings.overlayContainerClass + ", ." + settings.overlayClass);
		$el.animate({"opacity":"0"}, settings.overlayFadeOutSpeed, settings.overlayFadeOutEasing, function(){
			$("body").css({"overflow":"visible"});
			$el.remove();	
		});
	}
	
	$.rapidEdit.hideOverlay = function() {
		var settings = $.rapidEdit.settings;
		$("." + settings.overlayContainerClass + ", ." + settings.overlayClass).hide();
	}
	
	$.rapidEdit.showOverlay = function() {
		var settings = $.rapidEdit.settings;
		$("." + settings.overlayContainerClass + ", ." + settings.overlayClass).show();
	}
	
	$.rapidEdit.preview = false;
	
	$.rapidEdit.settings = {};
	
	$.rapidEdit.defaults = {
		rapidEditClass: 'editable',
		submitTo: '',
		submitType: 'POST',
		extraData: {},
		editLinkImagePath: 'edit.png',
		editLinkImageTitle: 'Edit',
		editLinkClass: 'rapidEdit-link',
		editLinkHoverAttribute: '',
		editLinkHoverValue: '',
		editLinkPosX: 'right',
		editLinkPosY: 'top',
		editLinkDistX: '0',
		editLinkDistY: '0',
		overlayId: 'rapidEdit-overlay',
		overlayClass: 'rapidEdit-overlay',
		overlayFadeInSpeed: 400,
		overlayFadeInEasing: "linear",
		overlayFadeOutSpeed: 0,
		overlayFadeOutEasing: "linear",
		overlayOpacity: 0.6,
		overlayStyle: "cursor:pointer;position:fixed;top:0;left:0;height:100%;width:100%;background:#000;opacity:0;filter:alpha(opacity=0);z-index:5000;",
		overlayContainerWidth: 695,
		overlayContainerMinHeight: 400,
		overlayContainerId: 'rapidEdit-container',
		overlayContainerClass: 'rapidEdit-container',
		overlayContainerFadeInSpeed: 400,
		overlayContainerFadeInEasing: "linear",
		overlayContainerStyle: "position:fixed;opacity:0;filter:alpha(opacity=0);left:-9999em;z-index:5001;background-color:#fff;padding:10px;border:3px solid #cdcdcd;text-align:left;border-radius:10px;",
		liveEditor: false,
		liveEditorObject: 'oEdit1',
		liveEditorDivId: 'rapidEdit-liveEditor',
		liveEditorOptions: {
			width: 689,
			height: 360,
			groups: [
                ["group1", "", ["Bold", "Italic", "Underline", "FontDialog", "ForeColor", "TextDialog", "RemoveFormat"]],
                ["group2", "", ["Bullets", "Numbering", "JustifyLeft", "JustifyCenter", "JustifyRight"]],
                ["group3", "", ["LinkDialog", "ImageDialog", "YoutubeDialog", "TableDialog", "Emoticons"]],
                ["group4", "", ["Undo", "Redo", "FullScreen", "SourceDialog"]]        
			],
			css: "LiveEditor/styles/default.css"
		},
		tinymce: false,
		tinymceOptions: {
			script_url: "tiny_mce/tiny_mce.js",
			theme: "advanced",
			theme_advanced_toolbar_location: "top",
			plugins : "autolink,lists,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,advlist",
			theme_advanced_buttons1 : "save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect",
			theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
			theme_advanced_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
			theme_advanced_buttons4 : "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak",
			theme_advanced_statusbar_location : "bottom",
			forced_root_block: false
		},
		textareaWidth: 689,
		textareaHeight: 360,
		textareaId: 'rapidEdit-textarea',
		textareaClass: 'rapidEdit-textarea',
		textareaStyle: 'padding:3px;font-family:Arial;font-size:12px;max-width:687px;border:1px solid #ccc;',
		submitButtonClass: 'rapidEdit-submit',
		submitButtonValue: 'Save',
		submitButtonStyle: 'margin:5px 5px 0 0;background-color: #F7F7F7;border-color: #CCCCCC;border-radius: 11px 11px 11px 11px;border-style: solid;border-width: 1px;color: #464646;cursor: pointer;font-size: 12px !important;line-height: 15px;padding: 3px 10px;text-shadow: 0 1px 0 #FFFFFF;white-space: nowrap;width: auto;',
		previewButtonClass: 'rapidEdit-preview',
		previewButtonValue: 'Preview',
		previewButtonStyle: 'margin:5px 5px 0 0;background-color: #F7F7F7;border-color: #CCCCCC;border-radius: 11px 11px 11px 11px;border-style: solid;border-width: 1px;color: #464646;cursor: pointer;font-size: 12px !important;line-height: 15px;padding: 3px 10px;text-shadow: 0 1px 0 #FFFFFF;white-space: nowrap;width: auto;',
		endPreviewButtonId: 'rapidEdit-endpreview', 
		endPreviewButtonValue: 'End preview',
		endPreviewButtonStyle: 'margin:0;background-color: #F7F7F7;border-color: #CCCCCC;border-radius: 11px 11px 11px 11px;border-style: solid;border-width: 1px;color: #464646;cursor: pointer;font-size: 12px !important;line-height: 15px;padding: 3px 10px;text-shadow: 0 1px 0 #FFFFFF;white-space: nowrap;width: auto;',
		endPreviewContainerStyle: 'padding:5px;position:fixed;bottom:0;left:100px;border:3px solid #cdcdcd;border-bottom:0;border-radius:10px 10px 0 0;background-color:#fff;z-index:9999;',
		previewConfirmText: 'You are currently previewing the changes of another element, would you like to end the preview and edit this element instead?',
		cancelButtonClass: 'rapidEdit-cancel',
		cancelButtonValue: 'Cancel',
		cancelButtonStyle: 'margin-top:5px;background-color: #F7F7F7;border-color: #CCCCCC;border-radius: 11px 11px 11px 11px;border-style: solid;border-width: 1px;color: #464646;cursor: pointer;font-size: 12px !important;line-height: 15px;padding: 3px 10px;text-shadow: 0 1px 0 #FFFFFF;white-space: nowrap;width: auto;',
		setParentPositionRelative: true
	};

})(jQuery);