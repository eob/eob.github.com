---
layout: layout
title: "Bookmarklet Maker"
---

This little utility helps you make a bookmarklet.

<table>
  <tr><td>Bookmarklet Name:</td><td><input id="anchor" /></td></tr>
  <tr><td>Javascripts (one per line)</td><td><textarea rows=5 cols=100 id="js"></textarea></td></tr>
  <tr><td>CSS Files (one per line)</td><td><textarea id="css" rows=5 cols=100></textarea></td></tr>
  <tr><td>Extra Javascript (only single quotes allowed)</td><td><textarea id="extra" rows=5 cols=100></textarea></td></tr>
  <tr><td>Include jQuery?</td><td><input type="checkbox" id="jq" /></td></tr>
</table>

<button id="gen">Generate</button>

<div id="output-container" style="display:none;">
  Drag this button to your toolbar: <span id="output" class="border: 1px solid #333; background-color: #ccc; padding: 5px; font-size: 1.3em;"></span>
</div>

<script>
// Copyright (C) 2012 Edward Benson <eob@csail.mit.edu>
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.


/**
 * Utility to assist in the creation of bookmarklet links.
 */
var BookmarkletMaker = {

  MaybeAddJQuery: function() {
    return "if (typeof jQuery == 'undefined') {" +
           this.ImportJavascript(jquery) +
           "}";
  },

  ImportJavascript: function(url) {
    return "var s = document.createElement('script');" +
           "s.setAttribute('src', '" + url + "');" +
           "document.getElementsByTagName('body')[0].appendChild(s);";
  },

  ImportCss: function(url) {
    return "var s = document.createElement('link');" +
           "s.setAttribute('href', '" + url + "');" +
           "s.setAttribute('rel', 'stylesheet');" +
           "s.setAttribute('type', 'text/css');" +
           "document.getElementsByTagName('head')[0].appendChild(s);";
  },

  Sanitize: function(javascript) {
    alert(javascript);
    return javascript;
  },

  MakeBookmarklet: function(jquery, cssUrls, jsUrls, javascript, anchorText) {
    var js = "";

    if (jquery) {
      js += this.MaybeAddJQuery();
    }
    
    for (var i = 0; i < cssUrls.length; i++) {
      js += this.ImportCss(cssUrls[i]);
    }

    for (var i = 0; i < jsUrls.length; i++) {
      js += this.ImportJavascript(jsUrls[i]);
    }

    js += this.Sanitize(javascript);

    bookmarklet = "<a href=\"javascript:" + js + "\">" + anchorText + "</a>";
    return bookmarklet;
  }
}

$(function() {
  $("#gen").click(function() {
    var js = $("#js").val().trim();
    var css = $("#css").val().trim();
    var scr = $("#extra").val();
    var anchor = $("#anchor").val();
    if (js.length > 0) {
      js = js.split("\n");
    } else {
      js = [];
    }
    if (css.length > 0) {
      css = css.split("\n");
    } else {
      css = [];
    }
    var out = BookmarkletMaker.MakeBookmarklet(false, css, js, scr, anchor);
      $("#output").html(out);
      $("#output-container").show();
    });
  });
</script>

