(function($) {

  $.fn.gCalReader = function(options) {
    var $div = $(this);

    var defaults = $.extend({
        calendarId: 'en.usa#holiday@group.v.calendar.google.com',
        apiKey: 'Public_API_Key',
        dateFormat: 'Mes',
        dateFormat_d: 'Dia',
        errorMsg: 'No events in calendarx',
        maxEvents: 4,
        futureEventsOnly: true,
        sortDescending: true
      },
      options);

    var s = '';
    var s2 = '';
    var feedUrl = 'https://www.googleapis.com/calendar/v3/calendars/' +
      encodeURIComponent(defaults.calendarId.trim()) +'/events?key=' + defaults.apiKey +
      '&orderBy=startTime&singleEvents=true';
      if(defaults.futureEventsOnly) {
        feedUrl+='&timeMin='+ new Date().toISOString();
      }

    $.ajax({
      url: feedUrl,
      dataType: 'json',
      success: function(data) {
        if(defaults.sortDescending){
          data.items = data.items.reverse();
        }
        data.items = data.items.slice(0, defaults.maxEvents);

        $.each(data.items, function(e, item) {
          var eventdate = item.start.dateTime || item.start.date ||'';
          var summary = item.summary || '';
					var description = item.description;
					var location = item.location;

       s ='<div class="activities"><div class="activities-date">';
       s +='<h2>'+ formatDate(eventdate, defaults.dateFormat.trim()) +'</h2>';
       s +='<span>'+ formatDate(eventdate, defaults.dateFormat_d.trim()) +'</span></div><div class="activities-content">';
       s +='<h4>' + summary + '</h4>';

       if(location) {
       s +='<p>' + location + '</p>';
        }

        if(description) {
       s +='<span>'+ description +'</span></div></div>';
        }

      $($div).append('<div class="col-md-6 activities-tile">' + s + '</div>');

        });
      },
      error: function(error) {
        $($div).append('<p>' + defaults.errorMsg + ' | ' + error + '</p>');
      }
    });

    function formatDate(strDate, strFormat) {
      var fd, arrDate, am, time;

      var calendar = {
        months: {
          full: ['', 'Ene', 'Feb', 'Mar', 'Abr', 'May',
            'Jun', 'Jul', 'Ago', 'Sep', 'Oct',
            'Nov', 'Dic'
          ],
          short: ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
            'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
          ]
        },
        days: {
          full: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
            'Friday', 'Saturday', 'Sunday'
          ],
          short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
            'Sun'
          ]
        }
      };

      if (strDate.length > 20) {
        arrDate = /(\d+)\-(\d+)\-(\d+)T(\d+)\:(\d+)/.exec(strDate);

        am = (arrDate[4] < 12);
        time = am ? (parseInt(arrDate[4]) + ':' + arrDate[5] + ' AM') : (
          arrDate[4] - 12 + ':' + arrDate[5] + ' PM');

        if (time.indexOf('0') === 0) {
          if (time.indexOf(':00') === 1) {
            if (time.indexOf('AM') === 5) {
              time = 'MIDNIGHT';
            } else {
              time = 'NOON';
            }
          } else {
            time = time.replace('0:', '12:');
          }
        }

      } else {
        arrDate = /(\d+)\-(\d+)\-(\d+)/.exec(strDate);
        time = '';
      }

      var year = parseInt(arrDate[1]);
      var month = parseInt(arrDate[2]);
      var dayNum = parseInt(arrDate[3]);

      var d = new Date(year, month - 1, dayNum);

      switch (strFormat) {
        case 'Dia':
         fd = dayNum;
          break;
        case 'Mes':
          fd = calendar.months.full[month];
          break;
        case 'ShortDate':
          fd = month + '/' + dayNum + '/' + year;
          break;
        case 'LongDate':
          fd = calendar.days.full[d.getDay()] + ' ' + calendar.months.full[
            month] + ' ' + dayNum + ', ' + year;
          break;
        case 'LongDate+ShortTime':
          fd = calendar.days.full[d.getDay()] + ' ' + calendar.months.full[
            month] + ' ' + dayNum + ', ' + year + ' ' + time;
          break;
        case 'ShortDate+ShortTime':
          fd = month + '/' + dayNum + '/' + year + ' ' + time;
          break;
        case 'DayMonth':
          fd = calendar.days.short[d.getDay()] + ', ' + calendar.months.full[
            month] + ' ' + dayNum;
          break;
        case 'YearMonth':
          fd = calendar.months.full[month] + ' ' + year;
          break;
        default:
          fd = calendar.days.full[d.getDay()] + ' ' + calendar.months.short[
            month] + ' ' + dayNum + ', ' + year + ' ' + time;
      }

      return fd;
    }


  };

}(jQuery));
