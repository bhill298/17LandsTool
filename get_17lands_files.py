import argparse
import time
import json

from selenium import webdriver
from selenium.common.exceptions import TimeoutException

parser = argparse.ArgumentParser(description="Download 17Lands json files")
parser.add_argument('-s', '--set', default=None,
    help="Download logs for one set, passing in expansion code (e.g. SNC, NEO, VOW). If not provided, download logs for all sets.")

args = parser.parse_args()

# Need google chrome installed, and webdriver extrected to a dir in system path (https://chromedriver.chromium.org/)
driver = webdriver.Chrome()
driver.minimize_window()
driver.get("https://www.17lands.com/card_ratings")
time.sleep(1)
script_contents = ''
with open("download_17lands.js", 'r') as f:
    script_contents = f.read()
driver.set_script_timeout(300)
script_args = []
script_args.append(args.set)
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
    pass
driver.quit()