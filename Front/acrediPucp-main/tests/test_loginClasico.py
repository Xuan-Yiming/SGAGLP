import time
import unittest
import warnings
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

class TestLoginClasico(unittest.TestCase):
    def setUp(self):
        options = webdriver.ChromeOptions() 
        options.add_argument("start-maximized")
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        self.driver = webdriver.Chrome(options=options)
        
    def test_loginClasico(self):
        driver = self.driver
        driver.get("http://localhost:3000/")
        driver.find_element(By.CSS_SELECTOR, ".ingresar-cuenta").click()
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".correo-ancho").click()
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".correo-ancho").send_keys("diego.damian@pucp.edu.pe")
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".contrasenia-input").send_keys("1234abcd")
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".iniciar-sesion-btn").click()
        time.sleep(2)
        driver.find_element(By.CSS_SELECTOR, ".txtSeleccion").click()
        time.sleep(2)
        driver.find_element(By.CSS_SELECTOR, "h6").click()	
        time.sleep(2)
        
    def tearDown(self):
        warnings.filterwarnings(action="ignore", message="unclosed", category=ResourceWarning)
        self.driver.close()
        print("Test completado")
        
if __name__ == "__main__":
    unittest.main()