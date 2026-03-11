from playwright.sync_api import sync_playwright

def fetch_page(url):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(url, timeout=60000)  # 60 seconds timeout
        content = page.content()
        browser.close()
        return content

url = "https://www.shreejagannatha.in/daily-rituals/"
html = fetch_page(url)
print(html)
