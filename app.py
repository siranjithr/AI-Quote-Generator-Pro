from flask import Flask, render_template, request, jsonify
from llm import generate_quotes

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/generate", methods=["POST"])
def generate():

    try:
        data = request.get_json()

        topic = data.get("topic", "").strip()
        category = data.get("category", "Motivation")
        model = data.get("model", "llama3.2:3b")

        if topic == "":
            return jsonify({
                "success": False,
                "message": "Please enter a topic."
            })

        # Map UI names to installed Ollama models
        model_map = {
            "Llama 3.2": "llama3.2:3b",
            "Mistral": "llama3.2:3b",
            "Gemma": "llama3.2:3b",
            "Phi-3": "llama3.2:3b"
        }

        selected_model = model_map.get(model, "llama3.2:3b")

        quotes = generate_quotes(
            topic=topic,
            category=category,
            model=selected_model
        )

        return jsonify({
            "success": True,
            "quotes": quotes,
            "model": selected_model
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        })


if __name__ == "__main__":
    app.run(debug=True)