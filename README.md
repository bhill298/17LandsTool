# 17LandsTool
Parse 17Lands data and display GIH winrates during a draft. Logs parser code based on the [mtga-log-client](https://github.com/rconroy293/mtga-log-client) project.

## Usage
1. Install [python 3](https://www.python.org/) (use 64-bit due to memory requirements when parsing the large scryfall json file)
2. Install selenium for python with pip, e.g. `pip install selenium` or `python -m pip install selenium` or `py -m pip install selenium`
3. Install google chrome browser and [chrome driver](https://chromedriver.chromium.org/). Place the driver binary somewhere on your system path so selenium can find it.
4. Run `get_17lands_files.py` to download the json files from 17Lands for all formats.
5. Enable detailed logs in MTGA with `Options -> Account -> Detailed Logs`
6. Run `mtga_follower.py` then launch MTGA and start a draft. The first launch may take a while because it has to download the json file from scryfall (this will happen weekly by default). The console will show all the picks sorted by GIH winrate.

## Caveats
17Lands may rate limit you if you try to run the `get_17lands_files.py` script too much. Parsing the large scryfall card data json file consumes a lot of memory temporarily (several GB). This is command line only and has no GUI.

I threw this together in a few hours so don't expect too much.
