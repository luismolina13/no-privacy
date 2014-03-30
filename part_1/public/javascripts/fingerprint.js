
/*
 * Returns an object with found plugins and their versions
 * Example: {
 *     flash: '10',
 *     pdf: '7',
 *     java: '6',
 *     silverlight: '5',
 *     quicktime: '7'
 * }
 */
var plugins = (function(){
    var found = {};
    var version_reg = /[0-9]+/;
 
    /*
     * Differentiate between IE (detection via ActiveXObject)
     * and the rest (detection via navigator.plugins)
     */
    if (window.ActiveXObject) {
        var plugin_list = {
            flash: 'ShockwaveFlash.ShockwaveFlash.1',
            pdf: 'AcroPDF.PDF',
            silverlight: 'AgControl.AgControl',
            quicktime: 'QuickTime.QuickTime'
        }
 
        for (var plugin in plugin_list){
            var version = msieDetect(plugin_list[plugin]);
            if (version){
                var version_reg_val = version_reg.exec(version);
                found[plugin] = (version_reg_val && version_reg_val[0]) || '';
            }
        }
 
        if (navigator.javaEnabled()){
            found['java'] = '';
        }
    } else {
        var plugins = navigator.plugins;
        console.log(plugins);
        var reg = /Flash|PDF|Java|Silverlight|QuickTime/;
        for (var i = 0; i < plugins.length; i++) {
            var reg_val = reg.exec(plugins[i].description);
            if (reg_val){
                var plugin = reg_val[0].toLowerCase();
                /*
                 * Search in version property, if not available concat name
                 *  and description and search for a version number in there
                 */
                var version = plugins[i].version || 
                    (plugins[i].name + ' ' + plugins[i].description);
                var version_reg_val = version_reg.exec(version);
                if (!found[plugin]) {
                    found[plugin] = (version_reg_val && version_reg_val[0]) || '';
                }
            }
        }
    }
 
    return found;
 
    /*
     * Return version number if plugin installed
     * Return true if plugin is installed but no version number found
     * Return false if plugin not found
     */ 
    function msieDetect(name){
        try {
            var active_x_obj = new ActiveXObject(name);
            try {
                return active_x_obj.GetVariable('$version');
            } catch(e) {
                try {
                    return active_x_obj.GetVersions();
                } catch (e) {
                    try {
                        var version;
                        for (var i = 1; i < 9; i++) {
                            if (active_x_obj.isVersionSupported(i + '.0')){
                                version = i;
                            }
                        }
                        return version || true;
                    } catch (e) {
                        return true;
                    }
                }
            }
        } catch(e){
            return false;
        }
    }
})();

userAgent_str = "<p>Browser CodeName: " + navigator.appCodeName + "</p>";
userAgent_str+= "<p>Browser Name: " + navigator.appName + "</p>";
userAgent_str+= "<p>Browser Version: " + navigator.appVersion + "</p>";
userAgent_str+= "<p>Cookies Enabled: " + navigator.cookieEnabled + "</p>";
userAgent_str+= "<p>Browser Language: " + navigator.language + "</p>";
userAgent_str+= "<p>Browser Online: " + navigator.onLine + "</p>";
userAgent_str+= "<p>Platform: " + navigator.platform + "</p>";
userAgent_str+= "<p>User-agent header: " + navigator.userAgent + "</p>";
userAgent_str+= "<p>User-agent language: " + navigator.systemLanguage + "</p>";

document.getElementById("example").innerHTML=userAgent_str;

console.log(plugins);