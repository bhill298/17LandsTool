# 17LandsTool
Parse 17Lands data and display GIH winrates during a draft. Logs parser code based on the [mtga-log-client](https://github.com/rconroy293/mtga-log-client) project.

## Usage
1. Install [python 3](https://www.python.org/)
2. Install selenium for python with pip, e.g. `pip install selenium` or `python -m pip install selenium` or `py -m pip install selenium`
3. Install google chrome browser and [chrome driver](https://chromedriver.chromium.org/). Place the driver binary somewhere on your system path so selenium can find it.
4. Run `get_17lands_files.py` to download the json files from 17Lands for all formats.
5. Enable detailed logs in MTGA with `Options -> Account -> Detailed Logs`
6. Run `mtga_follower.py` then launch MTGA and start a draft. The console will show all the picks sorted by GIH winrate.

## Caveats and Issues
This is command line only and has no GUI.

Card winrates will not be shown for pack 1 pick 1 from what I've tested. As far as I can tell, arena just isn't generating the events for this, so can't really do anything about it right now.

17Lands may rate limit you if you try to run the `get_17lands_files.py` script too much.

Delete card_data.json if new cards just came out to force regenerate card ID data from MTGA. If you aren't on Windows or have MTGA in an unexpected directory, you may have to pass the --dir flag to mtga_follower.py manually.
