import time
import json

from selenium import webdriver
from selenium.common.exceptions import TimeoutException

# Need google chrome installed, and webdriver extrected to a dir in system path (https://chromedriver.chromium.org/)
driver = webdriver.Chrome()
driver.minimize_window()
driver.get('https://www.17lands.com/card_ratings')
time.sleep(1)
script_contents = ''
with open("download_17lands.js", 'r') as f:
    script_contents = f.read()
driver.set_script_timeout(300)
try:
    res = driver.execute_script(script_contents)
    for results, filename in res:
        # load and then dump again to make sure this is valid json
        results = json.loads(results)
        with open(filename, 'w') as f:
            json.dump(results, f)
except TimeoutException:
    pass
driver.quit()