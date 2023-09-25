import time
import unittest
import warnings
from selenium import webdriver
from selenium.webdriver import ActionChains
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
        driver.find_element(By.CSS_SELECTOR, "tr:nth-child(1) > td:nth-child(2) > .seleccionableGC").click()
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".btnEditarDC").click()
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".apellido-paterno-container").click()
        time.sleep(1)
        driver.find_element(By.ID, "apellidoPaterno").click()
        time.sleep(1)
        driver.find_element(By.ID, "apellidoPaterno").send_keys("Damian")
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".btnEditarDC").click()
        time.sleep(1)
        element = self.driver.find_element(By.CSS_SELECTOR, ".btnEditarDC")
        time.sleep(1)
        actions = ActionChains(self.driver)
        time.sleep(1)
        actions.move_to_element(element).perform()
        time.sleep(1)
        element = self.driver.find_element(By.CSS_SELECTOR, "body")
        time.sleep(1)
        actions = ActionChains(self.driver)
        time.sleep(1)
        actions.move_to_element(element, 0, 0).perform()
        time.sleep(1)
        self.driver.find_element(By.CSS_SELECTOR, ".botonAceptarDC").click()
      
    def tearDown(self):
        warnings.filterwarnings(action="ignore", message="unclosed", category=ResourceWarning)
        self.driver.close()
        print("Test completado")
      
if __name__ == "__main__":
    unittest.main()