from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import psycopg2
from dotenv import load_dotenv
import os
from selenium_stealth import stealth
import undetected_chromedriver as uc
import re
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC




load_dotenv('.envrc')


DB_HOST = os.getenv('DB_HOST')
DB_NAME = os.getenv('DB_NAME')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')


class GetDataFromRealState:
    def __init__(self):
        options = webdriver.ChromeOptions()
        options.add_argument("start-maximized")
        # options.add_argument("--headless")
        # options.add_experimental_option("excludeSwitches", ["enable-automation"])
        # options.add_experimental_option('useAutomationExtension', False)
        options.add_argument("--user-agent=PostmanRuntime/7.42.0")


        self.driver = uc.Chrome(options=options)

        stealth(self.driver,
                languages=["en-US", "en"],
                vendor="Google Inc.",
                platform="Win32",
                webgl_vendor="Intel Inc.",
                renderer="Intel Iris OpenGL Engine",
                fix_hairline=True
        )
        


        self.conn = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD
        )
        
        self.house_url_data = []
        self.house_info_data = {}
    
    def getUrlHousesData(self, url, pages):
        self.driver.get(url)

        for page in range(1, pages + 1):
            time.sleep(3)  # Aguarde a página carregar
            
            # Extraia os dados desejados
            
                
            links = self.driver.find_elements(By.CLASS_NAME, 'js-listing-labels-link')
            
            try:
                for id, link in enumerate(links):
                    href = link.get_attribute('href')
                    element_id = self.driver.find_element(By.XPATH, f'/html/body/main/div[2]/div[1]/section/div[2]/div[1]/div[{id+1}]/div').get_attribute('id')
                    if element_id == '':
                        element_id = self.driver.find_element(By.XPATH, f'/html/body/main/div[2]/div[1]/section/div[2]/div[1]/div[{id+1}]').get_attribute('id')
                    self.house_url_data.append({'url': href, 'id': element_id})
            except:
                pass
            
            self.storeHouseUrlData()
            
            try:
                next_button = self.driver.find_element(By.XPATH, '//*[@id="js-site-main"]/div[2]/div[1]/section/div[2]/div[2]/div/ul/li[9]/button')
                self.house_url_data = []
                next_button.click()
            except:
                print(f"Não foi possível encontrar o botão de próxima página na página {page}")
                break
                
    
    def storeHouseUrlData(self):
        with self.conn.cursor() as cursor:
            for house in self.house_url_data:
                cursor.execute("""
                    INSERT INTO url_houses (id, url, updated_at) 
                    VALUES (%s, %s, NOW()) 
                    ON CONFLICT (id) 
                    DO UPDATE SET url = EXCLUDED.url, updated_at = NOW()
                """, (int(house['id']), house['url']))
                self.conn.commit()            
    
    def getHouseInfoData(self):
        
        # Get info from postgresql table
        # select id, url from url_houses
        # where id = 2748534661
        with self.conn.cursor() as cursor:
            cursor.execute("""
                SELECT uh.id, uh.url 
                FROM url_houses uh
                LEFT JOIN info_houses ih ON uh.id = ih.id
                WHERE ih.id IS NULL
                ORDER BY uh.created_at desc
            """)
            houses = cursor.fetchall()
        
        for id, url in houses:
            self.driver.get(url)
            rent = EC.presence_of_element_located((By.CLASS_NAME, 'price-info-value'))
            try:
                WebDriverWait(self.driver, 0.25).until(rent)
                rent = self.findElement(By.CLASS_NAME, 'price-info-value')
                tax_hotel = self.findElement(By.ID, 'condo-fee-price')
                iptu = self.findElement(By.ID, 'iptu-price')
                adress = self.findElement(By.CLASS_NAME, 'address-info-value')
                company = self.findElement(By.XPATH, '/html/body/div[2]/div[1]/div[1]/div[3]/div/div/div[2]/div/a')
                description = self.findElement(By.CLASS_NAME, 'description__content--text')
                size_of_room = self.findElement(By.CSS_SELECTOR, '[itemprop="floorSize"]')
                numberOfRooms = self.findElement(By.CSS_SELECTOR, '[itemprop="numberOfRooms"]')
                numberOfBathroomsTotal = self.findElement(By.CSS_SELECTOR, '[itemprop="numberOfBathroomsTotal"]')
                numberOfParkingSpaces = self.findElement(By.CSS_SELECTOR, '[itemprop="numberOfParkingSpaces"]')
                neighborhood = self.findElement(By.XPATH, '/html/body/div[2]/div[1]/div[1]/div[1]/div[2]/div/nav/ol/li[4]')
                images = self.getImages()
                self.house_info_data = {
                    'id': id,	
                    'rent': rent,
                    'tax_hotel': tax_hotel,
                    'iptu': iptu,
                    'adress': adress,
                    'company': company,
                    'description': description,
                    'size': size_of_room,
                    'number_rooms': numberOfRooms,
                    'number_bathrooms': numberOfBathroomsTotal,
                    'number_parking_spaces': numberOfParkingSpaces,
                    'neighborhood': neighborhood,
                    'images': images
                }
                self.storeHouseInfoData()
            except:
                print("Não foi possível encontrar as informações da locação")

    def storeHouseInfoData(self):
        with self.conn.cursor() as cursor:
            cursor.execute("""
                INSERT INTO info_houses (id, rent, tax_hotel, iptu, adress, company, description, size, number_rooms, number_bathrooms, number_parking_spaces, neighborhood, images, updated_at) 
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW()) 
                ON CONFLICT (id) 
                DO UPDATE SET rent = EXCLUDED.rent, tax_hotel = EXCLUDED.tax_hotel, iptu = EXCLUDED.iptu, adress = EXCLUDED.adress, company = EXCLUDED.company, description = EXCLUDED.description, size = EXCLUDED.size, number_rooms = EXCLUDED.number_rooms, number_bathrooms = EXCLUDED.number_bathrooms, number_parking_spaces = EXCLUDED.number_parking_spaces, neighborhood = EXCLUDED.neighborhood, images = EXCLUDED.images, updated_at = NOW()
            """, (self.house_info_data['id'], 
                  self.castToInt(self.house_info_data['rent']),
                  self.castToInt(self.house_info_data['tax_hotel']),
                  self.castToInt(self.house_info_data['iptu']),
                  self.house_info_data['adress'],
                  self.house_info_data['company'],
                  self.house_info_data['description'],
                  self.castToInt(self.house_info_data['size']),
                  self.castToInt(self.house_info_data['number_rooms']),
                  self.castToInt(self.house_info_data['number_bathrooms']),
                  self.castToInt(self.house_info_data['number_parking_spaces']),
                  self.cleanText(self.house_info_data['neighborhood']),
                  self.house_info_data['images'])
            )
            self.conn.commit()
                
    def findElement(self, by, value):
        try:
            element = self.driver.find_element(by, value)
            return element.text if element.text else element.get_attribute('text')
        except:
            return ''
        
    def castToInt(self, value):
        # Exemplos R$ 3000 mes 51 m2 3 Quartos
        # quero que voce remova o texto e so deixe o numero
        # extraia o numero do texto
        try:
            match = re.search(r'\d+', value.replace('.', '').replace(',', ''))
            return int(match.group()) if match else 0
        except:
            return 0
        
    def cleanText(self, value):
        return value.replace('/', '')
    
    
    
    def getImages(self):
        images = []
        
        try:
            image_elements = self.driver.find_elements(By.CSS_SELECTOR, 'source[srcset][type="image/webp"]')
            for image in image_elements:
                images.append(image.get_attribute('srcset'))
        except:
            pass
        
        return images
                
                
                



scraping = GetDataFromRealState()

if True:
    scraping.getUrlHousesData('https://www.vivareal.com.br/aluguel/sp/sao-jose-dos-campos/apartamento_residencial/', 300)

if True:
    scraping.getHouseInfoData()
    
scraping.driver.quit()


