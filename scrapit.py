import os
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
import time
from webdriver_manager.chrome import ChromeDriverManager
import undetected_chromedriver as uc

# Fonction pour attendre un certain délai
def future_builder(duration=1,ntime=0):
    time.sleep(duration)

def buildDriver(x_pos:int=0,y_pos:int=0,width:int=800,height:int=700,headless:bool=False):
    # Configuration des options pour le navigateur
    chrome_options = Options()
    # Ajouter l'argument pour définir la langue à français
    if headless:
        chrome_options.add_argument("--headless=new")
            
    chrome_options.add_argument("--lang=fr")
    chrome_options.add_argument("--disable-features=OriginTrials")
    chrome_options.add_argument("--disable-web-security")
    chrome_options.add_argument("--allow-running-insecure-content")
    
    # Initialisation de Selenium avec undetected_chromedriver
    driver_cache_file = "driver.cache"
    driver_cache = None
    if os.path.exists(driver_cache_file):
        with open(driver_cache_file,"r") as rc:
            driver_cache = rc.read()
    else:
        driver_cache = ChromeDriverManager().install()
        with open(driver_cache_file,"w") as wc:
            driver_cache = wc.write(driver_cache)
    if not driver_cache:
        driver_cache = ChromeDriverManager().install()
        with open(driver_cache_file,"w") as wc:
            driver_cache = wc.write(driver_cache)
    
    driver = uc.Chrome(service=Service(driver_cache), options=chrome_options, headless=headless, user_multi_procs=True)
    driver.set_window_size(width, height)
    driver.set_window_position(x_pos,y_pos)
    future_builder(5)
    return driver

# Créer le driver (exemple avec Chrome)
driver = buildDriver()


# Aller sur la page cible
driver.get("http://localhost:5500/")

# Attendre un peu pour que la page charge (à adapter selon besoin)
time.sleep(2)

# Localiser l'élément cible
element = driver.find_element(By.CSS_SELECTOR, ".main-btn")

# Créer une instance d'ActionChains
actions = ActionChains(driver)

# Déplacer le curseur vers l'élément (hover), attendre un peu, puis cliquer
actions.move_to_element(element).pause(1).click().perform()
