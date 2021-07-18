<script>
	if($.urlParam=function(n){var t=new RegExp(&quot;[?&amp;]&quot;+n+&quot;=([^&amp;#]*)&quot;).exec(window.location.href);return null==t?null:decodeURI(t[1])||0},null!=$.urlParam(&quot;go&quot;)){
document.getElementById(&quot;dispy&quot;).innerHTML=&quot;Download &quot;+r_text+&quot;&quot;;
document.getElementById(&quot;display&quot;).innerHTML=&quot;<table class='w3-table w3-striped'><tbody><tr><td style='white-space: nowrap'><b>NAME</b></td><td>&quot;+r_text+&quot;</td></tr><tr><td style='white-space: nowrap'><b>Source</b></td><td>Google Drive</td></tr></tbody></table>&quot;;
document.getElementById(&quot;displa&quot;).innerHTML=&quot;<img class='TTM' src='&quot;+appimg+&quot;' width='200'/>&quot;;
document.getElementById(&quot;dows&quot;).innerHTML=&quot;<center><a class='button' href='&quot;+nxtlink+&quot;' id='download'>Download Link</a></center>&quot;;
document.getElementById(&quot;dogc&quot;).innerHTML=&quot;<center><amp-ad data-ad-client='ca-pub-8029032218899204' data-ad-slot='4238481617' data-loading-strategy='prefer-viewability-over-views' height='280' layout='intrinsic' media='(max-width: 728px)' type='adsense' width='336'/><amp-ad data-ad-client='ca-pub-8029032218899204' data-ad-slot='4238481617' data-loading-strategy='prefer-viewability-over-views' height='100' layout='intrinsic' media='(min-width: 729px)' type='adsense' width='990'/></center>&quot;;
}
</script>
<script>/*<![CDATA[*/
var downloadButton = document.getElementById("download");
var counter = 30;
var newElement = document.createElement("p");
newElement.innerHTML = "You can download the file in 10 seconds.";
var id;

downloadButton.parentNode.replaceChild(newElement, downloadButton);

id = setInterval(function() {
    counter--;
    if(counter < 0) {
        newElement.parentNode.replaceChild(downloadButton, newElement);
        clearInterval(id);
    } else {
        newElement.innerHTML = "You can download the file in " + counter.toString() + " seconds.";
    }
}, 1000);
/*]]>*/</script>
