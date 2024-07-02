import os
import weaviate
from weaviate.classes.init import AdditionalConfig, Timeout


WEAVIATE_CLUSTER_URL = os.getenv('WEAVIATE_CLUSTER_URL')
WEAVIATE_API_KEY = os.getenv('WEAVIATE_API_KEY')
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=WEAVIATE_CLUSTER_URL,
    auth_credentials=weaviate.AuthApiKey(api_key=WEAVIATE_API_KEY),
    headers={"X-OpenAI-Api-Key": OPENAI_API_KEY})

print(client.is_connected())

book_collection = client.collections.get(name="Book")

# Generative Search

response = book_collection.generate.near_text(
    query="technology, data structures and algorithms, distributed systems",
    limit=2,
    single_prompt="Explain why this book might be interesting to someone who likes playing the violin, rock climbing, and doing yoga. the book's title is {title}, with a description: {description}, and is in the genre: {categories}."
)


print(response.objects[0].generated)  # Inspect the first object
