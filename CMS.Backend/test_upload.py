import requests
import warnings
warnings.filterwarnings("ignore")

url = "https://localhost:7057/Product/Create"
# First GET to fetch the antiforgery token
session = requests.Session()
response = session.get(url, verify=False)

# Extract token from HTML
import re
match = re.search(r'__RequestVerificationToken.*?value="(.*?)"', response.text)
if match:
    token = match.group(1)
    print("Token found.")
else:
    print("Token not found.")
    exit(1)

# Post data
data = {
    "__RequestVerificationToken": token,
    "Name": "Test Product",
    "CategoryProductId": "1",
    "Price": "1000",
    "StockQuantity": "10",
    "Description": "Testing upload"
}

# File
with open("d:\\DuyTri931\\TriCMS_Project\\CMS.Backend\\wwwroot\\favicon.ico", "rb") as f:
    files = {"imageFile": ("favicon.ico", f, "image/x-icon")}
    
    print("Sending POST request...")
    post_response = session.post(url, data=data, files=files, verify=False, allow_redirects=False)
    print(f"Status: {post_response.status_code}")
    if post_response.status_code in [301, 302]:
        print(f"Redirect location: {post_response.headers.get('Location')}")

