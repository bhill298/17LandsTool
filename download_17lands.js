// go to https://www.17lands.com/card_ratings
// right click -> copy object
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function the_thing(arguments) {
    var selection;
    var rows;
    var col_map = {};
    var results;
    var wr;

    var full_results = [];
    var expansion_dropdown = $("#expansion")[0];
    var max_set_index = expansion_dropdown.length;
    for (var set_index = 0; set_index < max_set_index; set_index++) {
        rows = undefined;
        results = {};
        expansion_dropdown.selectedIndex = set_index;
        if (arguments[0] == null || arguments[0].toUpperCase() === expansion_dropdown.value.toUpperCase()) {
            expansion_dropdown.dispatchEvent(new Event('change', { bubbles: true }));
        }
        else {
            continue;
        }
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
        for (var i = 1, row; row = rows[i]; i++) {
            results[row.cells[col_map["Name"]].textContent] = row.cells[col_map["GIH WR"]].textContent;
        }
        // set has no data, GIH winrate is blank
        if (Object.values(results).every(el => el === "")) {
            continue;
        }
        results_json = JSON.stringify(results)
        console.log(results_json);
        file_name = expansion_dropdown.value + "_17lands.json"
        console.log(file_name);
        full_results.push([results_json, file_name]);
    }
    return full_results;
}
return the_thing(arguments);
