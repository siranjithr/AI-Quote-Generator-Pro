import requests

OLLAMA_URL = "http://localhost:11434/api/generate"


def generate_quotes(topic, category, model):

    prompt = f"""
You are a professional inspirational quote writer.

Generate EXACTLY 3 unique and original quotes.

Category:
{category}

Topic:
{topic}

Rules:

- Maximum 25 words.
- Inspirational.
- No numbering.
- No bullet points.
- No quotation marks.
- Every quote must be on a new line.
"""

    response = requests.post(

        OLLAMA_URL,

        json={
            "model": model,
            "prompt": prompt,
            "stream": False
        }

    )

    if response.status_code != 200:

        raise Exception("Ollama server is not running.")

    text = response.json()["response"]

    quotes = []

    for line in text.split("\n"):

        line = line.strip()

        if line:

            line = line.lstrip("1234567890.-• ")

            quotes.append(line)

    while len(quotes) < 3:

        quotes.append("No quote generated.")

    return quotes[:3]