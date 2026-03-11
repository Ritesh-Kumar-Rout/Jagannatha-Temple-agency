# backend/app.py

from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup
from langchain_google_genai import ChatGoogleGenerativeAI

from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from dotenv import load_dotenv
import os

# Load API keys from .env
load_dotenv()

app = Flask(__name__)

# Initialize Gemini LLM
llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-pro",
    google_api_key="AIzaSyBnKLx1Ir4tgIgmZI3IB-p_KnBKN4nsGw4"
)
def scrape_rituals():
    url = 'https://www.shreejagannatha.in/daily-rituals/'  # CHANGE THIS to real URL
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    # Simple example: find all ritual sections
    rituals_raw = []
    ritual_sections = soup.find_all('div', class_='ritual-section')  # Adjust selector

    for section in ritual_sections:
        title = section.find('h2').get_text(strip=True)
        description = section.find('p').get_text(strip=True)
        rituals_raw.append(f"Title: {title}\nDescription: {description}")

    return rituals_raw

def process_rituals_with_ai(raw_rituals):
    prompt = PromptTemplate(
        input_variables=["raw_data"],
        template="""
        Clean and structure the following rituals into JSON format.
        For each ritual, return id, title, emoji (if any), shortDesc, details, and an image (dummy image URL).

        Rituals:
        {raw_data}
        """
    )
    chain = LLMChain(llm=llm, prompt=prompt)

    result = chain.run(raw_data="\n\n".join(raw_rituals))
    return result

@app.route('/get-rituals', methods=['GET'])
def get_rituals():
    raw_rituals = scrape_rituals()
    structured_data = process_rituals_with_ai(raw_rituals)

    try:
        # Try to parse structured_data into JSON
        import json
        rituals = json.loads(structured_data)
    except Exception as e:
        print("Error parsing AI output:", e)
        rituals = []

    return jsonify(rituals)

if __name__ == '__main__':
    app.run(debug=True)
