import argparse
import time
import json

from selenium import webdriver
from selenium.common.exceptions import TimeoutException

parser = argparse.ArgumentParser(description="Download 17Lands json files")
parser.add_argument('-s', '--set', default=None,
    help="Download logs for specific sets (comma-separated), passing in expansion names (e.g. SNC, NEO, VOW). "
         "If not provided, download logs for all sets.")
parser.add_argument('-t', '--draft-type', default=None, choices=("premier", "trad", "quick", "cube"),
    help="Get results for a different draft type instead of the default (premier draft).")

args = parser.parse_args()
if args.set is not None:
    args.set = [s.strip() for s in args.set.split(',')]
# Need google chrome installed, and webdriver extrected to a dir in system path (https://chromedriver.chromium.org/)
driver = webdriver.Chrome()
driver.minimize_window()
driver.get("https://www.17lands.com/card_ratings")
time.sleep(1)
script_contents = ''
with open("download_17lands.js", 'r') as f:
    script_contents = f.read()
driver.set_script_timeout(300)
script_args = [args.set, args.draft_type]
try:
    res = driver.execute_script(script_contents, *script_args)
    if res is None:
        raise RuntimeError("Script failed to return a value")
    for results, filename in res:
        # load and then dump again to make sure this is valid json
        results = json.loads(results)
        with open(filename, 'w') as f:
            json.dump(results, f)
except TimeoutException:
    print("Error: script timed out")
except RuntimeError as e:
    print(f"Error: {e}")
driver.quit()
