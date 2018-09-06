define(['jquery', 'handlebars'], function($, handle) {
    var render = function(tpl, data, target, isAppend) {
        var source = $(tpl).html();

        var template = handle.compile(source);

        var html = template(data);

        if (isAppend) {
            $(target).append(html);
        } else {
            $(target).html(html);
        }

    }
    return render
})