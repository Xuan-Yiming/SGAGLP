# Generated by Selenium IDE
import pytest
import time
import json
import unittest
import warnings
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

class TestAnadirResponsableAsistenteF():
  
  def setUp(self):
      options = webdriver.ChromeOptions() 
      options.add_argument("start-maximized")
      options.add_experimental_option('excludeSwitches', ['enable-logging'])
      self.driver = webdriver.Chrome(options=options)
        
  def test_anadirResponsableAsistenteF(self):
    driver = self.driver
    driver.get("http://localhost:3000/")
    driver.find_element(By.CSS_SELECTOR, ".correo-ancho").send_keys("lian.tume@pucp.edu.pe")
    time.sleep(1)
    driver.find_element(By.CSS_SELECTOR, ".contrasenia-input").send_keys("liantume12")
    time.sleep(1)
    driver.find_element(By.CSS_SELECTOR, ".iniciar-sesion-btn").click()
    time.sleep(1)
    driver.find_element(By.CSS_SELECTOR, ".listaRoles:nth-child(1)").click()
    time.sleep(1)
    element = self.driver.find_element(By.CSS_SELECTOR, ".nav-item:nth-child(2) .opcionRBB")
    time.sleep(1)
    actions = ActionChains(self.driver)
    actions.move_to_element(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, "body")
    actions = ActionChains(self.driver)
    actions.move_to_element(element, 0, 0).perform()
    driver.find_element(By.LINK_TEXT, "Gestionar facultades").click()
    time.sleep(1)
    driver.find_element(By.CSS_SELECTOR, ".btnAniadirAGF").click()
    time.sleep(1)
    driver.find_element(By.CSS_SELECTOR, ".btnAniadirAAF").click()
    time.sleep(1)
    driver.find_element(By.CSS_SELECTOR, ".table-row:nth-child(1) > td:nth-child(1)").click()
    time.sleep(1)
    driver.find_element(By.ID, "6").click()
    time.sleep(1)
    driver.find_element(By.CSS_SELECTOR, ".btnDisenio").click()
    element = self.driver.find_element(By.CSS_SELECTOR, ".btnDisenio")
    actions = ActionChains(self.driver)
    actions.move_to_element(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, "body")
    actions = ActionChains(self.driver)
    actions.move_to_element(element, 0, 0).perform()
    driver.find_element(By.CSS_SELECTOR, ".botonAceptarAARF").click()
    time.sleep(1)
    driver.find_element(By.CSS_SELECTOR, ".btnAniadirAAF2").click()
    time.sleep(1)
    driver.execute_script("window.scrollTo(0,0)")
    time.sleep(1)
    driver.find_element(By.CSS_SELECTOR, ".table-row:nth-child(1) > td:nth-child(1)").click()
    time.sleep(1)
    driver.find_element(By.ID, "6").click()
    time.sleep(1)
    driver.find_element(By.CSS_SELECTOR, ".table-row:nth-child(2) > td:nth-child(1)").click()
    time.sleep(1)
    driver.find_element(By.ID, "8").click()
    time.sleep(1)
    driver.find_element(By.ID, "6").click()
    time.sleep(1)
    driver.find_element(By.CSS_SELECTOR, ".table-row:nth-child(3) > td:nth-child(1)").click()
    time.sleep(1)
    driver.find_element(By.ID, "10").click()
    time.sleep(1)
    driver.find_element(By.CSS_SELECTOR, ".btnDisenio").click()
    time.sleep(1)
    driver.find_element(By.CSS_SELECTOR, ".botonAceptarAARF").click()
    time.sleep(1)
  
    def tearDown(self):
      warnings.filterwarnings(action="ignore", message="unclosed", category=ResourceWarning)
      self.driver.close()
      print("Test completado")
        
if __name__ == "__main__":
    unittest.main()