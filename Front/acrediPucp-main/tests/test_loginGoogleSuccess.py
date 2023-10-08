import sys
import time
import unittest
import warnings
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver import ActionChains

class TestLoginGoogle(unittest.TestCase):
    def setUp(self):
        options = webdriver.ChromeOptions() 
        options.add_argument("start-maximized")
        options.add_argument("--user-data-dir=C:\\Users\\sebas\\AppData\\Local\\Google\\Chrome\\User Data")
        options.add_argument("--profile-directory=Profile 1")
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        time.sleep(1)
        self.driver = webdriver.Chrome(options=options)
        time.sleep(1)
    
    def test_loginGoogle(self):
        driver = self.driver
        time.sleep(1)
        driver.get("http://localhost:3000/")
        driver.find_element(By.CSS_SELECTOR, ".correo-ancho").send_keys("diego.damian@pucp.edu.pe")
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".googleName").click()
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".listaRoles:nth-child(1)").click()
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".bi-arrow-left-circle").click()
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".buttonMiPerfil").click()
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".bi-arrow-left-circle").click()
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, "h6").click()
        driver.close()

    def tearDown(self):
        warnings.filterwarnings(action="ignore", message="unclosed", category=ResourceWarning)
        print("Test completado")
        
if __name__ == "__main__":
    unittest.main()
    
