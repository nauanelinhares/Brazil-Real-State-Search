from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import psycopg2
from dotenv import load_dotenv
import os

load_dotenv('.envrc')


DB_HOST = os.getenv('DB_HOST')
DB_NAME = os.getenv('DB_NAME')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')


class GetDataFromRealState:
    def __init__(self, url, num_pages):
        self.url = url
        self.num_pages = num_pages
        self.driver = webdriver.Chrome()


        self.conn = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD
        )
        
        self.data = []
    
    def getUrlHousesData(self):
        self.driver.get(self.url)

        for page in range(1, self.num_pages + 1):
            time.sleep(3)  # Aguarde a página carregar
            
            # Extraia os dados desejados
            
                
            links = self.driver.find_elements(By.CLASS_NAME, 'js-listing-labels-link')
            
            try:
                for id, link in enumerate(links):
                    href = link.get_attribute('href')
                    element_id = self.driver.find_element(By.XPATH, f'/html/body/main/div[2]/div[1]/section/div[2]/div[1]/div[{id+1}]/div').get_attribute('id')
                    if element_id == '':
                        element_id = self.driver.find_element(By.XPATH, f'/html/body/main/div[2]/div[1]/section/div[2]/div[1]/div[{id+1}]').get_attribute('id')
                    self.data.append({'url': href, 'id': element_id})
            except:
                pass
            
            self.storeHouseUrlData()
            
            try:
                next_button = self.driver.find_element(By.XPATH, '//*[@id="js-site-main"]/div[2]/div[1]/section/div[2]/div[2]/div/ul/li[9]/button')
                self.data = []
                next_button.click()
            except:
                print(f"Não foi possível encontrar o botão de próxima página na página {page}")
                break
                
    
    def storeHouseUrlData(self):
        with self.conn.cursor() as cursor:
            for house in self.data:
                cursor.execute("""
                    INSERT INTO url_houses (id, url, updated_at) 
                    VALUES (%s, %s, NOW()) 
                    ON CONFLICT (id) 
                    DO UPDATE SET url = EXCLUDED.url, updated_at = NOW()
                """, (int(house['id']), house['url']))
                self.conn.commit()



scraping = GetDataFromRealState('https://www.vivareal.com.br/aluguel/sp/sao-jose-dos-campos/apartamento_residencial/', 300)
scraping.getUrlHousesData()


