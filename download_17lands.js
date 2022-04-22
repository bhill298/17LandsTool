// go to https://www.17lands.com/card_ratings
// right click -> copy object
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function the_thing() {
    var selection;
    var rows;
    var col_map = {};
    var results;
    var wr;

    var full_results = [];
    var max_set_index = $("#expansion")[0].length;
    for (var set_index = 0; set_index < max_set_index; set_index++) {
        rows = undefined;
        results = {};
        $("#expansion")[0].selectedIndex = set_index;
        $("#expansion")[0].dispatchEvent(new Event('change', { bubbles: true }));
        await sleep(1000);
        while ($('div.text-light')[0] === undefined || $('div.text-light')[0].innerText.search("don't have any") === -1) {
            selection = $("table.compact.table")[0];
            if (selection !== undefined) {
                rows = selection.rows;
                break;
            }
            await sleep(500);
        }
        if (rows === undefined) {
            continue;
        }
        if (Object.keys(col_map).length === 0) {
            for (var i = 0, col; col = rows[0].cells[i]; i++) {
                col_map[col.textContent] = i;
            }
        }
        // set has no data, GIH WR is blank
        if (rows[1].cells[col_map["GIH WR"]].textContent == "") {
            continue;
        }
        for (var i = 1, row; row = rows[i]; i++) {
            results[row.cells[col_map["Name"]].textContent] = row.cells[col_map["GIH WR"]].textContent;
        }
        results_json = JSON.stringify(results)
        console.log(results_json);
        file_name = $("#expansion")[0].value + "_17lands.json"
        console.log(file_name);
        full_results.push([results_json, file_name]);
    }
    return full_results;
}
return the_thing();