jquery-rapidedit
================

A jQuery in-line editing plugin

# Disclaimer
This is a jQuery plugin I originally developed around 4 years ago (updated 2 years ago) so consider it as legacy code. Maybe someone will find it useful.

Feel free to use this in any way you want. MIT licensed.

# From the original README

### Plugin Description
```
RapidEdit (for jQuery)
Version: 1.3.2 (2012-09-08)
@requires jQuery v. 1.6.X or later
@supports TinyMCE jQuery Package (http://www.tinymce.com/download/download.php)
@supports InnovaStudio LiveEditor (http://www.innovastudio.com/)
@supports MetaData plugin (http://docs.jquery.com/Plugins/Metadata)
```

The RapidEdit plugin makes it possible to edit any content on your website without
reloading the page even once. The plugin provides a simple edit-link on elements marked
with the class 'editable' (this is the default class, can be changed) which opens up an editor
in a lightbox-alike manner, where the content can be edited. It is also possible to preview
your changes before saving them. The plugin comes with out-of-the-box support for TinyMCE jQuery
package and InnovaStudio's LiveEditor. To make the plugin as customizable as possible, loads of
settings are provided so you can change it to fit your needs and it also supports the MetaData plugin.

### Notes
Make sure you don't activate the plugin for an unathorized user and that
you perform a server-side check on the user before saving anything
to the database or even handling the data, since JavaScript is easy manipulated.

If you want to use the TinyMCE feature, download TinyMCE jQuery package from http://www.tinymce.com/download/download.php
and move the tinymce/jscripts/tiny_mce folder to the same folder as your jquery.rapidEdit(.min).js.

### Usage
```javascript
$(document).ready(function() {
   //submitTo is the path to the file which will receive the AJAX request when saving. [options] is optional.
  $.rapidEdit(submitTo[, options]);
});
```

### Example
```html
<script type="text/javascript">
$(document).ready(function() {

  var options = {
      editLinkImagePath: "../images/edit.png",
    editLinkHoverAttribute: "background-color",
    editLinkHoverValue: "red",
    tinymce: true
  };
  $.rapidEdit("ajax/saveContent.php", options);
});
</script>

<div class="header">
  This is a header.
</div>
<div class="main">

  <!-- Editable heading -->
  <h1 class="editable">Main Content</h1>

  <!-- Editable paragraph -->
  <p class="editable">
    Lorum ipsum dolor sit amet, consectetuer adipiscing elit.
    <!-- Editable span -->
    <span class="author editable">John Doe</span>
  </p>

  <!-- Editable div which will have a green background
       when hovering over the edit-link (using MetaData plugin) -->
  <div class="editable { editLinkHoverValue: "green" }">
    Lorum ipsum dolor sit amet, consectetuer adipiscing elit.
  </div>

</div>
```

### InnovaStudio LiveEditor example:
```html
<script type="text/javascript" src="LiveEditor/scripts/innovaeditor.js"></script>
<script type="text/javascript" src="jquery.rapidEdit.js"></script>

<script type="text/javascript">
$(document).ready(function() {

  // The LiveEditor needs a global varibale to attach to, declare it
  // before calling the rapidEdit plugin
  var liveEditor = null;

  var options = {
      editLinkImagePath: "../images/edit.png",
    liveEditor: true
    // Make sure to send the object name to rapidEdit so the LiveEditor
    // knows which object to attach to. If you use oEdit1 as the object
    // name, you don't have to declare the liveEditorObject option.
    liveEditorObject: 'liveEditor',
    liveEditorOptions: {
      // Here you can declare any options the LiveEditor can handle, for example useTab/width/height/groups etc
    useTab: false
    }
  };
  $.rapidEdit("ajax/saveContent.php", options);
});
</script>
```

### Data sent on save
```
@id - Contains the id of the edited element.
@class - Contains the classes of the edited element.
@content - Contains the textarea content.
```

### Example on received data with PHP (using setting submitType: "POST")
```php
print_r($_POST);
//output
Array (
      "id" => "header",
      "class" => "editable anotherClass",
      "content" => "Lorum ipsum dolor sit amet, consectetuer adipiscing elit."
)
```

### PHP-script should return an empty JSON-array on success and the following on error
```json
{"error":"This is where your error message should be which will be displayed to the user."}
```

In PHP-code
```php
<?php echo json_encode(array("error" => "This is where your error message should be which will be displayed to the user.")); ?>
```

### Default settings (they can all be changed)
```javascript
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
textareaWidth: 695,
textareaHeight: 360,
textareaId: 'rapidEdit-textarea',
textareaClass: 'rapidEdit-textarea',
textareaStyle: '',
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
```
