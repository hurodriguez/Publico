(function(t, e, n, a) {
    "use strict";
    var i = "google_calendar_events";
    var s = {
        key: null,
        calendar: null,
        max: 10
    };
    function r(e, n) {
        this.element = e;
        this.settings = t.extend({}, s, n);
        this.init();
    }
    r.prototype.init = function() {
        var t = this;
        if (!t.settings.key || !t.settings.calendar) {
            return false;
        }
        t.getCalendarEvents();
    };
    r.prototype.getCalendarEvents = function() {
        var e = this;
        e.settings.apiUrl = "https://www.googleapis.com/calendar/v3/calendars/" + e.settings.calendar + "/events";
        t.get(e.settings.apiUrl, {
            maxResults: e.settings.max,
            singleEvents: true,
            orderBy: "startTime",
            timeMin: new Date().toISOString(),
            key: e.settings.key
        }, function(t) {
            if (t.hasOwnProperty("items")) {
                e.build(t.items);
            }
        });
    };
    r.prototype.build = function(e) {
        var n = this;
        t(n.element).html('<ul class="row google_event_list list-unstyled"></ul>');
        for (var a = 0; a < 10; a++) {
            var i = e[a];
            var s = !i.start.hasOwnProperty("dateTime");
            var r = s ? new Date(i.start.date) : new Date(i.start.dateTime);
            
            var o ="<li class='col-12 col-sm-6 bg-white py-3'><div class='col border border-secondary'><div class='row h-100'>";
            if (i.summary && i.htmlLink) {
                o += '<div class="google_event_title col-8 col-sm-9 order-last d-flex align-items-center py-3"><a class="w-100 h5 m-0 text-decoration-none" href="' + i.htmlLink + '" rel="' + i.summary + '">' + i.summary + "</a></div>";
            }
            o += '<div class="google_event_date col-4 col-sm-3 order-first bg-azul text-white py-3">' + n.formatDate(r, s) + "</div>";
            if (i.location) {
                o += '<div class="google_event_location col">' + i.location + "</div>";
            }
            if (i.description) {
                o += '<div class="google_event_description col">' + i.description + "</div>";
            }
            o += "</div></div></li>";
            t(n.element).find("ul.google_event_list").append(o);
        }
    };
    r.prototype.formatDate = function(t, e) {
        t = t instanceof Date ? t : new Date(t);
        var n = [ "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado" ];
        var a = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ];
        var i = t.getHours();
        var s = t.getMinutes();
        var r = i > 11 ? "pm" : "am";
        i = i > 12 ? i - 12 : i;
        s = s < 10 ? "0" + s : s;
        var o = i + ":" + s + r;
        var l = "<div class='row text-center h-100'><!--<div class='col-12'>" + n[t.getDay()] + "</div>--><div class='col-12 display-4 mb-0'>" + t.getDate() + "</div><div class='col-12 lead'>" + a[t.getMonth()] + /*", " + t.getFullYear() + */"</div></div>";
        return e ? l : l + " - " + o;
    };
    t.fn[i] = function(e) {
        return this.each(function() {
            if (!t.data(this, "plugin_" + i)) {
                t.data(this, "plugin_" + i, new r(this, e));
            }
        });
    };
})(jQuery, window, document);
