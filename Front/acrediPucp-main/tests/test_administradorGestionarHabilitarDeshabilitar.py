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


class TestAdministradorGestionarHabilitarDeshabilitar:
    def setUp(self):
        options = webdriver.ChromeOptions()
        options.add_argument("start-maximized")
        options.add_experimental_option("excludeSwitches", ["enable-logging"])
        self.driver = webdriver.Chrome(options=options)

    def test_administradorGestionarHabilitarDeshabilitar(self):
        driver = self.driver
        driver.get("http://localhost:3000/")
        driver.find_element(By.CSS_SELECTOR, ".correo-ancho").click()
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".correo-ancho").send_keys(
            "fernando.vergara@pucp.edu.pe"
        )
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".contrasenia-input").click()
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".contrasenia-input").send_keys("tovar")
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".iniciar-sesion-btn").click()
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".listaRoles:nth-child(1)").click()
        time.sleep(1)
        driver.find_element(By.ID, "4").click()
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".btnDeshabilitarGC > button").click()
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".botonAceptarGC").click()
        time.sleep(1)
        driver.execute_script("window.scrollTo(0,35.20000076293945)")
        time.sleep(1)
        driver.find_element(By.ID, "4").click()
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".undefined:nth-child(3)").click()
        time.sleep(1)
        driver.execute_script("window.scrollTo(0,128.8000030517578)")
        time.sleep(1)
        driver.find_element(By.ID, "19").click()
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".btnDeshabilitarGC > button").click()
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".botonAceptarGC").click()
        time.sleep(1)
        driver.execute_script("window.scrollTo(0,35.20000076293945)")
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".undefined:nth-child(2)").click()
        time.sleep(1)
        driver.execute_script("window.scrollTo(0,128.8000030517578)")
        time.sleep(1)
        driver.find_element(By.ID, "4").click()
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".btnHabilitarGC > button").click()
        time.sleep(1)
        element = self.driver.find_element(By.CSS_SELECTOR, ".btnHabilitarGC > button")
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
        driver.find_element(By.CSS_SELECTOR, ".botonAceptarGC").click()
        time.sleep(1)
        driver.execute_script("window.scrollTo(0,35.20000076293945)")
        time.sleep(1)
        driver.find_element(By.ID, "4").click()
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR, ".undefined:nth-child(3)").click()
        time.sleep(1)
        driver.execute_script("window.scrollTo(0,128.8000030517578)")
        time.sleep(1)
        driver.find_element(By.ID, "19").click()

    def tearDown(self):
        warnings.filterwarnings(action="ignore", message="unclosed", category=ResourceWarning)
        self.driver.close()
        print("Test completado")


if __name__ == "__main__":
    unittest.main()
