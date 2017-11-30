$(function () {
    $('[data-toggle="tooltip"]').tooltip();

    $.fn.dataTable.ext.errMode = 'throw';//for not show alert to user when data tables fail retrive data from server
    $.fn.dataTable.defaults.bAutoWidth = false;//for not show alert to user when data tables fail retrive data from server

    $.fn.select2.defaults.set("theme", "bootstrap");
    $.fn.select2.defaults.set("language", "tr");

    if (startScripts) {
        for (var i = 0; i < startScripts.length; i++) {
            startScripts[i]();
        }
    }
})

//Dynamic table DT <
function DT_prepareTable(elm, rowConfigurator) {
    var $table = $(elm).closest('table');
    if (!$table.data('rowToCopy')) {
        var clone = $table.find('> tbody tr:not(.ignored-row)').last().clone(true, true);
        clone.find(':input').val('');
        clone.find(':checkbox, :radio').prop('checked', false);
        $table.data('rowToCopy', clone);

        if (rowConfigurator) {
            $table.find('> tbody tr:not(.ignored-row)').each(function () {
                rowConfigurator(this);
            });
        }
    }

    return $table;
}

function DT_configureNames($table) {
    var $rows = $table.find('> tbody tr:not(.ignored-row)').filter(function () {
        return $(this).find('td').length > 0 && $(this).find('th').length === 0;
    });
    $rows.find(':input').each(function () {
        if (this.name && this.name.match(/\[\d+\]/)) {
            this.name = this.name.replace(/\[\d+\]/, '[' + $rows.index($(this).parents('tr').filter(function () { return $rows.index(this) >= 0; })) + ']');
            var oldId = this.id;
            this.id = this.name.replace(/[^a-zA-Z0-9]/g, '_');
            if (oldId && $(this).parent().find('label[for="' + oldId + '"]').length > 0) {
                $(this).parent().find('label[for="' + oldId + '"]').attr('for', this.id);
            }

        }
    });
}

function DT_add(link, max, newRowConfigurator, prepend) {
    if (max === null) {
        max = 5;
    }

    var $table = DT_prepareTable(link);

    if ($table.find('> tbody tr:not(.ignored-row)').length < max) {
        var $newRow = $table.data('rowToCopy').clone(true, true);


        $table.append($newRow);

        $newRow.find(':input[data-default-val]').each(function () {
            $(this).val($(this).data('default-val'));
        });

        if (newRowConfigurator) {
            newRowConfigurator($newRow);
        }

        $newRow.find(':input:not(:hidden):not(:disabled):not([readonly])').first().focus();
    }
    DT_configureNames($table);
    return false;
}

function DT_delete(btDelete) {
    var $table = DT_prepareTable(btDelete);

    $(btDelete).closest('tr').remove();

    DT_configureNames($table);
    return false;
}

function DT_clearAndPrepTable(elm) {
    var $table = $(elm).closest('table');
    $table.data('rowToCopy', '');
    DT_prepareTable($table);
    return false;
}

///> Dynamic table DT

function confirmDelete() {
    return confirm("Silmek istediginize emin misiniz ?");
}

function confirmDesactivate() {
    return confirm("Devre dışı almak istediginize emin misiniz ?");
}

function toggleActive(bt, newStatus) {
    if (newStatus || confirmDesactivate()) {
        postAndRefreshDataTable(bt);
    }
}

function postAndRefreshDataTable(bt) {
    var $bt = $(bt);
    var dataTable = $(bt).closest('table.dataTable').dataTable();
    dataTable.data('noRefresh', 1);
    $bt.css('visibility', 'hidden');
    $bt.after('<img src="/images/loader16.gif" class="p-absolute" style="margin-left:-24px" />');
    $bt.attr('disabled', 'disabled');
    $.ajax({
        url: $bt.attr('href'),
        method: 'POST'
    }).always(function () {
        dataTable.removeData('noRefresh');
        refreshDataTable($(bt).closest('table.dataTable').dataTable(), null, true);
    }).fail(ajaxErrorMessage);
}

function ajaxErrorMessage(xhr, textStatus, errorThrown) {
    alert(getAjaxErrorMessage(xhr, textStatus, errorThrown));
}

function getAjaxErrorMessage(xhr, textStatus, errorThrown) {
    if (xhr.status == 500) {
        var match = xhr.responseText.toString().match(/\<title.*?\>((?:.|\s)+?)\<\/title\>/i);
        if (match) {
            return match[1].replace(/\<(?:.|\s)+?\>/gim, ' ');
        }
        else {
            return xhr.responseText;
        }
    }
    else {
        return errorThrown || textStatus;
    }
}

//function millisecondsToDuration(milliseconds) {
//    var hours = Math.floor(milliseconds / 3600000);
//    milliseconds = milliseconds - (hours * 3600000)
//    var minutes = Math.floor(milliseconds / 60000);
//    milliseconds = milliseconds - (minutes * 60000)
//    var seconds = Math.floor(milliseconds / 1000);
//    milliseconds = milliseconds - (seconds * 1000);

//    if (hours < 10) { hours = "0" + hours; }
//    if (minutes < 10) { minutes = "0" + minutes; }
//    if (seconds < 10) { seconds = "0" + seconds; }
//    if (milliseconds < 10) { milliseconds = "00" + milliseconds; }
//    else if (milliseconds < 100) { milliseconds = "0" + milliseconds; }

//    return hours + ':' + minutes + ':' + seconds + '.' + _milliseconds;
//}


//refresh and retein currentPage. Rewind to new last page if current page no more exists.
function refreshDataTable(table, callback, forced) {
    if (table && (forced || table.data('noRefresh') != 1)) {
        table.api().ajax.reload(function () {
            setTimeout(function () {
                var pInfo = table.api().page.info();
                if (pInfo.page >= pInfo.pages) {
                    table.api().page(pInfo.pages - 1);
                    table.api().ajax.reload(callback, false);
                }
                else if ($.isFunction(callback)) {
                    callback();
                }
            }, 1);
        }, false);
    }
    else if ($.isFunction(callback)) {
        callback();
    }
}

function dataTableDisableRefresh(elm) {
    if (elm) {
        $(elm).closest('table.dataTable').dataTable().data('noRefresh', 1);
    }
}

function dataTableEnableRefresh(elm) {
    if (elm) {
        $(elm).closest('table.dataTable').dataTable().removeData('noRefresh');
    }
}