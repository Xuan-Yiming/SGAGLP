import time
import unittest
import warnings
from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

class TestSeleccionarRoles(unittest.TestCase):
    def setUp(self):
        options = webdriver.ChromeOptions() 
        options.add_argument("start-maximized")
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        self.driver = webdriver.Chrome(options=options)
      
    def test_seleccionarRoles(self):
        driver = self.driver
        driver.get("http://localhost:3000/")
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".correo-ancho").send_keys("lian.tume@pucp.edu.pe")
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".contrasenia-input").send_keys("liantume12")
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".iniciar-sesion-btn").click()
        time.sleep(1)
        driver.execute_script("window.scrollTo(0,0)")
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".listaRoles:nth-child(1)").click()
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".bi-arrow-left-circle").click()
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".listaRoles:nth-child(2)").click()
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".bi-arrow-left-circle").click()
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".listaRoles:nth-child(3)").click()
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".bi-arrow-left-circle").click()
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".listaRoles:nth-child(4)").click()
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".bi-arrow-left-circle").click()
        time.sleep(1)
      
    def tearDown(self):
        warnings.filterwarnings(action="ignore", message="unclosed", category=ResourceWarning)
        self.driver.close()
        print("Test completado")
      
if __name__ == "__main__":
    unittest.main()