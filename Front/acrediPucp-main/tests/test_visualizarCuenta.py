import time
import unittest
import warnings
from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

class TestVisualizarCuenta():
    def setUp(self):
        options = webdriver.ChromeOptions() 
        options.add_argument("start-maximized")
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        self.driver = webdriver.Chrome(options=options)


    def test_visualizarCuenta(self):
        driver = self.driver
        driver.get("http://localhost:3000/")
        driver.set_window_size(1050, 700)
        driver.find_element(By.CSS_SELECTOR, ".correo-ancho").send_keys("lian.tume@pucp.edu.pe")
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".contrasenia-input").send_keys("liantume12")
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".iniciar-sesion-btn").click()
        time.sleep(1)
        element = self.driver.find_element(By.CSS_SELECTOR, "h6")
        time.sleep(1)
        actions = ActionChains(self.driver)
        actions.move_to_element(element).perform()
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".listaRoles:nth-child(1)").click()
    
    def tearDown(self):
        warnings.filterwarnings(action="ignore", message="unclosed", category=ResourceWarning)
        self.driver.close()
        print("Test completado")
      
if __name__ == "__main__":
    unittest.main()